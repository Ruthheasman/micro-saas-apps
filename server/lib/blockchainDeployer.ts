import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, mkdir, rm } from "fs/promises";
import path from "path";
import { AgentSerializer } from "./agentSerializer";
import type { Agent } from "@shared/schema";

const execAsync = promisify(exec);

export interface DeploymentResult {
  txid: string;
  vout: number;
  contentUrl: string;
  cost: number;
  originInscription?: string;
}

export interface DeploymentOptions {
  paymentKey: string;
  versionTag?: string;
  versionDescription?: string;
  originInscription?: string;
  dryRun?: boolean;
}

export class BlockchainDeployer {
  private static TMP_DIR = path.join(process.cwd(), ".tmp", "agent-deployments");

  static async deployAgent(
    agent: Agent,
    options: DeploymentOptions
  ): Promise<DeploymentResult> {
    await this.ensureTmpDir();

    const timestamp = Date.now();
    const filename = `agent-${agent.id}-${timestamp}.json`;
    const filepath = path.join(this.TMP_DIR, filename);

    try {
      const previousVersion = agent.chainTxid ? `${agent.chainTxid}_${agent.chainVout}` : undefined;
      
      const serializedAgent = AgentSerializer.toJSON(agent, {
        versionTag: options.versionTag,
        versionDescription: options.versionDescription,
        previousVersion,
      });
      await writeFile(filepath, serializedAgent, "utf-8");

      const result = await this.inscribeFile(filepath, options);
      
      await rm(filepath, { force: true });

      return result;
    } catch (error) {
      await rm(filepath, { force: true }).catch(() => {});
      throw error;
    }
  }

  private static async inscribeFile(
    filepath: string,
    options: DeploymentOptions
  ): Promise<DeploymentResult> {
    const args = [
      "npx",
      "react-onchain",
      "inscribe",
      filepath,
      "--payment-key",
      options.paymentKey,
      "--protocol",
      "b",
      "--content-type",
      "application/json",
    ];

    if (options.dryRun) {
      args.push("--dry-run");
    }

    const command = args.join(" ");

    try {
      const { stdout, stderr } = await execAsync(command, {
        maxBuffer: 10 * 1024 * 1024,
      });

      const output = stdout + stderr;
      console.log("Inscription output:", output);

      const txidMatch = output.match(/Transaction ID:\s*([a-f0-9]{64})/i) ||
                        output.match(/txid[:\s]+([a-f0-9]{64})/i);
      const outpointMatch = output.match(/Outpoint:\s*([a-f0-9]{64}_\d+)/i);
      const costMatch = output.match(/cost:\s*(\d+)\s*satoshis/i) ||
                       output.match(/total:\s*(\d+)\s*sats/i);
      const urlMatch = output.match(/Content URL:\s*(https?:\/\/[^\s]+)/i) ||
                      output.match(/https?:\/\/[^\s]*ordfs[^\s]*/i);

      if (!txidMatch) {
        throw new Error(`Failed to parse inscription output. Output: ${output}`);
      }

      const txid = txidMatch[1];
      let vout = 0;

      if (outpointMatch) {
        const parts = outpointMatch[1].split("_");
        vout = parseInt(parts[1], 10);
      }

      const cost = costMatch ? parseInt(costMatch[1], 10) : 0;
      const contentUrl = urlMatch 
        ? urlMatch[1] || urlMatch[0]
        : `https://ordfs.network/content/${txid}_${vout}`;

      return {
        txid,
        vout,
        contentUrl,
        cost,
        originInscription: options.originInscription,
      };
    } catch (error: any) {
      console.error("Inscription error:", error);
      throw new Error(`Failed to inscribe agent: ${error.message}`);
    }
  }

  private static async ensureTmpDir() {
    try {
      await mkdir(this.TMP_DIR, { recursive: true });
    } catch (error) {
      console.error("Failed to create tmp directory:", error);
    }
  }

  static async estimateCost(agent: Agent): Promise<number> {
    const serializedAgent = AgentSerializer.toJSON(agent);
    const sizeInBytes = Buffer.byteLength(serializedAgent, "utf-8");
    const sizeInKB = sizeInBytes / 1024;
    
    const satsPerKB = 1;
    const estimatedCost = Math.ceil(sizeInKB * satsPerKB);
    
    return estimatedCost;
  }
}

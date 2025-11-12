import type { Agent } from "@shared/schema";

export interface SerializedAgent {
  version: string;
  metadata: {
    name: string;
    description: string;
    category: string;
    icon?: string | null;
    avatarUrl?: string | null;
    creditCost: number;
    featured: boolean;
  };
  configuration: {
    systemPrompt: string;
    modelProvider: string;
    modelName: string;
    inputSchema: any;
  };
  customization: {
    conversationStarters?: any;
    customCss?: string | null;
    themeSettings?: any;
  };
  deployment: {
    timestamp: string;
    versionTag?: string;
    versionDescription?: string;
    originInscription?: string | null;
    previousVersion?: string | null;
  };
}

export class AgentSerializer {
  static serialize(
    agent: Agent,
    options?: {
      versionTag?: string;
      versionDescription?: string;
      previousVersion?: string;
    }
  ): SerializedAgent {
    return {
      version: "1.0.0",
      metadata: {
        name: agent.name,
        description: agent.description,
        category: agent.category,
        icon: agent.icon,
        avatarUrl: agent.avatarUrl,
        creditCost: agent.creditCost,
        featured: agent.featured,
      },
      configuration: {
        systemPrompt: agent.systemPrompt,
        modelProvider: agent.modelProvider,
        modelName: agent.modelName,
        inputSchema: agent.inputSchema,
      },
      customization: {
        conversationStarters: agent.conversationStarters,
        customCss: agent.customCss,
        themeSettings: agent.themeSettings,
      },
      deployment: {
        timestamp: new Date().toISOString(),
        versionTag: options?.versionTag,
        versionDescription: options?.versionDescription,
        originInscription: agent.chainOriginInscription,
        previousVersion: options?.previousVersion || (agent.chainTxid ? `${agent.chainTxid}_${agent.chainVout}` : null),
      },
    };
  }

  static deserialize(serialized: SerializedAgent): Partial<Agent> {
    return {
      name: serialized.metadata.name,
      description: serialized.metadata.description,
      category: serialized.metadata.category,
      icon: serialized.metadata.icon,
      avatarUrl: serialized.metadata.avatarUrl,
      creditCost: serialized.metadata.creditCost,
      featured: serialized.metadata.featured,
      systemPrompt: serialized.configuration.systemPrompt,
      modelProvider: serialized.configuration.modelProvider,
      modelName: serialized.configuration.modelName,
      inputSchema: serialized.configuration.inputSchema,
      conversationStarters: serialized.customization.conversationStarters,
      customCss: serialized.customization.customCss,
      themeSettings: serialized.customization.themeSettings,
      chainOriginInscription: serialized.deployment.originInscription,
    };
  }

  static toJSON(
    agent: Agent,
    options?: {
      versionTag?: string;
      versionDescription?: string;
      previousVersion?: string;
    }
  ): string {
    const serialized = this.serialize(agent, options);
    return JSON.stringify(serialized, null, 2);
  }

  static fromJSON(json: string): Partial<Agent> {
    const serialized: SerializedAgent = JSON.parse(json);
    return this.deserialize(serialized);
  }
}

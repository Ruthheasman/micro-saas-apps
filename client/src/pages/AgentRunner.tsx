import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Sparkles, Loader2, Video, Image as ImageIcon, MessageSquare, Zap } from "lucide-react";
import type { Agent } from "@shared/schema";

export default function AgentRunner() {
  const [, params] = useRoute("/agents/:id");
  const [, setLocation] = useLocation();
  const agentId = params?.id;
  const { toast } = useToast();
  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);

  const { data: agent, isLoading } = useQuery<Agent>({
    queryKey: ['/api/agents', agentId],
    enabled: !!agentId,
  });

  const { data: credits = 0 } = useQuery<number>({
    queryKey: ['/api/credits'],
  });

  const runMutation = useMutation({
    mutationFn: async (inputData: Record<string, any>) => {
      const response = await fetch(`/api/agents/${agentId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputData }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to run agent");
      }
      return response.json();
    },
    onSuccess: (data: any) => {
      setResult(data.output);
      queryClient.invalidateQueries({ queryKey: ['/api/credits'] });
      toast({
        title: "Success!",
        description: "Agent executed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Execution Failed",
        description: error.message || "Failed to run agent",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (name: string, value: any) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRun = () => {
    if (!agent) return;
    
    if (credits < agent.creditCost) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${agent.creditCost} credits to run this agent`,
        variant: "destructive",
      });
      return;
    }

    runMutation.mutate(inputValues);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <Card className="bg-slate-900/50 border-slate-800 max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-400">Agent not found</p>
            <Button onClick={() => setLocation("/agents")} className="mt-4" data-testid="button-back-marketplace">
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const inputSchema = (agent.inputSchema as any) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/agents")}
            className="text-slate-400 hover:text-white"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
              {agent.name}
            </h1>
            <p className="text-slate-400 mt-1">{agent.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-slate-400 border-slate-700">
              {agent.modelProvider}
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              {agent.category}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
          <div className="flex items-center gap-2 text-slate-400">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Cost: {agent.creditCost} credits</span>
          </div>
          <div className="text-slate-400">
            Your balance: <span className="text-white font-semibold">{credits}</span> credits
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Input</CardTitle>
              <CardDescription className="text-slate-400">
                Provide the required information to run this agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {inputSchema.length === 0 ? (
                <p className="text-slate-500">No inputs required</p>
              ) : (
                inputSchema.map((field: any) => (
                  <div key={field.name} className="space-y-2">
                    <Label className="text-slate-300">{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        placeholder={field.label}
                        value={inputValues[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                        data-testid={`input-${field.name}`}
                      />
                    ) : (
                      <Input
                        type={field.type || "text"}
                        placeholder={field.label}
                        value={inputValues[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                        data-testid={`input-${field.name}`}
                      />
                    )}
                  </div>
                ))
              )}

              <Button
                onClick={handleRun}
                disabled={runMutation.isPending || credits < agent.creditCost}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                data-testid="button-run-agent"
              >
                {runMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  "Run Agent"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Output</CardTitle>
              <CardDescription className="text-slate-400">
                Results will appear here after execution
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="flex items-center justify-center py-12 text-slate-500">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-slate-700" />
                    <p>Run the agent to see results</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.type === "video" && result.video_url && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-400">
                        <Video className="w-4 h-4" />
                        <span className="text-sm font-medium">Generated Video</span>
                      </div>
                      <video
                        src={result.video_url}
                        controls
                        className="w-full rounded-lg bg-slate-950"
                        data-testid="output-video"
                      />
                      <a
                        href={result.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm underline"
                      >
                        Open in new tab
                      </a>
                    </div>
                  )}

                  {result.type === "image" && result.image_url && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-400">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Generated Image</span>
                      </div>
                      <img
                        src={result.image_url}
                        alt="Generated"
                        className="w-full rounded-lg"
                        data-testid="output-image"
                      />
                      <a
                        href={result.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm underline"
                      >
                        Open in new tab
                      </a>
                    </div>
                  )}

                  {result.text && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">Text Response</span>
                      </div>
                      <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                        <p className="text-slate-300 whitespace-pre-wrap" data-testid="output-text">
                          {result.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {!result.type && !result.text && (
                    <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                      <pre className="text-slate-300 text-sm overflow-auto" data-testid="output-json">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

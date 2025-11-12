import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
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
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </main>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Agent not found</p>
              <Button onClick={() => setLocation("/agents")} className="mt-4" data-testid="button-back-marketplace">
                Back to Marketplace
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const inputSchema = (agent.inputSchema as any) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="border-b bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/agents")}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-primary" />
                  {agent.name}
                </h1>
                <p className="text-muted-foreground mt-1">{agent.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {agent.modelProvider}
                </Badge>
                <Badge variant="default">
                  {agent.category}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Cost: {agent.creditCost} credits</span>
              </div>
              <div className="text-muted-foreground">
                Your balance: <span className="text-foreground font-semibold">{credits}</span> credits
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>
                  Provide the required information to run this agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inputSchema.length === 0 ? (
                  <p className="text-muted-foreground">No inputs required</p>
                ) : (
                  inputSchema.map((field: any) => (
                    <div key={field.name} className="space-y-2">
                      <Label>{field.label}</Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.label}
                          value={inputValues[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          data-testid={`input-${field.name}`}
                        />
                      ) : (
                        <Input
                          type={field.type || "text"}
                          placeholder={field.label}
                          value={inputValues[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          data-testid={`input-${field.name}`}
                        />
                      )}
                    </div>
                  ))
                )}

                <Button
                  onClick={handleRun}
                  disabled={runMutation.isPending || credits < agent.creditCost}
                  className="w-full"
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

            <Card>
              <CardHeader>
                <CardTitle>Output</CardTitle>
                <CardDescription>
                  Results will appear here after execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="flex items-center justify-center py-12 text-muted-foreground">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 mx-auto mb-3" />
                      <p>Run the agent to see results</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {result.type === "video" && result.video_url && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <Video className="w-4 h-4" />
                          <span className="text-sm font-medium">Generated Video</span>
                        </div>
                        <video
                          src={result.video_url}
                          controls
                          className="w-full rounded-lg bg-muted"
                          data-testid="output-video"
                        />
                        <a
                          href={result.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Open in new tab
                        </a>
                      </div>
                    )}

                    {result.type === "image" && result.image_url && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
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
                          className="text-primary hover:underline text-sm"
                        >
                          Open in new tab
                        </a>
                      </div>
                    )}

                    {result.text && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm font-medium">Text Response</span>
                        </div>
                        <div className="p-4 bg-muted rounded-lg border">
                          <p className="whitespace-pre-wrap" data-testid="output-text">
                            {result.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {!result.type && !result.text && (
                      <div className="p-4 bg-muted rounded-lg border">
                        <pre className="text-sm overflow-auto" data-testid="output-json">
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
      </main>
    </div>
  );
}

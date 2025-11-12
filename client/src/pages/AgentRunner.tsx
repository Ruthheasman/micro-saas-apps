import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { ArrowLeft, Sparkles, Loader2, Video, Image as ImageIcon, MessageSquare, Zap, Send, Bot, User, Paperclip, X } from "lucide-react";
import type { Agent } from "@shared/schema";

interface ImageAttachment {
  dataUrl: string;
  name: string;
  size: number;
  type: string;
}

interface Message {
  role: "user" | "agent";
  content: string;
  output?: any;
  attachments?: ImageAttachment[];
  timestamp: Date;
}

export default function AgentRunner() {
  const [, params] = useRoute("/agents/:id");
  const [, setLocation] = useLocation();
  const agentId = params?.id;
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState<ImageAttachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: agent, isLoading } = useQuery<Agent>({
    queryKey: ['/api/agents', agentId],
    enabled: !!agentId,
  });

  const { data: creditsData } = useQuery<{ balance: number }>({
    queryKey: ['/api/credits'],
  });
  
  const credits = creditsData?.balance ?? 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      setMessages(prev => [...prev, {
        role: "agent",
        content: data.output?.text || "Generated result",
        output: data.output,
        timestamp: new Date(),
      }]);
      queryClient.invalidateQueries({ queryKey: ['/api/credits'] });
    },
    onError: (error: any) => {
      toast({
        title: "Execution Failed",
        description: error.message || "Failed to run agent",
        variant: "destructive",
      });
      setMessages(prev => [...prev, {
        role: "agent",
        content: `Error: ${error.message}`,
        timestamp: new Date(),
      }]);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 4 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Images must be under 4MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setAttachments(prev => [...prev, {
          dataUrl,
          name: file.name,
          size: file.size,
          type: file.type,
        }]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if ((!inputValue.trim() && attachments.length === 0) || !agent) return;
    
    if (credits < agent.creditCost) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${agent.creditCost} credits to run this agent`,
        variant: "destructive",
      });
      return;
    }

    const userMessage = inputValue;
    const userAttachments = [...attachments];
    setInputValue("");
    setAttachments([]);

    setMessages(prev => [...prev, {
      role: "user",
      content: userMessage,
      attachments: userAttachments,
      timestamp: new Date(),
    }]);

    const inputData: Record<string, any> = {};
    const inputSchema = (agent.inputSchema as any) || [];
    
    if (inputSchema.length > 0) {
      inputSchema.forEach((field: any) => {
        inputData[field.name] = userMessage;
      });
    } else {
      inputData.prompt = userMessage;
    }

    if (userAttachments.length > 0) {
      inputData.images = userAttachments.map(att => att.dataUrl);
    }

    runMutation.mutate(inputData);
  };

  const handleConversationStarter = (starter: string) => {
    setInputValue(starter);
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
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Agent not found</p>
            <Button onClick={() => setLocation("/agents")} data-testid="button-back-marketplace">
              Back to Marketplace
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const conversationStarters = Array.isArray(agent.conversationStarters) 
    ? agent.conversationStarters 
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Chat Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/agents")}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-lg">{agent.name}</h1>
                <p className="text-xs text-muted-foreground">{agent.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Zap className="w-3 h-3 mr-1 text-yellow-600" />
                {agent.creditCost} credits
              </Badge>
              <Badge variant="outline" className="text-xs">
                Balance: {credits}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                {agent.description}
              </p>
              
              {conversationStarters.length > 0 && (
                <div className="space-y-2 w-full max-w-md">
                  <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                  <div className="flex flex-col gap-2">
                    {conversationStarters.map((starter: any, idx: number) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4"
                        onClick={() => handleConversationStarter(typeof starter === 'string' ? starter : starter.text)}
                        data-testid={`button-starter-${idx}`}
                      >
                        <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="whitespace-normal">
                          {typeof starter === 'string' ? starter : starter.text}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  data-testid={`message-${message.role}-${idx}`}
                >
                  <Avatar className="flex-shrink-0">
                    <AvatarFallback className={message.role === 'agent' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                      {message.role === 'agent' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`flex flex-col gap-2 max-w-[70%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.attachments.map((att, attIdx) => (
                          <img
                            key={attIdx}
                            src={att.dataUrl}
                            alt={att.name}
                            className="rounded-lg max-w-xs border"
                            data-testid={`message-attachment-${idx}-${attIdx}`}
                          />
                        ))}
                      </div>
                    )}
                    {message.content && (
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap" data-testid={`message-content-${idx}`}>
                          {message.content}
                        </p>
                      </div>
                    )}
                    
                    {message.output && (
                      <div className="w-full space-y-3">
                        {message.output.type === "video" && message.output.video_url && (
                          <div className="rounded-lg overflow-hidden border bg-card">
                            <video
                              src={message.output.video_url}
                              controls
                              className="w-full"
                              data-testid={`output-video-${idx}`}
                            />
                          </div>
                        )}
                        
                        {message.output.type === "image" && message.output.image_url && (
                          <div className="rounded-lg overflow-hidden border bg-card">
                            <img
                              src={message.output.image_url}
                              alt="Generated"
                              className="w-full"
                              data-testid={`output-image-${idx}`}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <span className="text-xs text-muted-foreground px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {runMutation.isPending && (
                <div className="flex gap-3">
                  <Avatar className="flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl px-4 py-3 bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Chat Input */}
      <div className="border-t bg-background">
        <div className="max-w-5xl mx-auto px-4 py-4">
          {attachments.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachments.map((att, idx) => (
                <div key={idx} className="relative group" data-testid={`attachment-preview-${idx}`}>
                  <img
                    src={att.dataUrl}
                    alt={att.name}
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeAttachment(idx)}
                    data-testid={`button-remove-attachment-${idx}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
              data-testid="input-file-upload"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={runMutation.isPending}
              data-testid="button-attach-file"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={runMutation.isPending}
              className="flex-1"
              data-testid="input-chat-message"
            />
            <Button
              onClick={handleSend}
              disabled={(!inputValue.trim() && attachments.length === 0) || runMutation.isPending || credits < agent.creditCost}
              size="icon"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

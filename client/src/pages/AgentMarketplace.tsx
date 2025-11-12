import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Sparkles, Video, Image as ImageIcon, MessageSquare, Zap, Loader2 } from "lucide-react";
import type { Agent } from "@shared/schema";

export default function AgentMarketplace() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
  });

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || agent.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(agents.map(a => a.category)));

  const getModelIcon = (modelProvider: string, modelName: string) => {
    if (modelProvider === "kieai") {
      if (modelName.toLowerCase().includes("veo") || modelName.toLowerCase().includes("sora") || modelName.toLowerCase().includes("seedance")) {
        return <Video className="w-4 h-4" />;
      }
      if (modelName.toLowerCase().includes("nano-banana") || modelName.toLowerCase().includes("nanobanana")) {
        return <ImageIcon className="w-4 h-4" />;
      }
    }
    return <MessageSquare className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" data-testid="text-agents-title">
                <Sparkles className="w-8 h-8 text-primary" />
                AI Agent Marketplace
              </h1>
              <p className="text-muted-foreground" data-testid="text-agents-subtitle">
                Discover specialized AI agents powered by cutting-edge models
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-agents"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setLocation("/builder/agent")} data-testid="button-create-agent">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredAgents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No agents found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button onClick={() => setLocation("/builder/agent")} data-testid="button-create-first-agent">
                  Create Your First Agent
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="hover-elevate transition-all"
                  data-testid={`card-agent-${agent.id}`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getModelIcon(agent.modelProvider, agent.modelName)}
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="default">
                        {agent.category}
                      </Badge>
                      <Badge variant="secondary">
                        {agent.modelProvider}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <span>{agent.creditCost} credits</span>
                      </div>
                      <div className="text-muted-foreground">
                        {agent.usageCount || 0} uses
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => setLocation(`/agents/${agent.id}`)}
                      data-testid={`button-run-agent-${agent.id}`}
                    >
                      Run Agent
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Sparkles, Video, Image as ImageIcon, MessageSquare, Zap } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <div className="h-4 bg-slate-800 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-800 rounded animate-pulse" />
                    <div className="h-3 bg-slate-800 rounded animate-pulse w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">AI Agent Marketplace</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Discover specialized AI agents powered by cutting-edge models
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
              data-testid="input-search-agents"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48 bg-slate-900/50 border-slate-800 text-white" data-testid="select-category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredAgents.length === 0 ? (
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Sparkles className="w-16 h-16 text-slate-700 mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No agents found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => setLocation("/builder/agent")} data-testid="button-create-agent">
                Create Your First Agent
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="bg-slate-900/50 border-slate-800 hover-elevate transition-all"
                data-testid={`card-agent-${agent.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        {getModelIcon(agent.modelProvider, agent.modelName)}
                        {agent.name}
                      </CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {agent.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                      {agent.category}
                    </Badge>
                    <Badge variant="outline" className="text-slate-400 border-slate-700">
                      {agent.modelProvider}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>{agent.creditCost} credits</span>
                    </div>
                    <div className="text-slate-500">
                      {agent.usageCount || 0} uses
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
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
    </div>
  );
}

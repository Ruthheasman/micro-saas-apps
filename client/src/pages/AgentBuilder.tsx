import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Sparkles, Plus, Trash2, Loader2 } from "lucide-react";

interface InputField {
  name: string;
  label: string;
  type: string;
}

const MODEL_PROVIDERS = [
  { value: "openrouter", label: "OpenRouter (LLMs)" },
  { value: "kieai", label: "kie.ai (Video/Image)" },
];

const OPENROUTER_MODELS = [
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
  { value: "openai/gpt-4o", label: "GPT-4o" },
  { value: "meta-llama/llama-3.1-70b-instruct", label: "Llama 3.1 70B" },
];

const KIEAI_MODELS = [
  { value: "veo-3", label: "Veo 3 (Video)" },
  { value: "veo-3.1", label: "Veo 3.1 (Video)" },
  { value: "sora-2-pro", label: "Sora 2 Pro (Video)" },
  { value: "nano-banana", label: "nano-banana (Image Edit)" },
  { value: "seedance", label: "Seedance (Image-to-Video)" },
];

export default function AgentBuilder() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [modelProvider, setModelProvider] = useState<string>("openrouter");
  const [modelName, setModelName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [creditCost, setCreditCost] = useState("10");
  const [inputFields, setInputFields] = useState<InputField[]>([
    { name: "prompt", label: "Prompt", type: "textarea" }
  ]);

  const createMutation = useMutation({
    mutationFn: async (agentData: any) => {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create agent");
      }
      return response.json();
    },
    onSuccess: (agent) => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      toast({
        title: "Success!",
        description: "Agent created successfully",
      });
      setLocation(`/agents/${agent.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create agent",
        variant: "destructive",
      });
    },
  });

  const handleAddField = () => {
    setInputFields([...inputFields, { name: "", label: "", type: "text" }]);
  };

  const handleRemoveField = (index: number) => {
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: keyof InputField, value: string) => {
    const newFields = [...inputFields];
    newFields[index][field] = value;
    setInputFields(newFields);
  };

  const handleCreate = () => {
    if (!name || !description || !category || !modelProvider || !modelName) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const agentData = {
      name,
      description,
      category,
      modelProvider,
      modelName,
      systemPrompt: modelProvider === "openrouter" ? systemPrompt : "",
      creditCost: parseInt(creditCost) || 10,
      inputSchema: inputFields.filter(f => f.name && f.label),
    };

    createMutation.mutate(agentData);
  };

  const availableModels = modelProvider === "openrouter" ? OPENROUTER_MODELS : KIEAI_MODELS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">Create AI Agent</h1>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
            <CardDescription className="text-slate-400">
              Define your agent's identity and purpose
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Agent Name</Label>
              <Input
                placeholder="e.g., Product Description Generator"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                data-testid="input-agent-name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Description</Label>
              <Textarea
                placeholder="Describe what your agent does..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                data-testid="input-agent-description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Category</Label>
                <Input
                  placeholder="e.g., Content Creation"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                  data-testid="input-agent-category"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Credit Cost</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={creditCost}
                  onChange={(e) => setCreditCost(e.target.value)}
                  className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                  data-testid="input-credit-cost"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Model Configuration</CardTitle>
            <CardDescription className="text-slate-400">
              Choose the AI model that powers your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Model Provider</Label>
              <Select value={modelProvider} onValueChange={setModelProvider}>
                <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white" data-testid="select-model-provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODEL_PROVIDERS.map(provider => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Model</Label>
              <Select value={modelName} onValueChange={setModelName}>
                <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white" data-testid="select-model-name">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {modelProvider === "openrouter" && (
              <div className="space-y-2">
                <Label className="text-slate-300">System Prompt</Label>
                <Textarea
                  placeholder="You are an expert assistant that..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                  rows={4}
                  data-testid="input-system-prompt"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Input Fields</CardTitle>
            <CardDescription className="text-slate-400">
              Define what inputs users provide when running your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputFields.map((field, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Field Name</Label>
                  <Input
                    placeholder="e.g., prompt"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                    data-testid={`input-field-name-${index}`}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Label</Label>
                  <Input
                    placeholder="e.g., Enter your prompt"
                    value={field.label}
                    onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600"
                    data-testid={`input-field-label-${index}`}
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label className="text-slate-300">Type</Label>
                  <Select value={field.type} onValueChange={(v) => handleFieldChange(index, "type", v)}>
                    <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white" data-testid={`select-field-type-${index}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveField(index)}
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  data-testid={`button-remove-field-${index}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handleAddField}
              className="w-full border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
              data-testid="button-add-field"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Input Field
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setLocation("/agents")}
            className="border-slate-700 text-slate-400"
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={createMutation.isPending}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            data-testid="button-create-agent"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Agent"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import WalletStatus from "@/components/WalletStatus";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Code, Eye, Settings, Loader2, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function BuilderPage() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("design");
  const [price, setPrice] = useState([0.25]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [appName, setAppName] = useState("");
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-app", {
        description,
        category,
        price: price[0],
      });
      const data = (await response.json()) as { code: string; success: boolean };
      return data;
    },
    onSuccess: (data) => {
      setGeneratedCode(data.code);
      toast({
        title: "App Generated!",
        description: "Your app has been created successfully.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate app",
        variant: "destructive",
      });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/apps", {
        name: appName || "Untitled App",
        description,
        category,
        price: price[0].toString(),
        code: generatedCode,
        status: "draft",
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "App Saved!",
        description: "Your app has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save app",
        variant: "destructive",
      });
    },
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Prompt & Config */}
        <div className="w-full lg:w-2/5 border-r p-6 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold" data-testid="text-builder-title">AI App Builder</h1>
            <p className="text-muted-foreground" data-testid="text-builder-subtitle">
              Describe your app and watch it come to life
            </p>
          </div>

          {/* App Description */}
          <div className="space-y-2">
            <Label htmlFor="description">What do you want to build?</Label>
            <Textarea
              id="description"
              placeholder="Example: Create a color palette generator that extracts colors from images and suggests complementary shades..."
              className="min-h-32 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-app-description"
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design Tools</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="developer">Developer Tools</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Setting */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Price Per Use</Label>
              <span className="text-sm font-medium" data-testid="text-price-value">
                ${price[0].toFixed(2)}
              </span>
            </div>
            <Slider
              value={price}
              onValueChange={setPrice}
              min={0.05}
              max={10}
              step={0.05}
              data-testid="slider-price"
            />
            <p className="text-xs text-muted-foreground">
              Set between $0.05 - $10.00
            </p>
          </div>

          {/* Generate Button */}
          <Button
            className="w-full gap-2"
            size="lg"
            onClick={() => generateMutation.mutate()}
            disabled={!description || generateMutation.isPending}
            data-testid="button-generate-app"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate App
              </>
            )}
          </Button>

          {/* Wallet Status */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold">BSV Wallet</h3>
            <WalletStatus />
          </div>

          {/* Template Gallery */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold">Quick Start Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Color Picker", desc: "Create a color picker tool with hex, RGB, and HSL values" },
                { name: "QR Generator", desc: "Create a QR code generator with custom styling" },
                { name: "PDF Tool", desc: "Create a PDF converter and editor tool" },
                { name: "Calculator", desc: "Create a scientific calculator with history" },
              ].map((template) => (
                <Card
                  key={template.name}
                  className="p-3 cursor-pointer hover-elevate active-elevate-2 transition-all"
                  onClick={() => setDescription(template.desc)}
                  data-testid={`card-template-${template.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <p className="text-sm font-medium">{template.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview & Code */}
        <div className="flex-1 flex flex-col">
          {!generatedCode ? (
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="text-center space-y-4 max-w-md">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Ready to Build</h3>
                <p className="text-muted-foreground">
                  Describe your app idea on the left and click Generate to see it come to life
                </p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="code" className="flex-1 flex flex-col">
              <div className="border-b px-6 pt-4">
                <TabsList>
                  <TabsTrigger value="code" className="gap-2" data-testid="tab-code">
                    <Code className="h-4 w-4" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2" data-testid="tab-settings">
                    <Settings className="h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="code" className="flex-1 p-6 mt-0">
                <div className="h-full border rounded-lg bg-muted/50 p-6 font-mono text-sm overflow-auto">
                  <pre className="text-foreground whitespace-pre-wrap">{generatedCode}</pre>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="flex-1 p-6 mt-0 space-y-4">
                <Card className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>App Name</Label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="My Awesome App"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      data-testid="input-app-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Brief description of your app"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      data-testid="input-settings-description"
                    />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Bottom Action Bar */}
          {generatedCode && (
            <div className="border-t p-6 flex items-center justify-between bg-muted/30">
              <div className="space-y-1">
                <p className="text-sm font-medium">Ready to save?</p>
                <p className="text-xs text-muted-foreground">
                  Save as draft or deploy to blockchain
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending}
                  data-testid="button-save-draft"
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Save Draft
                </Button>
                <Button size="lg" data-testid="button-deploy">
                  Deploy to Blockchain
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

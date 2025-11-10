import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Code, Eye, Settings, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function BuilderPage() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("design");
  const [price, setPrice] = useState([0.25]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    console.log("Generating app:", { description, category, price: price[0] });
    setIsGenerating(true);
    //todo: remove mock functionality
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

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
            onClick={handleGenerate}
            disabled={!description || isGenerating}
            data-testid="button-generate-app"
          >
            {isGenerating ? (
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

          {/* Template Gallery */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold">Quick Start Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Color Picker", "QR Generator", "PDF Tool", "Calculator"].map((template) => (
                <Card
                  key={template}
                  className="p-3 cursor-pointer hover-elevate active-elevate-2 transition-all"
                  onClick={() => setDescription(`Create a ${template.toLowerCase()}`)}
                  data-testid={`card-template-${template.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <p className="text-sm font-medium">{template}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview & Code */}
        <div className="flex-1 flex flex-col">
          {!hasGenerated ? (
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
            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
              <div className="border-b px-6 pt-4">
                <TabsList>
                  <TabsTrigger value="preview" className="gap-2" data-testid="tab-preview">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
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

              <TabsContent value="preview" className="flex-1 p-6 mt-0">
                <div className="h-full border rounded-lg bg-card p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Badge variant="secondary">Live Preview</Badge>
                    <p className="text-muted-foreground">
                      Your generated app would appear here
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="flex-1 p-6 mt-0">
                <div className="h-full border rounded-lg bg-muted/50 p-6 font-mono text-sm overflow-auto">
                  <pre className="text-muted-foreground">
                    {`// Generated React Component\nimport { useState } from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-8">\n      <h1>Your App</h1>\n    </div>\n  );\n}`}
                  </pre>
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
                      data-testid="input-app-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Brief description of your app" data-testid="input-settings-description" />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Bottom Action Bar */}
          {hasGenerated && (
            <div className="border-t p-6 flex items-center justify-between bg-muted/30">
              <div className="space-y-1">
                <p className="text-sm font-medium">Ready to deploy?</p>
                <p className="text-xs text-muted-foreground">
                  Estimated cost: <span className="font-semibold text-foreground">&lt;$0.01</span>
                </p>
              </div>
              <Button size="lg" data-testid="button-deploy">
                Deploy to Blockchain
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

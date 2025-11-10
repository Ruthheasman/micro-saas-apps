import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTestApp } from "@/contexts/TestAppContext";

export default function TestAppPage() {
  const [, params] = useRoute("/test/:appName");
  const { testAppCode, testAppName } = useTestApp();
  const [showCode, setShowCode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const code = testAppCode;
  const appName = params?.appName || testAppName || "Untitled App";
  const error = !testAppCode ? "No app code found. Please generate an app first." : "";

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const AppComponent = ({ code }: { code: string }) => {
    try {
      const componentCode = code
        .replace(/^import.*$/gm, "")
        .replace(/^export default/gm, "return");
      
      const Component = new Function(
        "React",
        "useState",
        "useEffect",
        "Card",
        "Button",
        "Badge",
        componentCode
      )(
        { createElement: (window as any).React.createElement, Fragment: (window as any).React.Fragment },
        useState,
        useEffect,
        Card,
        Button,
        Badge
      );

      return <Component />;
    } catch (err) {
      return (
        <div className="p-8 text-center" data-testid="text-render-error">
          <h3 className="text-lg font-semibold text-destructive mb-2">Render Error</h3>
          <p className="text-sm text-muted-foreground">
            {err instanceof Error ? err.message : "Failed to render component"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setShowCode(true)}
            data-testid="button-view-code"
          >
            <Code className="h-4 w-4 mr-2" />
            View Code
          </Button>
        </div>
      );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="border-b p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/builder">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
                Back to Builder
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-8">
          <Card className="p-8 max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold" data-testid="text-error-title">No App Found</h2>
            <p className="text-muted-foreground" data-testid="text-error-message">{error}</p>
            <Link href="/builder">
              <Button data-testid="button-go-builder">Go to Builder</Button>
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b p-4 bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/builder">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-builder">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold" data-testid="text-app-name">
                {params?.appName || "Untitled App"}
              </h1>
              <p className="text-xs text-muted-foreground">Test Environment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" data-testid="badge-test-mode">
              Test Mode
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              data-testid="button-toggle-code"
            >
              <Code className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "View"} Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              data-testid="button-refresh"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {showCode ? (
          <div className="container mx-auto p-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4" data-testid="text-code-title">Generated Code</h2>
              <div className="bg-muted/50 p-4 rounded-lg overflow-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap" data-testid="text-code-content">
                  {code}
                </pre>
              </div>
            </Card>
          </div>
        ) : (
          <div className="container mx-auto p-6">
            <div data-testid="container-app-preview" key={refreshKey}>
              {code && <AppComponent code={code} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

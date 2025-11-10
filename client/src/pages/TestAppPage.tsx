import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, RefreshCw, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTestApp } from "@/contexts/TestAppContext";

type IframeMessage = {
  type: 'READY' | 'RENDERED' | 'ERROR';
  error?: {
    message: string;
    stack?: string;
  };
};

export default function TestAppPage() {
  const [, params] = useRoute("/test/:appName");
  const { testAppCode, testAppName } = useTestApp();
  const [showCode, setShowCode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const code = testAppCode;
  const appName = params?.appName || testAppName || "Untitled App";
  const error = !testAppCode ? "No app code found. Please generate an app first." : "";

  // Listen for errors from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent<IframeMessage>) => {
      if (event.data.type === 'ERROR') {
        setRuntimeError(event.data.error?.message || 'Unknown error');
      } else if (event.data.type === 'RENDERED') {
        setRuntimeError(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setRuntimeError(null);
  };

  const createIframeContent = (code: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName}</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    #root {
      min-height: 100vh;
    }
    .error-boundary {
      padding: 2rem;
      text-align: center;
      color: #dc2626;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    
    // Error boundary component
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }

      componentDidCatch(error, errorInfo) {
        console.error('App Error:', error, errorInfo);
        window.parent.postMessage({
          type: 'ERROR',
          error: {
            message: error.message,
            stack: error.stack
          }
        }, '*');
      }

      render() {
        if (this.state.hasError) {
          return (
            <div className="error-boundary">
              <h1>Runtime Error</h1>
              <p>{this.state.error?.message || 'Unknown error'}</p>
            </div>
          );
        }
        return this.props.children;
      }
    }

    // Global error handler
    window.onerror = function(message, source, lineno, colno, error) {
      window.parent.postMessage({
        type: 'ERROR',
        error: {
          message: typeof message === 'string' ? message : 'Syntax error in generated code',
          stack: error?.stack
        }
      }, '*');
      return true;
    };

    window.onunhandledrejection = function(event) {
      window.parent.postMessage({
        type: 'ERROR',
        error: {
          message: event.reason?.message || 'Unhandled promise rejection',
          stack: event.reason?.stack
        }
      }, '*');
    };

    try {
      ${code}

      const AppWrapper = () => {
        return (
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        );
      };

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<AppWrapper />);
      
      window.parent.postMessage({ type: 'RENDERED' }, '*');
    } catch (error) {
      window.parent.postMessage({
        type: 'ERROR',
        error: {
          message: error.message || 'Failed to render app',
          stack: error.stack
        }
      }, '*');
      
      document.getElementById('root').innerHTML = \`
        <div class="error-boundary">
          <h1>Syntax Error</h1>
          <p>\${error.message || 'Failed to parse generated code'}</p>
        </div>
      \`;
    }
  </script>
</body>
</html>
    `;
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
          <div className="h-full flex flex-col">
            {runtimeError && (
              <div className="container mx-auto p-6">
                <Alert variant="destructive" data-testid="alert-runtime-error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Runtime Error:</strong> {runtimeError}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <div className="flex-1" data-testid="container-app-preview">
              {code && (
                <iframe
                  key={refreshKey}
                  ref={iframeRef}
                  srcDoc={createIframeContent(code)}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  title={`Preview: ${appName}`}
                  data-testid="iframe-app-preview"
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

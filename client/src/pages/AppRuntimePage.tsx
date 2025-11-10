import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type App = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  code: string;
  status: string;
};

export default function AppRuntimePage() {
  const { id } = useParams();
  const [iframeKey, setIframeKey] = useState(0);

  const { data: app, isLoading, error } = useQuery<App>({
    queryKey: ['/api/apps', id],
    enabled: !!id,
  });

  useEffect(() => {
    if (app?.code) {
      setIframeKey(prev => prev + 1);
    }
  }, [app?.code]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" data-testid="loader-app-runtime">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription data-testid="text-error-message">
            {error ? "Failed to load app" : "App not found"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${app.name}</title>
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
      }

      render() {
        if (this.state.hasError) {
          return (
            <div className="error-boundary">
              <h1>Something went wrong</h1>
              <p>{this.state.error?.message || 'Unknown error'}</p>
            </div>
          );
        }
        return this.props.children;
      }
    }

    ${app.code}

    const AppWrapper = () => {
      return (
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<AppWrapper />);
  </script>
</body>
</html>
  `;

  return (
    <div className="h-screen w-full" data-testid="container-app-runtime">
      <iframe
        key={iframeKey}
        srcDoc={htmlContent}
        className="w-full h-full border-0"
        title={app.name}
        sandbox="allow-scripts"
        data-testid="iframe-app-runtime"
      />
    </div>
  );
}

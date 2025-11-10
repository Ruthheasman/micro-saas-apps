import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TestAppProvider } from "@/contexts/TestAppContext";
import HomePage from "@/pages/HomePage";
import BuilderPage from "@/pages/BuilderPage";
import DiscoveryPage from "@/pages/DiscoveryPage";
import DashboardPage from "@/pages/DashboardPage";
import AppRuntimePage from "@/pages/AppRuntimePage";
import TestAppPage from "@/pages/TestAppPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/builder" component={BuilderPage} />
      <Route path="/discover" component={DiscoveryPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/app/:id" component={AppRuntimePage} />
      <Route path="/test/:appName" component={TestAppPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TestAppProvider>
          <Toaster />
          <Router />
        </TestAppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

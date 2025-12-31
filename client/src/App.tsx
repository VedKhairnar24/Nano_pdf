import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Unlock from "@/pages/Unlock";
import Compress from "@/pages/Compress";
import Protect from "@/pages/Protect";
import Organize from "@/pages/Organize";
import Crop from "@/pages/Crop";
import Redact from "@/pages/Redact";
import OCR from "@/pages/OCR";
import Scan from "@/pages/Scan";
import Compare from "@/pages/Compare";
import AllTools from "@/pages/AllTools";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";

function Router() {
  return (
    <Switch>
      {/* Main application page */}
      <Route path="/" component={Home} />
      <Route path="/unlock" component={Unlock} />
      <Route path="/compress" component={Compress} />
      <Route path="/protect" component={Protect} />
      <Route path="/organize" component={Organize} />
      <Route path="/crop" component={Crop} />
      <Route path="/redact" component={Redact} />
      <Route path="/ocr" component={OCR} />
      <Route path="/scan" component={Scan} />
      <Route path="/compare" component={Compare} />
      <Route path="/all-tools" component={AllTools} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Router />
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

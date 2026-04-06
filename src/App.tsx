import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Landing from "@/pages/Landing";
import AuditIntro from "@/pages/AuditIntro";
import AuditQuestions from "@/pages/AuditQuestions";
import EmailGate from "@/pages/EmailGate";
import Results from "@/pages/Results";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/audit" element={<AuditIntro />} />
          <Route path="/audit/questions" element={<AuditQuestions />} />
          <Route path="/audit/results-gate" element={<EmailGate />} />
          <Route path="/audit/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

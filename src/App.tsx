import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";

import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ProfileSetup from "@/pages/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import AICreditEvaluation from "@/pages/AICreditEvaluation";
import Funding from "@/pages/Funding";
import LoanTransparency from "@/pages/LoanTransparency";
import Chatbot from "@/pages/Chatbot";
import Expenses from "@/pages/Expenses";
import Investments from "@/pages/Investments";
import Learning from "@/pages/Learning";
import Community from "@/pages/Community";
import Emergency from "@/pages/Emergency";
import Help from "@/pages/Help";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <AuthProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/profile-setup" element={<ProfileSetup />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/credit-evaluation" element={<AICreditEvaluation />} />
                      <Route path="/funding" element={<Funding />} />
                      <Route path="/loan-transparency" element={<LoanTransparency />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/expenses" element={<Expenses />} />
                      <Route path="/investments" element={<Investments />} />
                      <Route path="/learning" element={<Learning />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/settings" element={<Settings />} />
                    </Route>
                    
                    {/* Catch all */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

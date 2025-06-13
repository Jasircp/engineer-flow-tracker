import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Engineers from "./pages/Engineers";
import CreateProject from "./pages/CreateProject";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout userRole="hr">
              <Dashboard />
            </Layout>
          } />
          <Route path="/projects" element={
            <Layout userRole="hr">
              <Projects />
            </Layout>
          } />
          <Route path="/projects/:id" element={
            <Layout userRole="hr">
              <ProjectDetails />
            </Layout>
          } />
          <Route path="/engineers" element={
            <Layout userRole="hr">
              <Engineers />
            </Layout>
          } />
          <Route path="/create-project" element={
            <Layout userRole="hr">
              <CreateProject />
            </Layout>
          } />
          <Route path="/assignments" element={
            <Layout userRole="hr">
              <Dashboard />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

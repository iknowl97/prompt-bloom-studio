
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { PromptProvider } from "./contexts/PromptContext";
import { UserProvider } from "./contexts/UserContext";
import { ROUTES } from "./config/constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <PromptProvider>
          <Toaster />
          <Sonner position="top-right" expand closeButton richColors />
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.HOME} element={<Index />} />
              <Route path={ROUTES.GALLERY} element={<Gallery />} />
              <Route path={ROUTES.ADMIN} element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PromptProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

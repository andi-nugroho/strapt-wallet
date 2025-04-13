import React from 'react';
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { PrivyProvider } from "@/providers/PrivyProvider";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";
import Streams from "./pages/Streams";
import Pools from "./pages/Pools";
import Profile from "./pages/Profile";
import Claims from "./pages/Claims";
import Savings from "./pages/Savings";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import DesktopLayout from "./components/DesktopLayout";
import WalletCheck from './components/WalletCheck';

const App = () => {
  const isMobile = useIsMobile();

  return (
    <PrivyProvider>
      <TooltipProvider>
        <Sonner position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Protected routes require wallet connection */}
            <Route element={<WalletCheck />}>
              <Route path="app" element={isMobile ? <Layout /> : <DesktopLayout />}>
                <Route index element={<Home />} />
                <Route path="transfer" element={<Transfer />} />
                <Route path="streams" element={<Streams />} />
                <Route path="pools" element={<Pools />} />
                <Route path="profile" element={<Profile />} />
                <Route path="claims" element={<Claims />} />
                <Route path="savings" element={<Savings />} />
                <Route path="coming-soon" element={<ComingSoon />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PrivyProvider>
  );
};

export default App;

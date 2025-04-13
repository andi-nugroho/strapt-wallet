
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Outlet } from 'react-router-dom';
import { Droplets, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import BottomNav from './BottomNav';
import Header from './Header';
import FaucetClaim from './FaucetClaim';
import QRCodeScanner from './QRCodeScanner';

const Layout = () => {
  const [showFaucet, setShowFaucet] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="app-container">
      <Header />
      <main className="p-4 pb-20 animate-fade-in">
        <Outlet />
      </main>
      <BottomNav />
      
      {/* Floating buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col space-y-2">
        <Button 
          className="rounded-full shadow-lg"
          size="icon"
          onClick={() => setShowScanner(true)}
        >
          <Scan className="h-5 w-5" />
        </Button>
        <Button 
          className="rounded-full shadow-lg"
          size="icon"
          onClick={() => setShowFaucet(true)}
        >
          <Droplets className="h-5 w-5" />
        </Button>
      </div>
      
      <Dialog open={showFaucet} onOpenChange={setShowFaucet}>
        <DialogContent className={isMobile ? "sm:max-w-[92%] w-[92%] mx-auto rounded-xl px-3 py-4" : ""}>
          <DialogHeader>
            <DialogTitle>Get Free Test Funds</DialogTitle>
            <DialogDescription>Get some practice money to try out the app's features - no real money involved!</DialogDescription>
          </DialogHeader>
          <FaucetClaim onClose={() => setShowFaucet(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className={isMobile ? "sm:max-w-[92%] w-[92%] mx-auto rounded-xl px-3 py-4" : ""}>
          <DialogHeader>
            <DialogTitle>Scan Code</DialogTitle>
            <DialogDescription>Scan a QR code to receive money or add a friend</DialogDescription>
          </DialogHeader>
          <QRCodeScanner 
            triggerType="button" 
            onScanSuccess={() => setShowScanner(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;

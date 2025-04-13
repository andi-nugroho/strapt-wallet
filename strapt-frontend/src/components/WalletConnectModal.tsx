
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import ConnectWalletButton from './ConnectWalletButton';

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
}

const WalletConnectModal = ({ open, onClose }: WalletConnectModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={isMobile ? "sm:max-w-md w-[92%] mx-auto rounded-xl px-3 py-4" : "sm:max-w-md"}>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Select a wallet to connect to TrustStream
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="mb-4">
            <ConnectWalletButton />
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>First time setting up a wallet?</p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary"
              onClick={() => {
                onClose();
                navigate('/app/coming-soon', { 
                  state: { 
                    title: "Wallet Setup Guide", 
                    description: "Our comprehensive guide to setting up your first crypto wallet is coming soon." 
                  } 
                });
              }}
            >
              Learn how to set up a wallet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;

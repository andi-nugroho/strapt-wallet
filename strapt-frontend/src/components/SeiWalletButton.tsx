import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const SeiWalletButton: React.FC = () => {
  const { 
    isConnected, 
    connectWallet, 
    disconnectWallet, 
    address,
    ready,
    wallets,
    activeWallet
  } = usePrivyWallet();
  
  const [showNetworkDialog, setShowNetworkDialog] = useState(false);

  // Format the address for display
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : '';

  // Handle connection/disconnection
  const handleConnect = async () => {
    if (isConnected) {
      // If connected, show network details
      setShowNetworkDialog(true);
    } else {
      // If not connected, start wallet connection
      await connectWallet();
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setShowNetworkDialog(false);
  };

  if (!ready) {
    return (
      <Button 
        variant="outline" 
        size="default" 
        className="w-full" 
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <>
      <Button 
        variant={isConnected ? 'outline' : 'default'} 
        size="default"
        className="w-full"
        onClick={handleConnect}
      >
        {isConnected ? displayAddress : 'Connect SEI Wallet'}
      </Button>
      
      {/* Network Details Dialog */}
      <Dialog open={showNetworkDialog} onOpenChange={setShowNetworkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Your SEI Wallet</DialogTitle>
            <DialogDescription>
              Connected to the SEI Pacific network
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Address:</span>
                <span className="font-mono text-sm">{address}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Network:</span>
                <span className="text-sm">SEI Pacific (ID: 11672)</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Wallet Type:</span>
                <span className="text-sm">{activeWallet?.walletClientType || 'Embedded'}</span>
              </div>
            </div>

            <Button 
              variant="destructive" 
              className="mt-2"
              onClick={handleDisconnect}
            >
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SeiWalletButton; 
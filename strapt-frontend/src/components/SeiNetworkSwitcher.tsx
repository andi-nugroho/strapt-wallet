import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { seiTestnet } from 'viem/chains';
import { seiTestnet } from '@/lib/chains';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';

const SeiNetworkSwitcher: React.FC = () => {
  const { activeWallet, isConnected, connectWallet } = usePrivyWallet();
  const [isPending, setIsPending] = useState(false);
  
  // Simple check for SEI - in a real app, you would implement proper chain detection
  const isSeiNetwork = activeWallet?.walletClientType === 'privy';
  
  const handleSwitchToSei = async () => {
    setIsPending(true);
    try {
      if (!isConnected) {
        await connectWallet();
      }
      // In Privy, you should connect to the wallet first then handle chain selection
      // through their interface or using wallet-specific methods
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Current Network:</span>
        <span className="text-sm">
          {isSeiNetwork ? (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              SEI Pacific
            </span>
          ) : (
            <span className="text-muted-foreground">
              {activeWallet ? 'Other Network' : 'Not connected'}
            </span>
          )}
        </span>
      </div>
      
      {!isSeiNetwork && (
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full" 
          onClick={handleSwitchToSei}
          disabled={isPending}
        >
          {isPending ? 'Connecting...' : isConnected ? 'Switch to SEI' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
};

export default SeiNetworkSwitcher; 
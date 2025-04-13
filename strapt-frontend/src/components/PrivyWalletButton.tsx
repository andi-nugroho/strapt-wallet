import React from 'react';
import { Button } from '@/components/ui/button';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';
import { Loader2 } from 'lucide-react';

interface PrivyWalletButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const PrivyWalletButton: React.FC<PrivyWalletButtonProps> = ({ 
  variant = 'default',
  size = 'default',
  className = '',
}) => {
  const { 
    isConnected, 
    disconnectWallet, 
    address,
    ready,
    login
  } = usePrivyWallet();

  // Format the address for display
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : '';

  // Handle connection/disconnection
  const handleClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else if (ready) {
      // Call login directly for a better UX
      login();
    }
  };

  if (!ready) {
    return (
      <Button 
        variant="outline" 
        size={size} 
        className={className} 
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <Button 
      variant={isConnected ? 'outline' : variant} 
      size={size} 
      className={className}
      onClick={handleClick}
    >
      {isConnected ? displayAddress : 'Connect Wallet'}
    </Button>
  );
};

export default PrivyWalletButton; 
import { usePrivyWallet } from '@/hooks/use-privy-wallet';
import { useSeiNetwork } from '@/hooks/use-sei-network';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { Network, LogOut, Copy, ExternalLink, Wallet, Check } from 'lucide-react';
import { useState } from 'react';
import { useConfig, useAccount, useChainId, useSwitchChain, useBalance } from 'wagmi';
import { sepolia, baseSepolia } from 'viem/chains';
import { seiTestnet } from '@/lib/chains';

const PrivyWalletProfile = () => {
  const { isConnected, address, disconnectWallet, login, user, activeWallet } = usePrivyWallet();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Use updated wagmi hooks
  const chainId = useChainId();
  const config = useConfig();
  const { switchChain } = useSwitchChain();
  
  // Get balance using the account hook
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });
  
  // Get the current chain information
  const currentChain = config.chains.find(c => c.id === chainId);

  // Available networks
  const networks = [
    { ...sepolia, name: 'Sepolia' },
    { ...baseSepolia, name: 'Base Sepolia' },
    { ...seiTestnet, name: 'SEI Testnet' }
  ];

  // If not connected, show connect button
  if (!isConnected || !address) {
    return (
      <Button onClick={() => login()} className="gap-2" size="sm">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast("Address Copied", {
        description: "Your wallet address has been copied to clipboard",
      });
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast("Disconnected", {
      description: "Your wallet has been disconnected",
    });
  };

  const handleSwitchNetwork = async (networkId: number) => {
    setIsLoading(true);
    try {
      switchChain({ chainId: networkId });
        toast.success("Network Updated", {
          description: `Switched to ${networks.find(n => n.id === networkId)?.name}`,
        });
    } catch (error) {
      console.error("Error switching network:", error);
      toast.error("Network Switch Failed", {
        description: "Could not switch networks. Make sure you have a compatible wallet connected.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isLoading}
          >
            <Network className="h-4 w-4" />
            <span className="hidden md:inline">
              {currentChain ? currentChain.name : 'Switch Network'}
            </span>
            {balance && (
              <span className="hidden md:inline text-muted-foreground">
                ({parseFloat(balance.formatted).toFixed(4)} {balance.symbol})
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Select Network</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {networks.map((network) => (
            <DropdownMenuItem
              key={network.id}
              className="cursor-pointer"
              onClick={() => handleSwitchNetwork(network.id)}
            >
              <span className="flex items-center justify-between w-full">
                {network.name}
                {chainId === network.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>{truncatedAddress.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{truncatedAddress}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {balance && `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy address</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/app/profile')}>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>View profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleDisconnect}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PrivyWalletProfile;
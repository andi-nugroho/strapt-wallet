
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { useConnectModal, useChainModal, useAccountModal } from '@rainbow-me/rainbowkit';
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
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Network, LogOut, Copy, ExternalLink, Wallet } from 'lucide-react';

const RainbowKitProfile = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!isConnected) {
    return (
      <Button onClick={openConnectModal} className="gap-2" size="sm">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Your wallet address has been copied to clipboard",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Disconnected",
      description: "Your wallet has been disconnected",
    });
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={openChainModal}
      >
        <Network className="h-4 w-4" />
        <span className="hidden md:inline">Switch Network</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{truncatedAddress}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {balanceData?.formatted
                  ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}`
                  : 'Balance unavailable'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={openAccountModal}>
            <Wallet className="mr-2 h-4 w-4" />
            <span>Account details</span>
          </DropdownMenuItem>
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

export default RainbowKitProfile;

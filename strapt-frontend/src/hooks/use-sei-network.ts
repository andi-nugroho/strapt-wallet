import { defaultSeiChain } from '@/lib/chains';
import { usePrivyWallet } from './use-privy-wallet';

export function useSeiNetwork() {
  const { isConnected, connectWallet, activeWallet } = usePrivyWallet();
  
  // Simple check if connected - we'll assume SEI network in this simplified version
  const isSeiNetwork = !!activeWallet && isConnected;
  
  // Function to ensure connected to wallet
  const ensureSeiConnection = async () => {
    // If not connected at all, connect first
    if (!isConnected) {
      await connectWallet();
      return false;
    }
    
    // Already connected
    return true;
  };
  
  return {
    isSeiNetwork,
    ensureSeiConnection,
    // Return the default SEI chain data for UI display
    seiChainId: defaultSeiChain.id,
    currentChainId: isSeiNetwork ? defaultSeiChain.id : undefined,
    currentChainName: isSeiNetwork ? defaultSeiChain.name : undefined,
  };
} 

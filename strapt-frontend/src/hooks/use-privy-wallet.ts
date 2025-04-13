import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Wallet {
  address: string;
  walletClientType: string;
}

export function usePrivyWallet() {
  const privy = usePrivy();
  const { 
    ready,
    authenticated,
    user,
    login,
    logout,
    createWallet,
    sendTransaction,
    linkWallet,
    unlinkWallet,
  } = privy;
  
  // Access wallets from user object instead
  const wallets = user?.linkedAccounts as Wallet[] || [];
  
  const navigate = useNavigate();

  // Get the currently active wallet (first embedded wallet or first linked wallet)
  const activeWallet = wallets?.find(wallet => wallet.walletClientType === 'privy')
    || wallets?.[0] 
    || null;

  // Check if user has any wallet
  const hasWallet = wallets && wallets.length > 0;

  // Auto-navigate to app after successful connection
  useEffect(() => {
    if (authenticated && hasWallet) {
      // Check if we're on the landing page and navigate if needed
      if (window.location.pathname === '/') {
        navigate('/app');
      }
    }
  }, [authenticated, hasWallet, navigate]);

  // Function to handle wallet connection - simplified to avoid conflicts
  const connectWallet = async () => {
    try {
      // For a better user experience, call login directly
      if (ready && !authenticated) {
        return login();
      }
      return null;
    } catch (error) {
      console.error("Wallet connection error:", error);
      return null;
    }
  };

  // Function to disconnect wallet - simplified to avoid conflicts
  const disconnectWallet = async () => {
    try {
      if (authenticated) {
        await logout();
        navigate('/');
      }
    } catch (error) {
      console.error("Wallet disconnection error:", error);
    }
  };

  // Return the necessary wallet functions and state
  return {
    ready,
    isConnected: authenticated && hasWallet,
    address: activeWallet?.address,
    wallets,
    activeWallet,
    user,
    connectWallet,
    disconnectWallet,
    login,
  };
} 

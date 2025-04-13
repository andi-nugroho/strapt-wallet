import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';
import LoadingScreen from './LoadingScreen';

const WalletCheck = () => {
  const { isConnected, login, ready } = usePrivyWallet();
  const location = useLocation();
  const [loginAttempted, setLoginAttempted] = useState(false);
  
  // Try to login once if not connected
  useEffect(() => {
    if (!isConnected && ready && !loginAttempted) {
      setLoginAttempted(true);
      // Use timeout to avoid triggering login during component mount
      const timer = setTimeout(() => {
        try {
          login();
        } catch (error) {
          console.error("Login error:", error);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isConnected, login, ready, loginAttempted]);

  // If not ready, show loading screen
  if (!ready) {
    return <LoadingScreen />;
  }

  // If not connected, prevent access to the app
  if (!isConnected) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If connected, render the children
  return <Outlet />;
};

export default WalletCheck;

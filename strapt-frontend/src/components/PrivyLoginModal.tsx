import React, { useEffect } from 'react';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';
import { usePrivy } from '@privy-io/react-auth';

interface PrivyLoginModalProps {
  open: boolean;
  onClose: () => void;
}

const PrivyLoginModal: React.FC<PrivyLoginModalProps> = ({ open, onClose }) => {
  const { login } = usePrivy();
  const { isConnected } = usePrivyWallet();
  
  // Directly open Privy UI when the modal is opened
  useEffect(() => {
    if (open) {
      login();
    }
  }, [open, login]);
  
  // Close modal if user is connected
  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  // No UI to render - Privy handles the UI
  return null;
};

export default PrivyLoginModal; 
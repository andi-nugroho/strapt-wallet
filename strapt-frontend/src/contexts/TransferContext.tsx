
import { createContext, useContext, useState, ReactNode } from 'react';
import { TokenOption } from '@/components/TokenSelect';
import { DurationUnit } from '@/components/DurationSelect';

export type TransferType = 'direct' | 'claim';

interface TransferContextType {
  recipient: string;
  setRecipient: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  withTimeout: boolean;
  setWithTimeout: (value: boolean) => void;
  withPassword: boolean;
  setWithPassword: (value: boolean) => void;
  timeout: number;
  setTimeout: (value: number) => void;
  timeoutUnit: DurationUnit;
  setTimeoutUnit: (value: DurationUnit) => void;
  password: string;
  setPassword: (value: string) => void;
  selectedToken: TokenOption;
  setSelectedToken: (value: TokenOption) => void;
  transferType: TransferType;
  setTransferType: (value: TransferType) => void;
  transferLink: string;
  setTransferLink: (value: string) => void;
  formatTimeout: () => string;
}

export const TransferContext = createContext<TransferContextType | undefined>(undefined);

export function useTransferContext() {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error('useTransferContext must be used within a TransferProvider');
  }
  return context;
}

// List of available tokens with their balances
export const tokens: TokenOption[] = [
  { symbol: 'SEI', name: 'Sei', balance: 1245.78 },
  { symbol: 'ETH', name: 'Ethereum', balance: 0.5 },
  { symbol: 'USDC', name: 'USD Coin', balance: 500.45 },
  { symbol: 'ATOM', name: 'Cosmos', balance: 25.32 },
];

export const TransferProvider = ({ children }: { children: ReactNode }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [withTimeout, setWithTimeout] = useState(false);
  const [withPassword, setWithPassword] = useState(false);
  const [timeout, setTimeout] = useState(24);
  const [timeoutUnit, setTimeoutUnit] = useState<DurationUnit>('hours');
  const [password, setPassword] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenOption>(tokens[0]);
  const [transferType, setTransferType] = useState<TransferType>('claim');
  const [transferLink, setTransferLink] = useState('');

  // Format timeout for display
  const formatTimeout = () => {
    switch (timeoutUnit) {
      case 'seconds': 
        return timeout === 1 ? "1 second" : `${timeout} seconds`;
      case 'minutes': 
        return timeout === 1 ? "1 minute" : `${timeout} minutes`;
      case 'hours': 
        return timeout === 1 ? "1 hour" : `${timeout} hours`;
      case 'days': 
        return timeout === 1 ? "1 day" : `${timeout} days`;
      default:
        return `${timeout} ${timeoutUnit}`;
    }
  };

  const value = {
    recipient,
    setRecipient,
    amount,
    setAmount,
    note,
    setNote,
    withTimeout,
    setWithTimeout,
    withPassword,
    setWithPassword,
    timeout,
    setTimeout,
    timeoutUnit,
    setTimeoutUnit,
    password,
    setPassword,
    selectedToken,
    setSelectedToken,
    transferType,
    setTransferType,
    transferLink,
    setTransferLink,
    formatTimeout,
  };

  return <TransferContext.Provider value={value}>{children}</TransferContext.Provider>;
};

import React from 'react';
import { PrivyProvider as PrivyProviderCore } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from 'wagmi';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { seiTestnet } from '@/lib/chains';
import { sepolia, baseSepolia } from 'viem/chains';

const config = createConfig({
  chains: [sepolia, seiTestnet, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [seiTestnet.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

// Get Privy App ID from environment variables
const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || 'your-privy-app-id';

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProviderCore
          appId={PRIVY_APP_ID}
          config={{
            loginMethods: ['email', 'telegram', 'google', 'wallet'],
            appearance: {
              theme: 'light',
              accentColor: '#3B82F6',
              showWalletLoginFirst: false,
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
              showWalletUIs: true,
            },
            defaultChain: seiTestnet,
            supportedChains: [sepolia, seiTestnet, baseSepolia],
            walletConnectCloudProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
          }}
        >
          {children}
        </PrivyProviderCore>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

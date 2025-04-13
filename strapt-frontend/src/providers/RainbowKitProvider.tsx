import { RainbowKitProvider as RKProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia, base, optimism, baseSepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a wagmi config
const config = createConfig({
  chains: [mainnet, sepolia, base, optimism, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Create a tanstack/query client
const queryClient = new QueryClient();

export function RainbowKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RKProvider modalSize="compact">
          {children}
        </RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

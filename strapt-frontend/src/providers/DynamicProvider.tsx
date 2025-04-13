import {
    DynamicContextProvider,
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
  import { createConfig, WagmiProvider } from "wagmi";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { http } from "viem";
  import { sepolia, baseSepolia,} from "viem/chains";
  import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
  import { CosmosWalletConnectors } from "@dynamic-labs/cosmos";

  const sei = [
    {
        blockExplorerUrls: ["https://www.seiscan.app/pacific-1"],
        chain: 'Sei',
        chainId: '404',
        iconUrls: ['https://app.dynamic.xyz/assets/networks/sei.svg'],
        lcdUrl: 'https://rest.wallet.pacific-1.sei.io',
        name: 'pacific-1',
        nativeCurrency: {
          decimals: 18,
          denom: 'usei',
          name: 'Sei',
          symbol: 'Sei',
        },
        networkId: '404',
        rpcUrls: ['https://rpc.wallet.pacific-1.sei.io'],
        shortName: 'Sei',
        vanityName: 'Sei',
      }
  ];
  
  const config = createConfig({
    chains: [sepolia, baseSepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
      [sepolia.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
  
  const queryClient = new QueryClient();
  
  export default function App() {
    return (
      <DynamicContextProvider
        settings={{
          environmentId: "d1c89807-2156-4590-b633-5d9ab93275ac",
          walletConnectors: [CosmosWalletConnectors, EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <DynamicWidget />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    );
  }
  

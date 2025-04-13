import { defineChain } from 'viem';

// Define the SEI Testnet chain
export const seiTestnet = defineChain({
  id: 1328,  // SEI Testnet chain ID
  name: 'SEI Testnet',
  network: 'sei-testnet',
  nativeCurrency: {
    decimals: 6,
    name: 'SEI',
    symbol: 'SEI',
  },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc-testnet.sei-apis.com/'],
    },
    public: {
      http: ['https://evm-rpc-testnet.sei-apis.com/'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'SEI Explorer', 
      url: 'https://www.seiscan.app/pacific-1' 
    },
  },
});

export const defaultSeiChain = seiTestnet;

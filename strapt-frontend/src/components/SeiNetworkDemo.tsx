import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSeiNetwork } from '@/hooks/use-sei-network';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';
import { Loader2 } from 'lucide-react';

const SeiNetworkDemo: React.FC = () => {
  const { isSeiNetwork, ensureSeiConnection, currentChainName } = useSeiNetwork();
  const { isConnected, address, activeWallet } = usePrivyWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [demoMessage, setDemoMessage] = useState<string | null>(null);

  const handleConnectToSei = async () => {
    setIsLoading(true);
    setDemoMessage(null);
    
    try {
      const isSei = await ensureSeiConnection();
      
      if (isSei) {
        setDemoMessage('Successfully connected to SEI Pacific network!');
      } else {
        setDemoMessage('Please complete the connection to SEI network in your wallet.');
      }
    } catch (error) {
      console.error('Error connecting to SEI:', error);
      setDemoMessage('Error connecting to SEI network. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>SEI Network Demo</CardTitle>
        <CardDescription>
          Connect to the SEI Pacific blockchain
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Connection Status:</span>
            <span className="text-sm">
              {isConnected ? (
                <span className="text-green-500">Connected</span>
              ) : (
                <span className="text-yellow-500">Not Connected</span>
              )}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm font-medium">Current Network:</span>
            <span className="text-sm">
              {currentChainName || 'Not connected'}
              {isSeiNetwork && <span className="ml-1 text-green-500">(✓ SEI)</span>}
            </span>
          </div>
          
          {isConnected && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Wallet Address:</span>
              <span className="text-sm font-mono">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unknown'}
              </span>
            </div>
          )}
          
          {demoMessage && (
            <div className="mt-4 p-3 bg-muted rounded-md text-sm">
              {demoMessage}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleConnectToSei}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            isSeiNetwork 
              ? 'Already on SEI Network' 
              : isConnected 
                ? 'Switch to SEI Network' 
                : 'Connect to SEI Network'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SeiNetworkDemo; 
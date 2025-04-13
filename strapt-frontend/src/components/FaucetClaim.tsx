
import { useState } from 'react';
import { Droplets, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import TokenSelect, { TokenOption } from '@/components/TokenSelect';

interface FaucetClaimProps {
  onClose?: () => void;
}

const FaucetClaim = ({ onClose }: FaucetClaimProps) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenOption>(tokens[0]);
  const { toast } = useToast();

  const handleClaim = async () => {
    setIsClaiming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsClaiming(false);
    setClaimed(true);
    
    toast({
      title: "Claim Successful",
      description: `You've claimed 10 ${selectedToken.symbol} from the faucet`,
    });
    
    // Reset after showing success
    setTimeout(() => {
      setClaimed(false);
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-primary" />
          Testnet Faucet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Claim testnet tokens to try out TrustStream features. These tokens have no real value and are only for testing purposes.
        </p>
        
        <div className="space-y-2">
          <TokenSelect
            tokens={tokens}
            selectedToken={selectedToken}
            onTokenChange={setSelectedToken}
          />
        </div>
        
        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Claim amount:</span>
            <span className="font-medium">10 {selectedToken.symbol}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            You can claim once every 24 hours per token
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleClaim}
          disabled={isClaiming || claimed}
        >
          {isClaiming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Claiming...
            </>
          ) : claimed ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Claimed!
            </>
          ) : (
            <>
              <Droplets className="mr-2 h-4 w-4" />
              Claim Tokens
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Mock data
const tokens: TokenOption[] = [
  { symbol: 'SEI', name: 'Sei' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'ATOM', name: 'Cosmos' },
];

export default FaucetClaim;

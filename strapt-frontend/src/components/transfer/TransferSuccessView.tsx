
import { Shield, Clock, Copy, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTransferContext } from '@/contexts/TransferContext';
import { useToast } from '@/hooks/use-toast';

interface TransferSuccessViewProps {
  onReset: () => void;
  onShowQR: () => void;
}

const TransferSuccessView = ({ onReset, onShowQR }: TransferSuccessViewProps) => {
  const {
    recipient,
    amount,
    withTimeout,
    selectedToken,
    transferType,
    transferLink,
    formatTimeout,
  } = useTransferContext();
  
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(transferLink);
    toast({
      title: "Link Copied",
      description: "Transfer link copied to clipboard",
    });
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto rounded-full bg-primary/20 p-3 mb-2">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <CardTitle>Transfer Created!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Your {transferType === 'direct' ? 'direct transfer' : 'protected transfer'} of {amount} {selectedToken.symbol} to {recipient} has been {transferType === 'direct' ? 'sent' : 'created'}.</p>
        
        {transferType === 'claim' && (
          <div className="border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Share this link with the recipient:</p>
            <div className="bg-secondary p-2 rounded text-sm mb-2 overflow-hidden text-ellipsis">
              {transferLink}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-1" /> Copy Link
              </Button>
              <Button variant="outline" size="sm" onClick={onShowQR}>
                <QrCode className="h-4 w-4 mr-1" /> Show QR
              </Button>
            </div>
          </div>
        )}
        
        {withTimeout && transferType === 'claim' && (
          <div className="bg-secondary/30 p-3 rounded-md text-sm">
            <div className="flex items-center text-amber-500 mb-1">
              <Clock className="h-4 w-4 mr-1" /> Auto-refund enabled
            </div>
            <p>
              If not claimed within {formatTimeout()}, funds will be automatically returned to your wallet.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Link to="/app" className="w-full">
          <Button variant="default" className="w-full">
            Back to Home
          </Button>
        </Link>
        <Button variant="outline" className="w-full" onClick={onReset}>
          Create Another Transfer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransferSuccessView;

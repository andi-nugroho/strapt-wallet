
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransferContext } from '@/contexts/TransferContext';

interface ConfirmTransferFormProps {
  onSubmit: () => void;
}

const ConfirmTransferForm = ({ onSubmit }: ConfirmTransferFormProps) => {
  const {
    recipient,
    amount,
    note,
    withTimeout,
    withPassword,
    selectedToken,
    transferType,
    formatTimeout,
  } = useTransferContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" /> 
          Confirm Transfer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Recipient:</span>
            <span className="font-medium">{recipient}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="font-medium">{amount} {selectedToken.symbol}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Method:</span>
            <span className="font-medium">{transferType === 'direct' ? 'Direct Transfer' : 'Claim via Link/QR'}</span>
          </div>
          {note && (
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Note:</span>
              <span className="font-medium">{note}</span>
            </div>
          )}
          {withTimeout && (
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Timeout:</span>
              <span className="font-medium">{formatTimeout()}</span>
            </div>
          )}
          {withPassword && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Password Protected:</span>
              <span className="font-medium">Yes</span>
            </div>
          )}
        </div>
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Transfer Fee:</span>
            <span className="font-medium">0.001 {selectedToken.symbol}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>{(parseFloat(amount) + 0.001).toFixed(3)} {selectedToken.symbol}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="button" onClick={onSubmit} className="w-full">
          Confirm & Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConfirmTransferForm;

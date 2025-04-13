
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowUpRight, ArrowDownLeft, Clock, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TransactionDetailsProps {
  open: boolean;
  onClose: () => void;
  transaction?: {
    type: 'sent' | 'received' | 'pending';
    title: string;
    amount: string;
    date: string;
    recipient?: string;
    hash: string;
  };
}

const TransactionDetails = ({ open, onClose, transaction }: TransactionDetailsProps) => {
  const { toast } = useToast();
  
  if (!transaction) return null;

  const getIcon = () => {
    switch (transaction.type) {
      case 'sent':
        return <ArrowUpRight className="h-6 w-6 text-destructive" />;
      case 'received':
        return <ArrowDownLeft className="h-6 w-6 text-primary" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-amber-500" />;
    }
  };

  const getStatusText = () => {
    switch (transaction.type) {
      case 'sent':
        return 'Sent';
      case 'received':
        return 'Received';
      case 'pending':
        return 'Pending';
    }
  };

  const getStatusColor = () => {
    switch (transaction.type) {
      case 'sent':
        return 'text-destructive';
      case 'received':
        return 'text-primary';
      case 'pending':
        return 'text-amber-500';
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(transaction.hash);
    toast({
      title: "Hash Copied",
      description: "Transaction hash copied to clipboard",
    });
  };

  const handleViewExplorer = () => {
    window.open(`https://sei.explorers.guru/transaction/${transaction.hash}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md w-[92%] mx-auto">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary p-3 mr-3">
                {getIcon()}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{transaction.title}</h3>
                <p className={`${getStatusColor()} font-medium`}>{getStatusText()}</p>
              </div>
            </div>
            <span className={`text-xl font-bold ${getStatusColor()}`}>
              {transaction.amount}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{transaction.date}</span>
            </div>
            
            {transaction.recipient && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient</span>
                <span>{transaction.recipient}</span>
              </div>
            )}
            
            <div className="space-y-1">
              <span className="text-muted-foreground">Transaction Hash</span>
              <div className="flex items-center space-x-2">
                <code className="bg-secondary p-2 rounded text-xs block w-full overflow-hidden text-ellipsis">
                  {transaction.hash}
                </code>
                <Button variant="ghost" size="icon" onClick={handleCopyHash}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleViewExplorer}
          >
            View in Explorer
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;

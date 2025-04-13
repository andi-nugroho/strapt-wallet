
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from '@/components/QRCode';
import { useTransferContext } from '@/contexts/TransferContext';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface TransferQRCodeProps {
  showQR: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransferQRCode = ({ showQR, onOpenChange }: TransferQRCodeProps) => {
  const { transferLink, amount, selectedToken } = useTransferContext();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(transferLink);
    toast({
      title: "Link Copied",
      description: "Transfer link copied to clipboard",
    });
  };

  return (
    <Dialog open={showQR} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "sm:max-w-[92%] w-[92%] mx-auto rounded-xl px-3 py-4" : "max-w-xs mx-auto sm:max-w-md"}>
        <DialogHeader>
          <DialogTitle>Transfer QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <QRCode value={transferLink} size={isMobile ? 180 : 200} />
          <p className="text-sm text-center text-muted-foreground">
            Share this QR code to claim {amount} {selectedToken.symbol}
          </p>
          <Button variant="outline" size="sm" onClick={handleCopyLink} className="mt-2">
            <Copy className="h-4 w-4 mr-1" /> Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferQRCode;

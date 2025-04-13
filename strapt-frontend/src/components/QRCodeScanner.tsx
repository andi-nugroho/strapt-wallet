
import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Scan, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface QRCodeScannerProps {
  onScanSuccess?: (decodedText: string) => void;
  triggerType?: 'button' | 'popover' | 'dialog';
  buttonText?: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonClassName?: string;
  iconOnly?: boolean;
}

const QRCodeScanner = ({
  onScanSuccess,
  triggerType = 'button',
  buttonText = 'Scan QR Code',
  buttonVariant = 'default',
  buttonSize = 'default',
  buttonClassName = '',
  iconOnly = false,
}: QRCodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const html5QrCode = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'html5-qrcode-scanner';

  const startScanner = async () => {
    if (!html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode(scannerContainerId);
    }

    setIsScanning(true);
    
    try {
      const qrCodeSuccessCallback = (decodedText: string) => {
        stopScanner();
        
        if (onScanSuccess) {
          onScanSuccess(decodedText);
        } else {
          // Default behavior: Try to extract and navigate to a claim URL
          try {
            const url = new URL(decodedText);
            
            if (url.pathname.includes('/claim/')) {
              const claimId = url.pathname.split('/claim/')[1];
              
              if (claimId) {
                navigate(`/app/claims?id=${claimId}`);
                toast({
                  title: "QR Code Scanned Successfully",
                  description: "Opening the payment page",
                });
              }
            } else {
              toast({
                title: "Not a Payment Code",
                description: "This QR code doesn't contain payment information",
                variant: "destructive",
              });
            }
          } catch (e) {
            toast({
              title: "Invalid QR Code",
              description: "This QR code format isn't recognized",
              variant: "destructive",
            });
          }
        }
        
        setScannerOpen(false);
      };
      
      const config = { fps: 10, qrbox: isMobile ? 250 : 300 };
      
      await html5QrCode.current.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        () => {} // Ignore failures to avoid console noise
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setIsScanning(false);
      toast({
        title: "Camera Access Needed",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive",
      });
    }
  };
  
  const stopScanner = () => {
    if (html5QrCode.current && html5QrCode.current.isScanning) {
      html5QrCode.current.stop()
        .catch(err => console.error("Error stopping scanner:", err))
        .finally(() => setIsScanning(false));
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    setScannerOpen(open);
    if (!open && isScanning) {
      stopScanner();
    }
    if (open) {
      setTimeout(() => startScanner(), 500);
    }
  };
  
  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const scannerContent = (
    <div className="flex flex-col items-center">
      <div id={scannerContainerId} className="w-full max-w-[300px] h-[300px] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {!isScanning && <Scan className="h-10 w-10 text-muted-foreground animate-pulse" />}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 mb-2">
        Point your camera at a QR code to scan it
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleOpenChange(false)}
        className="mt-2"
      >
        Cancel
      </Button>
    </div>
  );

  const triggerButton = (
    <Button 
      variant={buttonVariant} 
      size={buttonSize} 
      className={buttonClassName}
      onClick={triggerType === 'button' ? () => handleOpenChange(true) : undefined}
    >
      <Scan className={`h-4 w-4 ${!iconOnly ? 'mr-2' : ''}`} />
      {!iconOnly && buttonText}
    </Button>
  );

  // Render different trigger types
  if (triggerType === 'dialog') {
    return (
      <>
        {triggerButton}
        <Dialog open={scannerOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-w-xs mx-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan QR Code</DialogTitle>
              <DialogDescription>
                Scan a QR code to claim a transfer or add a contact
              </DialogDescription>
            </DialogHeader>
            {scannerContent}
          </DialogContent>
        </Dialog>
      </>
    );
  } else if (triggerType === 'popover') {
    return (
      <Popover open={scannerOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          {triggerButton}
        </PopoverTrigger>
        <PopoverContent className="w-80" align="center">
          {scannerContent}
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <>
        {triggerButton}
        <Dialog open={scannerOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-w-xs mx-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan QR Code</DialogTitle>
              <DialogDescription>
                Scan a QR code to claim a transfer or add a contact
              </DialogDescription>
            </DialogHeader>
            {scannerContent}
          </DialogContent>
        </Dialog>
      </>
    );
  }
};

export default QRCodeScanner;

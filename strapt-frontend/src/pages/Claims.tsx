
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Copy, QrCode, LockKeyhole, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import QRCode from '@/components/QRCode';
import QRCodeScanner from '@/components/QRCodeScanner';

interface TransferDetails {
  id: string;
  sender: string;
  amount: string;
  note?: string;
  expiresAt: Date;
  passwordProtected: boolean;
}

const Claims = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);
  const [activeTransfer, setActiveTransfer] = useState<TransferDetails | null>(null);
  const [password, setPassword] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // Mock data - in a real app this would come from API
  const pendingClaims: TransferDetails[] = [
    {
      id: 'tx1234',
      sender: '@mark.sei',
      amount: '50.00',
      note: 'For dinner last week',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      passwordProtected: false
    },
    {
      id: 'tx5678',
      sender: '@alice.sei',
      amount: '25.50',
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      passwordProtected: true
    }
  ];

  // Check for claim ID in URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const claimId = params.get('id');
    
    if (claimId) {
      const claim = pendingClaims.find(claim => claim.id === claimId);
      if (claim) {
        if (claim.passwordProtected) {
          setActiveTransfer(claim);
          setShowPasswordDialog(true);
        } else {
          handleClaim(claimId);
        }
      } else {
        toast({
          title: "Claim Not Found",
          description: "The specified claim could not be found",
          variant: "destructive",
        });
      }
    }
  }, [location.search]);

  const formatTimeRemaining = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  const handleClaim = (transferId: string) => {
    toast({
      title: "Transfer Claimed",
      description: "Funds have been added to your wallet",
    });
    navigate('/app');
  };
  
  const handleShowQR = (transfer: TransferDetails) => {
    setActiveTransfer(transfer);
    setShowQR(true);
  };
  
  const handleCopyLink = (transferId: string) => {
    navigator.clipboard.writeText(`https://truststream.app/claim/${transferId}`);
    toast({
      title: "Link Copied",
      description: "Transfer link copied to clipboard",
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeTransfer) return;
    
    setIsValidating(true);
    setPasswordError('');
    
    // Simulate password validation
    setTimeout(() => {
      // For demo, we'll use a simple password "truststream"
      if (password === 'truststream') {
        handleClaim(activeTransfer.id);
        setShowPasswordDialog(false);
        setPassword('');
        setIsValidating(false);
      } else {
        setPasswordError('Incorrect password');
        setIsValidating(false);
      }
    }, 1500);
  };
  
  const handleScanSuccess = (decodedText: string) => {
    try {
      const url = new URL(decodedText);
      
      if (url.pathname.includes('/claim/')) {
        const claimId = url.pathname.split('/claim/')[1];
        
        if (claimId) {
          const claim = pendingClaims.find(claim => claim.id === claimId);
          
          if (claim) {
            if (claim.passwordProtected) {
              setActiveTransfer(claim);
              setShowPasswordDialog(true);
            } else {
              handleClaim(claimId);
            }
          } else {
            toast({
              title: "Claim Not Found",
              description: "The scanned QR code contains an invalid claim",
              variant: "destructive",
            });
          }
        }
      }
    } catch (e) {
      toast({
        title: "Invalid QR Code",
        description: "Could not parse the QR code data",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)} 
          className="mr-4 p-0 h-auto"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Pending Claims</h1>
        <div className="ml-auto">
          <QRCodeScanner 
            buttonVariant="outline"
            buttonSize="sm"
            buttonText="Scan"
            onScanSuccess={handleScanSuccess}
          />
        </div>
      </div>
      
      {pendingClaims.length > 0 ? (
        <div className="space-y-4">
          {pendingClaims.map((claim) => (
            <Card key={claim.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                    Protected Transfer
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {claim.passwordProtected && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <LockKeyhole className="h-3 w-3" />
                        <span>Password</span>
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{formatTimeRemaining(claim.expiresAt)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">From:</span>
                    <span className="font-medium">{claim.sender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="font-medium">{claim.amount} SEI</span>
                  </div>
                  {claim.note && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Note:</span>
                      <span className="font-medium">{claim.note}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expires:</span>
                    <span className="font-medium">{claim.expiresAt.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  onClick={() => {
                    if (claim.passwordProtected) {
                      setActiveTransfer(claim);
                      setShowPasswordDialog(true);
                    } else {
                      handleClaim(claim.id);
                    }
                  }}
                  className="w-full"
                >
                  {claim.passwordProtected ? (
                    <>
                      <LockKeyhole className="h-4 w-4 mr-1" /> Claim (Password Protected)
                    </>
                  ) : (
                    "Claim Transfer"
                  )}
                </Button>
                <div className="flex w-full gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleCopyLink(claim.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" /> Copy Link
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleShowQR(claim)}
                  >
                    <QrCode className="h-4 w-4 mr-1" /> Show QR
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium mb-1">No Pending Claims</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You don't have any protected transfers to claim
          </p>
          <Button onClick={() => navigate('/app')}>
            Return to Dashboard
          </Button>
        </div>
      )}
      
      {/* QR code dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4">
            {activeTransfer && (
              <>
                <QRCode value={`https://truststream.app/claim/${activeTransfer.id}`} size={200} />
                <p className="text-sm text-center text-muted-foreground">
                  Share this QR code to claim {activeTransfer.amount} SEI
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Password verification dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4">
              {activeTransfer && (
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    This transfer from {activeTransfer.sender} for {activeTransfer.amount} SEI is password protected
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the transfer password"
                  className={passwordError ? "border-red-500" : ""}
                  disabled={isValidating}
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={isValidating}>
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Claim"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Claims;

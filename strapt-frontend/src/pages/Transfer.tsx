
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TransferProvider, useTransferContext } from '@/contexts/TransferContext';
import RecipientDetailsForm from '@/components/transfer/RecipientDetailsForm';
import ProtectionOptionsForm from '@/components/transfer/ProtectionOptionsForm';
import ConfirmTransferForm from '@/components/transfer/ConfirmTransferForm';
import TransferSuccessView from '@/components/transfer/TransferSuccessView';
import TransferQRCode from '@/components/transfer/TransferQRCode';

// Inner component to access context
const TransferContent = () => {
  const [step, setStep] = useState(1);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();
  const { setTransferLink, transferType } = useTransferContext();

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetTransfer = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
    } else {
      // This is handled in handleConfirm
    }
  };

  const handleConfirm = () => {
    // Simulates the transfer submission
    const mockTransferId = `tx${Math.floor(Math.random() * 1000000)}`;
    const mockTransferLink = `https://truststream.app/claim/${mockTransferId}`;
    
    // Set the transfer link in context
    setTransferLink(mockTransferLink);
    
    // Show success notification for direct transfers
    if (transferType === 'direct') {
      toast({
        title: "Transfer Successful",
        description: "Your direct transfer has been sent",
      });
    }
    
    nextStep();
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-4">
        {step > 1 && step < 4 && (
          <Button variant="ghost" size="sm" onClick={prevStep} className="mr-4 p-0 h-auto">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold">
          {step === 1 && "Protected Transfer"}
          {step === 2 && "Protection Options"}
          {step === 3 && "Confirm Transfer"}
          {step === 4 && "Transfer Created"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <RecipientDetailsForm onNext={nextStep} />
        )}

        {step === 2 && (
          <ProtectionOptionsForm onNext={nextStep} />
        )}

        {step === 3 && (
          <ConfirmTransferForm onSubmit={handleConfirm} />
        )}

        {step === 4 && (
          <TransferSuccessView 
            onReset={resetTransfer} 
            onShowQR={handleShowQR} 
          />
        )}
      </form>
      
      <TransferQRCode 
        showQR={showQR} 
        onOpenChange={setShowQR} 
      />
    </div>
  );
};

// Wrapper component to provide context
const Transfer = () => {
  return (
    <TransferProvider>
      <TransferContent />
    </TransferProvider>
  );
};

export default Transfer;

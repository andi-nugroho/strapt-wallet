
import { Shield, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowRight } from 'lucide-react';
import { useTransferContext } from '@/contexts/TransferContext';
import DurationSelect from '@/components/DurationSelect';
import { DurationUnit } from '@/components/DurationSelect';

interface ProtectionOptionsFormProps {
  onNext: () => void;
}

const ProtectionOptionsForm = ({ onNext }: ProtectionOptionsFormProps) => {
  const {
    withTimeout,
    setWithTimeout,
    timeout,
    setTimeout,
    timeoutUnit,
    setTimeoutUnit,
    withPassword,
    setWithPassword,
    password,
    setPassword,
    transferType,
  } = useTransferContext();

  const handleTimeoutChange = (value: number, unit: DurationUnit) => {
    setTimeout(value);
    setTimeoutUnit(unit);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" /> 
          Protection Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <label htmlFor="timeout" className="text-sm font-medium">
                Auto-refund Timeout
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your funds back if the recipient doesn't claim in time
            </p>
          </div>
          <Switch
            id="timeout"
            checked={withTimeout}
            onCheckedChange={setWithTimeout}
          />
        </div>
        
        {withTimeout && (
          <div className="space-y-2 pl-6">
            <DurationSelect
              id="timeout-duration"
              value={timeout}
              unit={timeoutUnit}
              onChange={handleTimeoutChange}
              label="Time until auto-refund"
            />
            <p className="text-xs text-muted-foreground">
              After this time expires, funds will be automatically returned to your wallet
            </p>
          </div>
        )}

        {/* Password protection for both transfer types */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
              <label htmlFor="password" className="text-sm font-medium">
                Password Protection
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              {transferType === 'direct' 
                ? 'Recipient must enter a password to receive funds' 
                : 'Recipient must enter a password to claim funds'}
            </p>
          </div>
          <Switch
            id="password"
            checked={withPassword}
            onCheckedChange={setWithPassword}
          />
        </div>
        
        {withPassword && (
          <div className="space-y-2 pl-6">
            <label htmlFor="password-input" className="text-sm font-medium">
              Password for Recipient
            </label>
            <Input
              id="password-input"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="button" onClick={onNext} className="w-full">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProtectionOptionsForm;

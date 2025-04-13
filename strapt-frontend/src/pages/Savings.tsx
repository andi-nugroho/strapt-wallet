import { useState } from 'react';
import { Calendar, Lock, ArrowUp, ArrowDown, Hourglass, PiggyBank, Wallet, Target, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import TokenSelect, { TokenOption } from '@/components/TokenSelect';
import DurationSelect, { DurationUnit } from '@/components/DurationSelect';
import { ComingSoon } from '@/pages/ComingSoon';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  token: string;
  protocol: string;
  apy: number;
  deadline?: string;
}

const Savings = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'goals'>('goals');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(30);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>('days');
  const [selectedToken, setSelectedToken] = useState<TokenOption>(tokens[0]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(protocols[0].id);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [showDepositToGoal, setShowDepositToGoal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const { toast } = useToast();

  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: 'goal1',
      name: 'New Laptop',
      targetAmount: 1500,
      currentAmount: 450,
      token: 'USDC',
      protocol: 'Aave',
      apy: 4.5
    },
    {
      id: 'goal2',
      name: 'Vacation Fund',
      targetAmount: 3000,
      currentAmount: 800,
      token: 'SEI',
      protocol: 'CompoundV3',
      apy: 7.2,
      deadline: '2025-08-15'
    }
  ]);

  const handleDurationChange = (value: number, unit: DurationUnit) => {
    setDuration(value);
    setDurationUnit(unit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    const action = activeTab === 'deposit' ? 'Deposit' : 'Withdrawal';
    
    toast({
      title: `${action} Successful`,
      description: `${action} of ${amount} ${selectedToken.symbol} has been processed`,
    });
    
    setAmount('');
  };

  const handleAddGoal = () => {
    if (!goalName || !goalAmount || parseFloat(goalAmount) <= 0) {
      toast({
        title: "Invalid Goal",
        description: "Please enter a valid goal name and amount",
        variant: "destructive",
      });
      return;
    }

    const protocol = protocols.find(p => p.id === selectedProtocol);
    
    const newGoal: SavingsGoal = {
      id: `goal${Date.now()}`,
      name: goalName,
      targetAmount: parseFloat(goalAmount),
      currentAmount: 0,
      token: selectedToken.symbol,
      protocol: protocol?.name || '',
      apy: protocol?.apy || 0
    };
    
    setGoals([...goals, newGoal]);
    setShowAddGoal(false);
    setGoalName('');
    setGoalAmount('');
    
    toast({
      title: "Goal Created",
      description: `"${goalName}" savings goal has been created`
    });
  };

  const handleDepositToGoal = () => {
    if (!selectedGoal || !depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid Deposit",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        const newAmount = goal.currentAmount + parseFloat(depositAmount);
        return {
          ...goal,
          currentAmount: newAmount
        };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setShowDepositToGoal(false);
    setDepositAmount('');
    
    toast({
      title: "Deposit Successful",
      description: `${depositAmount} ${selectedToken.symbol} added to "${selectedGoal.name}"`
    });
  };

  const openDepositToGoal = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setSelectedToken(tokens.find(t => t.symbol === goal.token) || tokens[0]);
    setShowDepositToGoal(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Savings</h2>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'deposit' | 'withdraw' | 'goals')}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'deposit' | 'withdraw' | 'goals')}>
        <TabsContent value="deposit" className="mt-0">
          <div className="flex justify-center min-h-[300px]">
            <ComingSoon 
              title="Deposits Coming Soon"
              description="We're working on a feature that will let you deposit and earn interest on your crypto assets. Stay tuned!"
            />
          </div>
        </TabsContent>

        <TabsContent value="withdraw" className="mt-0">
          <div className="flex justify-center min-h-[300px]">
            <ComingSoon 
              title="Withdrawals Coming Soon"
              description="We're working on a feature that will let you withdraw your crypto assets from savings. Stay tuned!"
            />
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Savings Goals</h3>
              <Button onClick={() => setShowAddGoal(true)} size="sm">
                <Plus className="h-4 w-4 mr-1" /> New Goal
              </Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">{goal.name}</CardTitle>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">{goal.currentAmount} / {goal.targetAmount}</div>
                        <div className="text-xs text-muted-foreground">{goal.token}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 space-y-2">
                    <Progress 
                      value={(goal.currentAmount / goal.targetAmount) * 100} 
                      className="h-2" 
                    />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>
                        <span className="inline-block mr-2">{goal.protocol}</span>
                        <span className="text-primary">{goal.apy}% APY</span>
                      </div>
                      {goal.deadline && (
                        <div>
                          <Calendar className="inline h-3 w-3 mr-1" /> 
                          {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => openDepositToGoal(goal)}
                    >
                      <PiggyBank className="h-4 w-4 mr-1" /> Deposit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {goals.length === 0 && (
                <div className="col-span-2 text-center py-10 border rounded-lg">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium mb-1">No Savings Goals</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a goal to start saving for something special
                  </p>
                  <Button variant="outline" onClick={() => setShowAddGoal(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Create Goal
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
        <DialogContent className="max-w-sm sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Savings Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input
                id="goal-name"
                placeholder="e.g. New Laptop, Vacation, etc."
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="token">Currency</Label>
              <TokenSelect
                tokens={tokens}
                selectedToken={selectedToken}
                onTokenChange={setSelectedToken}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-amount">Target Amount</Label>
              <Input
                id="target-amount"
                type="number"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol">Protocol</Label>
              <Select 
                value={selectedProtocol}
                onValueChange={setSelectedProtocol}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map(protocol => (
                    <SelectItem key={protocol.id} value={protocol.id}>
                      {protocol.name} ({protocol.apy}% APY)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddGoal} className="w-full">
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showDepositToGoal} onOpenChange={setShowDepositToGoal}>
        <DialogContent className="max-w-sm sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit to {selectedGoal?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-secondary/30 rounded-lg mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Current:</span>
                <span>{selectedGoal?.currentAmount} {selectedGoal?.token}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Target:</span>
                <span>{selectedGoal?.targetAmount} {selectedGoal?.token}</span>
              </div>
              <Progress 
                value={selectedGoal ? (selectedGoal.currentAmount / selectedGoal.targetAmount) * 100 : 0} 
                className="mt-2" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount to Deposit</Label>
              <div className="relative">
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="pr-16"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
                  onClick={() => {
                    const token = tokens.find(t => t.symbol === selectedGoal?.token);
                    if (token?.balance) {
                      setDepositAmount(token.balance.toString());
                    }
                  }}
                >
                  MAX
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Available: {tokens.find(t => t.symbol === selectedGoal?.token)?.balance?.toFixed(2) || 0} {selectedGoal?.token}
              </p>
            </div>
            
            {selectedGoal && (
              <div className="p-3 bg-secondary/30 rounded-lg space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Protocol:</span>
                  <span>{selectedGoal.protocol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span>{selectedGoal.apy}% APY</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleDepositToGoal} className="w-full">
              Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const getInterestRate = (duration: number, unit: DurationUnit): number => {
  const days = unit === 'days' ? duration : 
               unit === 'hours' ? duration / 24 : 
               unit === 'minutes' ? duration / (24 * 60) : 
               duration / (24 * 60 * 60);
  
  if (days >= 90) return 12;
  if (days >= 30) return 8;
  if (days >= 7) return 5;
  return 3;
};

const getEstimatedEarnings = (amount: number, duration: number, unit: DurationUnit): string => {
  const days = unit === 'days' ? duration : 
               unit === 'hours' ? duration / 24 : 
               unit === 'minutes' ? duration / (24 * 60) : 
               duration / (24 * 60 * 60);
  
  const rate = getInterestRate(duration, unit);
  const earnings = amount * (rate / 100) * (days / 365);
  return earnings.toFixed(4);
};

const tokens: TokenOption[] = [
  { symbol: 'SEI', name: 'Sei', balance: 1245.78 },
  { symbol: 'ETH', name: 'Ethereum', balance: 0.5 },
  { symbol: 'USDC', name: 'USD Coin', balance: 500.45 },
  { symbol: 'ATOM', name: 'Cosmos', balance: 25.32 },
];

const protocols = [
  { id: 'aave', name: 'Aave', apy: 4.5 },
  { id: 'compound', name: 'CompoundV3', apy: 5.8 },
  { id: 'sei-stake', name: 'Sei Staking', apy: 12.4 },
  { id: 'cosmos-stake', name: 'Cosmos Hub', apy: 14.2 },
];

const savingsData = [
  {
    token: 'SEI',
    amount: 500,
    duration: '30-Day',
    apy: 8,
    elapsed: 15,
    total: 30,
    timeRemaining: '15 days left'
  },
  {
    token: 'USDC',
    amount: 200,
    duration: '90-Day',
    apy: 12,
    elapsed: 30,
    total: 90,
    timeRemaining: '60 days left'
  }
];

export default Savings;

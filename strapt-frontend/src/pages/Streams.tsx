import { useState } from 'react';
import { Play, Pause, StopCircle, PlusCircle, BarChart2, ArrowRight, Milestone, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MilestoneInput, { Milestone as MilestoneType } from '@/components/MilestoneInput';
import DurationSelect, { DurationUnit } from '@/components/DurationSelect';
import TokenSelect, { TokenOption } from '@/components/TokenSelect';

interface Stream {
  id: string;
  recipient: string;
  total: number;
  streamed: number;
  rate: string; // e.g. "0.1 SEI/min"
  status: 'active' | 'paused' | 'completed';
  milestones?: MilestoneType[];
  token: string;
}

const Streams = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showReleaseDialog, setShowReleaseDialog] = useState(false);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneType | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(60);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>('minutes');
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenOption>(tokens[0]);
  const { toast } = useToast();

  const activeStreams: Stream[] = [
    {
      id: 'stream-1',
      recipient: '@mark.sei',
      total: 100,
      streamed: 43,
      rate: '0.1 SEI/min',
      status: 'active',
      token: 'SEI',
      milestones: [
        { id: 'ms-1', percentage: 25, description: 'First quarter payment' },
        { id: 'ms-2', percentage: 50, description: 'Halfway checkpoint' },
        { id: 'ms-3', percentage: 75, description: 'Three-quarters complete' }
      ]
    },
    {
      id: 'stream-2',
      recipient: '@alice.sei',
      total: 50,
      streamed: 12,
      rate: '0.05 SEI/min',
      status: 'paused',
      token: 'SEI',
    },
  ];

  const completedStreams: Stream[] = [
    {
      id: 'stream-3',
      recipient: '@john.sei',
      total: 75,
      streamed: 75,
      rate: '0.2 SEI/min',
      status: 'completed',
      token: 'SEI',
    },
  ];

  const handleDurationChange = (value: number, unit: DurationUnit) => {
    setDuration(value);
    setDurationUnit(unit);
  };

  const handleCreateStream = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Stream Created",
      description: `Successfully started streaming ${amount} ${selectedToken.symbol} to ${recipient}`,
    });
    
    setShowCreate(false);
    setRecipient('');
    setAmount('');
    setDuration(60);
    setDurationUnit('minutes');
    setMilestones([]);
  };

  const getStatusIcon = (status: 'active' | 'paused' | 'completed') => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4 text-green-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <StopCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getProgressColor = (status: 'active' | 'paused' | 'completed') => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-blue-500';
    }
  };

  const handleOpenReleaseDialog = (stream: Stream, milestone: MilestoneType) => {
    setSelectedStream(stream);
    setSelectedMilestone(milestone);
    setShowReleaseDialog(true);
  };

  const handleReleaseFunds = () => {
    if (!selectedStream || !selectedMilestone) return;
    
    const releaseAmount = (selectedMilestone.percentage / 100) * selectedStream.total;
    
    toast({
      title: "Funds Released",
      description: `Successfully released ${releaseAmount} ${selectedStream.token} to ${selectedStream.recipient} for milestone: ${selectedMilestone.description}`,
    });
    
    setShowReleaseDialog(false);
  };

  const getMilestoneMarkers = (stream: Stream) => {
    if (!stream.milestones || stream.milestones.length === 0) return null;
    
    return (
      <div className="relative h-1 mt-1">
        {stream.milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="absolute top-0 w-1 h-3 bg-primary rounded"
            style={{ left: `${milestone.percentage}%`, transform: 'translateX(-50%)' }}
            title={`${milestone.description} (${milestone.percentage}%)`}
          />
        ))}
      </div>
    );
  };

  const calculateStreamRate = () => {
    if (!amount || !duration) return '0';
    
    const amountNum = parseFloat(amount);
    
    let seconds = duration;
    if (durationUnit === 'minutes') seconds *= 60;
    if (durationUnit === 'hours') seconds *= 3600;
    if (durationUnit === 'days') seconds *= 86400;
    
    const ratePerSecond = amountNum / seconds;
    
    if (ratePerSecond >= 1) {
      return `${ratePerSecond.toFixed(2)} ${selectedToken.symbol}/second`;
    } else if (ratePerSecond * 60 >= 1) {
      return `${(ratePerSecond * 60).toFixed(2)} ${selectedToken.symbol}/minute`;
    } else if (ratePerSecond * 3600 >= 1) {
      return `${(ratePerSecond * 3600).toFixed(2)} ${selectedToken.symbol}/hour`;
    } else {
      return `${(ratePerSecond * 86400).toFixed(4)} ${selectedToken.symbol}/day`;
    }
  };

  const getDurationInMinutes = () => {
    switch (durationUnit) {
      case 'seconds': return duration / 60;
      case 'minutes': return duration;
      case 'hours': return duration * 60;
      case 'days': return duration * 24 * 60;
      default: return duration;
    }
  };

  const renderMilestoneReleaseButtons = (stream: Stream) => {
    if (!stream.milestones || stream.milestones.length === 0) return null;
    
    const streamPercentage = (stream.streamed / stream.total) * 100;
    
    return (
      <div className="mt-3 space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Milestone Releases:</div>
        <div className="grid grid-cols-2 gap-2">
          {stream.milestones.map((milestone) => {
            const isReachable = streamPercentage >= milestone.percentage;
            return (
              <Button
                key={milestone.id}
                variant="outline"
                size="sm"
                className="h-auto py-1 text-xs"
                disabled={!isReachable}
                onClick={() => handleOpenReleaseDialog(stream, milestone)}
              >
                <CircleDollarSign className="h-3 w-3 mr-1" />
                Release {milestone.percentage}%
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {!showCreate ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Payment Streams</h2>
            <Button 
              onClick={() => setShowCreate(true)}
              size="sm"
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" /> New
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-0">
              {activeStreams.length > 0 ? (
                <div className="space-y-4">
                  {activeStreams.map((stream) => (
                    <Card key={stream.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{stream.recipient}</CardTitle>
                          <div className="flex items-center gap-1 text-sm">
                            {getStatusIcon(stream.status)}
                            <span className="capitalize">{stream.status}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Streamed</span>
                              <span>{stream.streamed} / {stream.total} {stream.token}</span>
                            </div>
                            <Progress 
                              value={(stream.streamed / stream.total) * 100} 
                              className={getProgressColor(stream.status)}
                            />
                            {stream.milestones && stream.milestones.length > 0 && getMilestoneMarkers(stream)}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rate</span>
                            <span>{stream.rate}</span>
                          </div>
                          
                          {stream.milestones && stream.milestones.length > 0 && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Milestone className="h-3 w-3" />
                              <span>{stream.milestones.length} milestone{stream.milestones.length !== 1 ? 's' : ''}</span>
                            </div>
                          )}

                          {stream.milestones && stream.milestones.length > 0 && renderMilestoneReleaseButtons(stream)}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {stream.status === 'active' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="h-4 w-4 mr-1" /> Pause
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="h-4 w-4 mr-1" /> Resume
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <StopCircle className="h-4 w-4 mr-1" /> Stop
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium mb-1">No Active Streams</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start streaming payments to someone
                  </p>
                  <Button 
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" /> New Stream
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              {completedStreams.length > 0 ? (
                <div className="space-y-4">
                  {completedStreams.map((stream) => (
                    <Card key={stream.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{stream.recipient}</CardTitle>
                          <div className="flex items-center gap-1 text-sm">
                            {getStatusIcon(stream.status)}
                            <span className="capitalize">{stream.status}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Streamed</span>
                              <span>{stream.streamed} / {stream.total} SEI</span>
                            </div>
                            <Progress 
                              value={(stream.streamed / stream.total) * 100} 
                              className="bg-blue-500"
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rate</span>
                            <span>{stream.rate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium mb-1">No Completed Streams</h3>
                  <p className="text-sm text-muted-foreground">
                    Your completed streams will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)} className="mr-4 p-0 h-auto">
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
            <h2 className="text-xl font-semibold">Create Stream</h2>
          </div>
          
          <form onSubmit={handleCreateStream}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                  Stream Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Username</Label>
                  <Input
                    id="recipient"
                    placeholder="@username.sei"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <TokenSelect
                    tokens={tokens}
                    selectedToken={selectedToken}
                    onTokenChange={setSelectedToken}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      min="0.01"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="pr-16"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
                      onClick={() => {
                        const balance = selectedToken.balance || 0;
                        setAmount(balance.toString());
                      }}
                    >
                      MAX
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available: {selectedToken.balance?.toFixed(2) || 0} {selectedToken.symbol}
                  </p>
                </div>
                
                <DurationSelect
                  value={duration}
                  unit={durationUnit}
                  onChange={handleDurationChange}
                  label="Duration"
                />

                {amount && duration && (
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate:</span>
                      <span>
                        {calculateStreamRate()}
                      </span>
                    </div>
                  </div>
                )}
                
                {duration > 0 && (
                  <MilestoneInput 
                    milestones={milestones} 
                    onChange={setMilestones}
                    duration={getDurationInMinutes()}
                  />
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Start Stream <Play className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </div>
  );
};

const tokens: TokenOption[] = [
  { symbol: 'SEI', name: 'Sei', balance: 1245.78 },
  { symbol: 'ETH', name: 'Ethereum', balance: 0.5 },
  { symbol: 'USDC', name: 'USD Coin', balance: 500.45 },
  { symbol: 'ATOM', name: 'Cosmos', balance: 25.32 },
];

export default Streams;

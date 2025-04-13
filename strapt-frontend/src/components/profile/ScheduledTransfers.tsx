
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarIcon, CalendarClock, Clock, ChevronRight, Plus, Edit2, Trash, ChevronsUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Mock scheduled transfers
const mockScheduledTransfers = [
  {
    id: '1',
    recipient: 'Team Salary',
    amount: '500 SEI',
    token: 'SEI',
    date: new Date(Date.now() + 86400000 * 7),
    recurring: true,
    frequency: 'Monthly',
  },
  {
    id: '2',
    recipient: 'Rent Payment',
    amount: '800 USDC',
    token: 'USDC',
    date: new Date(Date.now() + 86400000 * 15),
    recurring: true,
    frequency: 'Monthly',
  },
  {
    id: '3',
    recipient: 'Conference Registration',
    amount: '250 SEI',
    token: 'SEI',
    date: new Date(Date.now() + 86400000 * 10),
    recurring: false,
    frequency: null,
  },
];

const ScheduledTransfers = () => {
  const [scheduledTransfers, setScheduledTransfers] = useState(mockScheduledTransfers);
  const [showNewTransfer, setShowNewTransfer] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const handleCreateScheduled = (event: React.FormEvent) => {
    event.preventDefault();
    // This would create a new scheduled transfer in a real app
    setShowNewTransfer(false);
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
    return `In ${Math.floor(diffDays / 30)} months`;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Scheduled Transfers</CardTitle>
              <CardDescription>Upcoming and recurring transfers</CardDescription>
            </div>
            <Button size="sm" onClick={() => setShowNewTransfer(true)}>
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {scheduledTransfers.length === 0 ? (
            <div className="text-center py-8">
              <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No scheduled transfers</p>
              <Button variant="link" onClick={() => setShowNewTransfer(true)}>
                Create your first scheduled transfer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {scheduledTransfers.map((transfer, index) => (
                <div key={transfer.id}>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{transfer.recipient}</h3>
                        <p className="text-sm text-muted-foreground">{transfer.amount}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">{format(transfer.date, 'PPP')}</span>
                          <span className="text-xs text-muted-foreground">
                            ({formatRelativeTime(transfer.date)})
                          </span>
                        </div>
                        {transfer.recurring && (
                          <Badge variant="outline" className="mt-2">
                            <Clock className="h-3 w-3 mr-1" /> {transfer.frequency}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < scheduledTransfers.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/app/transfer')}
            className="text-sm"
          >
            Go to Transfer page <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showNewTransfer} onOpenChange={setShowNewTransfer}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule a Transfer</DialogTitle>
            <DialogDescription>
              Create a one-time or recurring transfer that will execute automatically
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateScheduled}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input id="recipient" placeholder="Address or @username" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" min="0" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="token">Token</Label>
                  <Select defaultValue="SEI">
                    <SelectTrigger id="token">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEI">SEI</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="recurring">Frequency</Label>
                <Select defaultValue="once">
                  <SelectTrigger id="recurring">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One-time only</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewTransfer(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Transfer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScheduledTransfers;

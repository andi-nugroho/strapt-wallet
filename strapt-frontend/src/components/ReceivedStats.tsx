
import { BarChart3, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReceivedStatsProps {
  totalReceived: number;
  recentActivity: {
    amount: number;
    direction: 'in' | 'out';
    date: Date;
  }[];
}

const ReceivedStats = ({ totalReceived, recentActivity }: ReceivedStatsProps) => {
  // Calculate last 7 days received
  const last7DaysReceived = recentActivity
    .filter(item => 
      item.direction === 'in' && 
      item.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    )
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Funds Received
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Received</div>
              <div className="text-2xl font-semibold">{totalReceived.toFixed(2)} SEI</div>
            </div>
            <div className="bg-secondary/20 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Last 7 Days</div>
              <div className="text-2xl font-semibold">{last7DaysReceived.toFixed(2)} SEI</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Transactions</h4>
            <div className="space-y-2">
              {recentActivity.slice(0, 4).map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {activity.direction === 'in' ? (
                      <ArrowDownRight className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 mr-2 text-amber-500" />
                    )}
                    <span>{activity.direction === 'in' ? 'Received' : 'Sent'}</span>
                  </div>
                  <div className={activity.direction === 'in' ? 'text-green-500' : 'text-amber-500'}>
                    {activity.direction === 'in' ? '+' : '-'}{activity.amount.toFixed(2)} SEI
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceivedStats;

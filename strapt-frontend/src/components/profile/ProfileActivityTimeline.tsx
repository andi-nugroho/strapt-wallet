
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Clock, X, ArrowUpRight, Download, ShieldCheck, Users, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample activity data (would come from an API in a real app)
const mockActivities = [
  {
    id: '1',
    type: 'transfer',
    title: 'Transfer sent to Sarah',
    amount: '245 SEI',
    status: 'completed',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: '2',
    type: 'claim',
    title: 'Protected transfer created',
    amount: '100 SEI',
    status: 'pending',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    type: 'stream',
    title: 'Stream payment to Team',
    amount: '500 SEI',
    status: 'active',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '4',
    type: 'pool',
    title: 'Group pool contribution',
    amount: '50 SEI',
    status: 'completed',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '5',
    type: 'transfer',
    title: 'Transfer received from Alex',
    amount: '75 SEI',
    status: 'completed',
    timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: '6',
    type: 'claim',
    title: 'Transfer claim expired',
    amount: '15 SEI',
    status: 'failed',
    timestamp: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

type Activity = typeof mockActivities[0];

const ProfileActivityTimeline = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setActivities(mockActivities);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusIcon = (status: string, type: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'active':
        return <BarChart2 className="h-5 w-5 text-blue-500" />;
      case 'failed':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <ArrowUpRight className="h-5 w-5" />;
      case 'claim':
        return <ShieldCheck className="h-5 w-5" />;
      case 'pool':
        return <Users className="h-5 w-5" />;
      case 'stream':
        return <BarChart2 className="h-5 w-5" />;
      default:
        return <Download className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-500';
      case 'active':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No recent activity to display</p>
          ) : (
            activities.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex items-start gap-3 py-2">
                  <div className={cn(
                    "rounded-full p-2",
                    "bg-muted flex items-center justify-center"
                  )}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.amount}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <div className={cn(
                            "h-2.5 w-2.5 rounded-full", 
                            getStatusColor(activity.status)
                          )} />
                          <span className="text-sm font-medium">
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {index < activities.length - 1 && <Separator />}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileActivityTimeline;

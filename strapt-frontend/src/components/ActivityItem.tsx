
import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransactionDetails from './TransactionDetails';

type ActivityType = 'sent' | 'received' | 'pending';

interface ActivityItemProps {
  type: ActivityType;
  title: string;
  amount: string;
  date: string;
  recipient?: string;
  hash?: string;
}

const ActivityItem = ({ type, title, amount, date, recipient, hash = "sei1tx92h43lta8kdl5z4jmwxz7" }: ActivityItemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight className="h-5 w-5 text-destructive" />;
      case 'received':
        return <ArrowDownLeft className="h-5 w-5 text-primary" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case 'sent':
        return 'text-destructive';
      case 'received':
        return 'text-primary';
      case 'pending':
        return 'text-amber-500';
    }
  };

  return (
    <>
      <div 
        className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center">
          <div className="rounded-full bg-secondary p-2 mr-3">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground">{recipient || date}</p>
          </div>
        </div>
        <span className={cn('font-semibold', getAmountColor())}>{amount}</span>
      </div>

      <TransactionDetails 
        open={showDetails}
        onClose={() => setShowDetails(false)}
        transaction={{
          type,
          title,
          amount,
          date,
          recipient,
          hash
        }}
      />
    </>
  );
};

export default ActivityItem;

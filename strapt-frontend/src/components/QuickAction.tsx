
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  to?: string;
  color?: string;
  onClick?: () => void;
}

const QuickAction = ({ icon: Icon, label, to, color = 'bg-primary', onClick }: QuickActionProps) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex flex-col items-center p-3 rounded-2xl card-hover w-full',
          color
        )}
      >
        <div className="rounded-full bg-white/20 p-3 mb-2">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium text-white">{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to || '#'}
      className={cn(
        'flex flex-col items-center p-3 rounded-2xl card-hover',
        color
      )}
    >
      <div className="rounded-full bg-white/20 p-3 mb-2">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-xs font-medium text-white">{label}</span>
    </Link>
  );
};

export default QuickAction;

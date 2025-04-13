
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Users, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2] || '';

  const navItems = [
    { name: 'Home', path: '', icon: Home },
    { name: 'Streams', path: 'streams', icon: BarChart2 },
    { name: 'Pools', path: 'pools', icon: Users },
    { name: 'Savings', path: 'savings', icon: Wallet },
    { name: 'Profile', path: 'profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-card/80 backdrop-blur-lg border-t border-border mx-auto max-w-md">
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = path === item.path;
          return (
            <Link
              key={item.name}
              to={`/app/${item.path}`}
              className={cn(
                'flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5 mb-1', isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]')} />
              <span className={cn('text-xs', isActive ? 'font-medium' : 'font-normal')}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

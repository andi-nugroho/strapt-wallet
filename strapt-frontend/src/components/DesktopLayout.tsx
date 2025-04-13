import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowUp, 
  BarChart2, 
  Users, 
  Bell, 
  Shield, 
  Wallet, 
  Menu, 
  Droplets, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FaucetClaim from './FaucetClaim';
import { cn } from '@/lib/utils';
import RainbowKitProfile from './RainbowKitProfile';
import PrivyWalletProfile from './PrivyWalletProfile';

const DesktopLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[2] || '';
  const [showFaucet, setShowFaucet] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { name: 'Home', path: '', icon: Home },
    { name: 'Transfer', path: 'transfer', icon: ArrowUp },
    { name: 'Streams', path: 'streams', icon: BarChart2 },
    { name: 'Pools', path: 'pools', icon: Users },
    { name: 'Claims', path: 'claims', icon: Shield },
    { name: 'Savings', path: 'savings', icon: Wallet },
  ];

  const getTitle = () => {
    switch (path) {
      case '':
        return 'Dashboard';
      default:
        return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Fixed Sidebar */}
      <aside className={cn(
        "bg-sidebar border-r border-border transition-all duration-300 flex flex-col fixed h-screen z-10",
        sidebarCollapsed ? "w-[70px]" : "w-[240px]"
      )}>
        <div className="p-4 border-b border-border flex items-center justify-between h-16">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-bold gradient-text">TrustStream</h1>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(sidebarCollapsed && "mx-auto")}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>
        
        <div className="flex flex-col flex-1">
          <ScrollArea className="flex-1">
            <nav className="p-2">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = path === item.path;
                  return (
                    <li key={item.name}>
                      <Link
                        to={`/app/${item.path}`}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", !sidebarCollapsed && "mr-3")} />
                        {!sidebarCollapsed && <span>{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </ScrollArea>
          
          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm"
                className="mr-2 px-2"
                onClick={() => setShowFaucet(true)}
              >
                <Droplets className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">Faucet</span>}
              </Button>
              
              {!sidebarCollapsed ? (
                <Link to="/app/profile" className="flex-1 flex items-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-secondary">
                  <span>Profile</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content with margin-left to accommodate fixed sidebar */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarCollapsed ? "ml-[70px]" : "ml-[240px]"
      )}>
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b border-border h-16">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold gradient-text">{getTitle()}</h1>
            <div className="flex items-center gap-4">
              {/* <NetworkStatus /> */}
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              <PrivyWalletProfile />
            </div>
          </div>
        </header>
        
        <main className="p-6 flex-1 overflow-auto max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      
      <Dialog open={showFaucet} onOpenChange={setShowFaucet}>
        <DialogContent>
          <FaucetClaim onClose={() => setShowFaucet(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DesktopLayout;

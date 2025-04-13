import { useState } from 'react';
import { Copy, Moon, Sun, ChevronRight, LogOut, Shield, BarChart2, Users, Info, FileText, QrCode, UserPlus, Clock, CalendarClock, Scan } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from '@/hooks/use-mobile';
import QRCode from '@/components/QRCode';
import QRCodeScanner from '@/components/QRCodeScanner';
import ProfileActivityTimeline from '@/components/profile/ProfileActivityTimeline';
import QuickContacts from '@/components/profile/QuickContacts';
import DecentralizedIdentity from '@/components/profile/DecentralizedIdentity';
import ScheduledTransfers from '@/components/profile/ScheduledTransfers';

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected';

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Your wallet address has been copied to clipboard",
      });
    }
  };

  const handleSignOut = () => {
    disconnect();
    toast({
      title: "Signed Out",
      description: "Your wallet has been disconnected",
    });
    navigate('/');
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Apply the theme
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: `${newMode ? 'Dark' : 'Light'} Mode Enabled`,
      description: `Switched to ${newMode ? 'dark' : 'light'} mode`,
    });
  };

  // QR code profile data
  const profileData = {
    address,
    username: '@trustuser.sei',
    timestamp: new Date().toISOString(),
  };
  
  const profileQRValue = JSON.stringify(profileData);

  const menuItems = [
    {
      title: 'Transaction History',
      icon: FileText,
      onClick: () => console.log('Transaction History clicked'),
    },
    {
      title: 'Protected Transfers',
      icon: Shield,
      onClick: () => console.log('Protected Transfers clicked'),
    },
    {
      title: 'Streaming Payments',
      icon: BarChart2,
      onClick: () => console.log('Streaming Payments clicked'),
    },
    {
      title: 'Group Pools',
      icon: Users,
      onClick: () => console.log('Group Pools clicked'),
    },
    {
      title: 'About TrustStream',
      icon: Info,
      onClick: () => console.log('About clicked'),
    },
  ];

  return (
    <div className="space-y-4 pb-16">
      {/* User Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 mb-6`}>
            <Avatar className={`${isMobile ? 'mx-auto' : ''} h-16 w-16 border-2 border-primary`}>
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">TS</AvatarFallback>
            </Avatar>
            <div className={`flex-1 ${isMobile ? 'text-center' : ''}`}>
              <h2 className="text-lg font-medium">@trustuser.sei</h2>
              <div className={`flex items-center text-sm text-muted-foreground ${isMobile ? 'justify-center' : ''}`}>
                <span className="truncate">{truncatedAddress}</span>
                <button onClick={handleCopyAddress} className="ml-1 p-1" aria-label="Copy address">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className={`flex gap-2 ${isMobile ? 'justify-center mt-2' : 'ml-auto'}`}>
              <QRCodeScanner 
                buttonVariant="outline" 
                buttonSize="sm"
                buttonText="Scan"
                iconOnly={isMobile}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowQR(true)}
              >
                <QrCode className="h-4 w-4 mr-1" /> {!isMobile && "Share"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="font-semibold">1,245.78 SEI</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Protected</p>
              <p className="font-semibold">2 Active</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Streams</p>
              <p className="font-semibold">2 Active</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Pools</p>
              <p className="font-semibold">2 Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections - improved for mobile */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="activity" className="flex flex-col items-center p-2 h-auto">
            <Clock className="h-4 w-4 mb-1" />
            <span className="text-xs">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex flex-col items-center p-2 h-auto">
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex flex-col items-center p-2 h-auto">
            <CalendarClock className="h-4 w-4 mb-1" />
            <span className="text-xs">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="identity" className="flex flex-col items-center p-2 h-auto">
            <UserPlus className="h-4 w-4 mb-1" />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="space-y-4 mt-2">
          <ProfileActivityTimeline />
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4 mt-2">
          <QuickContacts />
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4 mt-2">
          <ScheduledTransfers />
        </TabsContent>
        
        <TabsContent value="identity" className="space-y-4 mt-2">
          <DecentralizedIdentity />
        </TabsContent>
      </Tabs>

      {/* Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span>Dark Mode</span>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      {/* Menu Items with simplified terminology */}
      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Button variant="ghost" className="w-full justify-start p-3 h-auto" onClick={item.onClick}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sign Out Button */}
      <Button 
        variant="destructive" 
        className="w-full flex items-center gap-2" 
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>

      {/* QR Code Dialog with beginner-friendly description */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className={isMobile ? "sm:max-w-[92%] w-[92%] mx-auto rounded-xl px-3 py-4" : "max-w-xs mx-auto sm:max-w-md"}>
          <DialogHeader>
            <DialogTitle>Your Profile QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4">
            <QRCode value={profileQRValue} size={isMobile ? 180 : 200} />
            <p className="text-sm text-center text-muted-foreground">
              Share this code with friends so they can easily find and send you money
            </p>
            <Button size="sm" variant="outline" onClick={handleCopyAddress}>
              <Copy className="h-4 w-4 mr-1" /> Copy Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;

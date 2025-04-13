
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Link, ExternalLink, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock connected accounts
const mockConnectedAccounts = [
  { 
    id: 'lens', 
    name: 'Lens Protocol', 
    handle: '@trustuser.lens', 
    iconUrl: '', 
    verified: true, 
    provider: 'lens' 
  },
  { 
    id: 'farcaster', 
    name: 'Farcaster', 
    handle: '@trustuser', 
    iconUrl: '', 
    verified: false,
    provider: 'farcaster' 
  }
];

// Available identity providers
const identityProviders = [
  { id: 'lens', name: 'Lens Protocol', description: 'Social media platform built on blockchain' },
  { id: 'farcaster', name: 'Farcaster', description: 'Decentralized social network' },
  { id: 'ceramic', name: 'Ceramic Network', description: 'Decentralized data network for Web3' },
  { id: 'ens', name: 'Ethereum Name Service', description: 'Decentralized naming for wallets, websites, & more' },
];

const DecentralizedIdentity = () => {
  const [connectedAccounts, setConnectedAccounts] = useState(mockConnectedAccounts);
  const { toast } = useToast();

  const handleConnect = (providerId: string) => {
    // In a real app, this would initiate an authentication flow
    toast({
      title: "Connection initiated",
      description: `Connecting to ${identityProviders.find(p => p.id === providerId)?.name}...`,
    });
  };

  const getAvatarFallback = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Connected Identities</CardTitle>
          <CardDescription>
            Your Web3 identities connected to this account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectedAccounts.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No connected identities</p>
          ) : (
            <div className="space-y-3">
              {connectedAccounts.map(account => (
                <div key={account.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={account.iconUrl} />
                      <AvatarFallback>{getAvatarFallback(account.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{account.name}</p>
                        {account.verified && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{account.handle}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Available Connections</CardTitle>
          <CardDescription>Connect with more decentralized identity providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {identityProviders
              .filter(provider => !connectedAccounts.some(a => a.id === provider.id))
              .map(provider => (
                <div key={provider.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getAvatarFallback(provider.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConnect(provider.id)}
                  >
                    <Link className="h-4 w-4 mr-1" /> Connect
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="mx-auto">
            Learn more about decentralized identity <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DecentralizedIdentity;

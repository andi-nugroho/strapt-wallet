import {
  ArrowDown,
  ArrowUp,
  PlusCircle,
  BarChart2,
  QrCode,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickAction from "@/components/QuickAction";
import ActivityItem from "@/components/ActivityItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import UsernameRegistration from "@/components/UsernameRegistration";
import ReceivedStats from "@/components/ReceivedStats";
import QRCode from "@/components/QRCode";
import { usePrivyWallet } from "@/hooks/use-privy-wallet";
import { useBalance, useChainId, useConfig } from "wagmi";
import { formatUnits } from "viem";
import { seiTestnet } from "@/lib/chains";
import { sepolia, baseSepolia } from "viem/chains";
import { Loading } from "@/components/ui/loading";

const Home = () => {
  const { isConnected, address } = usePrivyWallet();
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Use updated wagmi hooks for current network
  const chainId = useChainId();
  const config = useConfig();
  
  // Get balance for current network
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    chainId: chainId,
  });

  // Get the current chain information
  const currentChain = config.chains.find(c => c.id === chainId);

  // Fetch token prices based on current network
  useEffect(() => {
    const fetchPrice = async () => {
      if (!chainId || !isConnected) return;

      let coinId;
      switch (chainId) {
        case sepolia.id:
          coinId = 'ethereum';
          break;
        case baseSepolia.id:
          coinId = 'base';
          break;
        case seiTestnet.id:
          coinId = 'sei-network';
          break;
        default:
          return;
      }

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
        );
        const data = await response.json();
        setPrices({
          [currentChain?.name.toLowerCase() || '']: data[coinId].usd
        });
      } catch (error) {
        console.error('Failed to fetch price:', error);
        setPrices({});
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [chainId, isConnected, currentChain]);

  // Calculate USD value
  const getUSDValue = (balance: number, symbol: string): number => {
    const networkName = currentChain?.name.toLowerCase() || '';
    const price = prices[networkName] || 0;
    return balance * price;
  };

// Format balance with proper decimals
const formatBalance = (
  balance: bigint | undefined,
  decimals: number,
  precision: 1
): string => {
  if (!balance) return "0";

  const raw = Number(formatUnits(balance, decimals));
  
  // Special handling for SEI network
  if (chainId === seiTestnet.id) {
    // SEI appears to use 12 decimals, not 6
    return parseFloat(formatUnits(balance, 18)).toString();
  }
  
  // For other networks (ETH, etc)
  return raw.toFixed(precision);
};

  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [showUsernameReg, setShowUsernameReg] = useState(false);

  // Mock data for received funds
  const receivedData = {
    totalReceived: 385.28,
    recentActivity: [
      {
        amount: 10.5,
        direction: "in",
        date: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        amount: 125,
        direction: "out",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        amount: 200,
        direction: "in",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        amount: 50,
        direction: "in",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        amount: 75,
        direction: "out",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ] as Array<{ amount: number; direction: "in" | "out"; date: Date }>,
  };

  const handleCompleteRegistration = () => {
    setShowUsernameReg(false);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
          <CardTitle className="text-xl text-white flex items-center justify-between">
            Your Balance
            <Button
              size="sm"
              variant="ghost"
              className="text-white h-7 hover:bg-white/20"
              onClick={() => setShowQR(true)}
            >
              <QrCode className="h-4 w-4 mr-1" /> Receive
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center">
            {!isConnected ? (
              <div className="text-sm text-muted-foreground">
                Connect wallet to view balance
              </div>
            ) : isLoading ? (
              <Loading size="sm" text="Fetching balance..." />
            ) : balance ? (
              <>
                <div className="text-3xl font-bold mb-1">
                  {formatBalance(balance.value, balance.decimals, 1)}{" "}
                  {balance.symbol}
                </div>
                <div className="text-sm text-muted-foreground">
                  ≈ $
                  {getUSDValue(
                    parseFloat(formatBalance(balance.value, balance.decimals, 1)),
                    balance.symbol
                  ).toFixed(2)}{" "}
                  USD
                </div>
              </>
            ) : (
              <Loading size="sm" text="Connecting..." />
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => navigate("/app/claims")}
            >
              <ArrowDown className="h-4 w-4" /> Claims
            </button>
            <button
              className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => navigate("/app/transfer")}
            >
              <ArrowUp className="h-4 w-4" /> Send
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <QuickAction
            icon={ArrowUp}
            label="Send"
            to="/app/transfer"
            color="bg-gradient-to-br from-primary to-accent"
          />
          <QuickAction
            icon={BarChart2}
            label="Stream"
            to="/app/streams"
            color="bg-gradient-to-br from-blue-500 to-cyan-400"
          />
          <QuickAction
            icon={UserPlus}
            label="Register"
            onClick={() => setShowUsernameReg(true)}
            color="bg-gradient-to-br from-emerald-500 to-green-400"
          />
        </div>
      </div>

      {/* Received Stats */}
      <ReceivedStats
        totalReceived={receivedData.totalReceived}
        recentActivity={receivedData.recentActivity}
      />

      {/* Recent Activity */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <ActivityItem
              type="sent"
              title="Sent to Mark"
              amount="-125 SEI"
              date="2 hrs ago"
              recipient="@mark.sei"
            />
            <ActivityItem
              type="pending"
              title="Protected Transfer"
              amount="50 SEI"
              date="5 hrs ago"
              recipient="@alice.sei"
            />
            <ActivityItem
              type="received"
              title="Received from Stream"
              amount="+10.5 SEI"
              date="8 hrs ago"
            />
            <ActivityItem
              type="sent"
              title="Pool Contribution"
              amount="-75 SEI"
              date="1 day ago"
              recipient="Trip Fund"
            />
            <ActivityItem
              type="received"
              title="Received from John"
              amount="+200 SEI"
              date="2 days ago"
              recipient="@john.sei"
            />
          </CardContent>
        </Card>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Wallet QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4">
            <QRCode value="sei14zd...8xct" size={200} />
            <p className="text-sm font-medium">@trustuser.sei</p>
            <p className="text-xs text-muted-foreground">sei14zd...8xct</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText("sei14zd...8xct");
              }}
            >
              Copy Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Username Registration Dialog */}
      <Dialog open={showUsernameReg} onOpenChange={setShowUsernameReg}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register Your Username</DialogTitle>
          </DialogHeader>
          <UsernameRegistration onComplete={handleCompleteRegistration} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;

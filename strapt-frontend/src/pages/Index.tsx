import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Shield, BarChart2, Users, MessageCircle, CheckCircle, Zap, Smartphone, Droplets, Wallet } from 'lucide-react';
import PrivyLoginModal from '@/components/PrivyLoginModal';
import { usePrivyWallet } from '@/hooks/use-privy-wallet';

const Index = () => {
  const isMobile = useIsMobile();
  const { isConnected, connectWallet } = usePrivyWallet();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Redirect to app if already connected
  useEffect(() => {
    if (isConnected && showLoginModal) {
      navigate('/app');
      setShowLoginModal(false);
    }
  }, [isConnected, navigate, showLoginModal]);

  const handleLaunchApp = async () => {
    if (isConnected) {
      navigate('/app');
    } else {
      // Open the Privy login modal directly
      await connectWallet();
      // Don't automatically navigate - let the useEffect handle it after successful connection
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Privy Login Modal */}
      <PrivyLoginModal 
        open={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold gradient-text">TrustStream</h1>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#why" className="text-muted-foreground hover:text-foreground transition-colors">Why TrustStream</a>
              <Button onClick={handleLaunchApp}>Launch App</Button>
            </div>
            <Button onClick={handleLaunchApp} className="md:hidden">Launch</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
                Send, Stream, and Save — Securely on Web3
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Trustless crypto transfers and smart payments. Powered by Sei.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <Button 
                  className="w-full sm:w-auto text-base font-medium"
                  onClick={handleLaunchApp}
                >
                  Launch App <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto text-base font-medium">
                  Learn How It Works
                </Button>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="mx-auto max-w-xs md:max-w-sm md:w-1/2">
              <div className="relative">
                <div className="rounded-[3rem] bg-card p-4 overflow-hidden border-8 border-foreground/10 shadow-xl">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-foreground/10 rounded-b-xl"></div>
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 aspect-[9/19]">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-6">
                        <div className="w-2/3">
                          <div className="h-6 bg-white/20 rounded-lg mb-2"></div>
                          <div className="h-4 bg-white/10 rounded-lg w-2/3"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-accent/50"></div>
                        </div>
                        <div className="h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-primary/50"></div>
                        </div>
                        <div className="h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-white/20"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="h-16 rounded-xl bg-white/10 px-3 py-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 mr-2"></div>
                            <div>
                              <div className="h-3 w-16 bg-white/20 rounded mb-1"></div>
                              <div className="h-2 w-12 bg-white/10 rounded"></div>
                            </div>
                          </div>
                          <div className="h-4 w-12 bg-accent/50 rounded-lg"></div>
                        </div>
                        <div className="h-16 rounded-xl bg-white/10 px-3 py-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 mr-2"></div>
                            <div>
                              <div className="h-3 w-16 bg-white/20 rounded mb-1"></div>
                              <div className="h-2 w-12 bg-white/10 rounded"></div>
                            </div>
                          </div>
                          <div className="h-4 w-12 bg-primary/50 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-24" id="features">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card hover:shadow-md transition-all">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Protected Transfers</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card hover:shadow-md transition-all">
              <BarChart2 className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Streaming Payments</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card hover:shadow-md transition-all">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Group Pools</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card hover:shadow-md transition-all">
              <Wallet className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Crypto Savings</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card hover:shadow-md transition-all">
              <Droplets className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Token Faucet</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card hover:shadow-md transition-all">
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Telegram Mini App</h3>
            </div>
          </div>
        </div>

        {/* Why TrustStream Section */}
        <div className="max-w-7xl mx-auto mt-24" id="why">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Why TrustStream?</h2>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start p-6 rounded-2xl bg-card mb-4 md:mb-0">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">No scams, no stress</h3>
                <p className="text-muted-foreground">Built-in protections ensure your crypto arrives safely to its destination.</p>
              </div>
            </div>
            <div className="flex items-start p-6 rounded-2xl bg-card mb-4 md:mb-0">
              <Zap className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Easy as Venmo, secure as blockchain</h3>
                <p className="text-muted-foreground">Familiar payment experience, but with the security of Web3.</p>
              </div>
            </div>
            <div className="flex items-start p-6 rounded-2xl bg-card mb-4 md:mb-0">
              <Smartphone className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Mobile-first & responsive design</h3>
                <p className="text-muted-foreground">Optimized for smartphones and desktops with intuitive flows.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the future of crypto payments.
            </p>
            <Button size="lg" className="text-base" onClick={handleLaunchApp}>
              Launch TrustStream <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-xl font-bold gradient-text mb-4">TrustStream</h1>
              <p className="text-sm text-muted-foreground max-w-xs">
                Secure crypto payments, simplified for Web3 users.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase">Resources</h2>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Docs</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookies</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase">Contact</h2>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Support</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} TrustStream. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.676C0 23.407 0.593 24 1.325 24H12.82V14.706H9.692V11.084H12.82V8.413C12.82 5.313 14.713 3.625 17.479 3.625C18.804 3.625 19.942 3.724 20.274 3.768V7.008H18.356C16.852 7.008 16.561 7.724 16.561 8.772V11.085H20.148L19.681 14.707H16.561V24H22.677C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.643 4.937C22.808 5.307 21.911 5.557 20.968 5.67C21.941 5.08 22.669 4.17 23.016 3.092C22.116 3.626 21.119 4.01 20.058 4.222C19.208 3.319 17.998 2.75 16.658 2.75C14.086 2.75 12 4.836 12 7.407C12 7.766 12.042 8.115 12.12 8.45C8.247 8.261 4.81 6.416 2.518 3.639C2.118 4.323 1.891 5.08 1.891 5.887C1.891 7.409 2.664 8.744 3.868 9.498C3.106 9.474 2.389 9.267 1.758 8.921C1.758 8.941 1.758 8.962 1.758 8.983C1.758 11.255 3.352 13.152 5.465 13.574C5.075 13.681 4.665 13.738 4.242 13.738C3.939 13.738 3.644 13.709 3.357 13.654C3.956 15.517 5.692 16.873 7.742 16.91C6.129 18.175 4.097 18.922 1.89 18.922C1.515 18.922 1.143 18.9 0.779 18.855C2.85 20.196 5.303 20.969 7.958 20.969C16.647 20.969 21.389 13.815 21.389 7.619C21.389 7.419 21.385 7.22 21.376 7.023C22.286 6.35 23.073 5.513 23.641 4.542L23.643 4.937Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Index;

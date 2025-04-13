import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
      <div className="relative">
        <div className="animate-[ping_2s_ease-in-out_infinite] absolute w-16 h-16 rounded-full bg-primary/20" />
        <div className="animate-[ping_2s_ease-in-out_infinite] absolute w-16 h-16 rounded-full bg-primary/20 delay-300" />
        <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      </div>
      <div className="animate-pulse">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">
          STRAPT WALLET
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Loading your secure wallet...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
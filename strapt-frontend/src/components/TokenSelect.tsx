
import { CheckIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface TokenOption {
  symbol: string;
  name: string;
  icon?: string;
  balance?: number;
}

interface TokenSelectProps {
  tokens: TokenOption[];
  selectedToken: TokenOption;
  onTokenChange: (token: TokenOption) => void;
  className?: string;
}

const TokenSelect = ({ tokens, selectedToken, onTokenChange, className }: TokenSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center">
            {selectedToken.icon && (
              <div className="mr-2 h-6 w-6 overflow-hidden rounded-full bg-secondary/50">
                <img src={selectedToken.icon} alt={selectedToken.name} className="h-full w-full object-cover" />
              </div>
            )}
            <span>{selectedToken.symbol}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.symbol}
                  onSelect={() => {
                    onTokenChange(token);
                    setOpen(false);
                  }}
                  className="flex items-center"
                >
                  {token.icon && (
                    <div className="mr-2 h-5 w-5 overflow-hidden rounded-full bg-secondary/50">
                      <img src={token.icon} alt={token.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <span className="flex-1">{token.symbol}</span>
                  {token.balance !== undefined && (
                    <span className="text-xs text-muted-foreground">{token.balance.toFixed(2)}</span>
                  )}
                  {token.symbol === selectedToken.symbol && (
                    <CheckIcon className="ml-2 h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TokenSelect;

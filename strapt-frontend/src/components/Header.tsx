import { Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import PrivyWalletProfile from './PrivyWalletProfile';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2] || 'home';
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize dark mode based on document class
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Apply the theme
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getTitle = () => {
    switch (path) {
      case '':
        return 'Home';
      default:
        return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b border-border">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold gradient-text">{getTitle()}</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={toggleTheme}
          >
            {isDarkMode ? 
              <Sun className="h-5 w-5" /> :
              <Moon className="h-5 w-5" />
            }
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <PrivyWalletProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;


import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export const ComingSoon = ({ 
  title = "Feature Coming Soon", 
  description = "We're working hard to bring you this exciting new feature. Stay tuned!" 
}: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-6">
        <Construction className="h-12 w-12 text-primary" />
      </div>
      
      <h1 className="text-2xl font-bold mb-3">{title}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {description}
      </p>
      
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};

export default ComingSoon;

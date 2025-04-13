
import { useState } from 'react';
import { PlusCircle, X, Milestone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Milestone {
  id: string;
  percentage: number;
  description: string;
}

interface MilestoneInputProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
  duration: number; // total duration in minutes
}

const MilestoneInput = ({ milestones, onChange, duration }: MilestoneInputProps) => {
  const [description, setDescription] = useState('');
  const [percentage, setPercentage] = useState(25);

  const handleAddMilestone = () => {
    if (description.trim() === '') return;
    
    const newMilestone: Milestone = {
      id: `milestone-${Date.now()}`,
      percentage,
      description: description.trim(),
    };
    
    onChange([...milestones, newMilestone]);
    setDescription('');
    setPercentage(25);
  };

  const handleRemoveMilestone = (id: string) => {
    onChange(milestones.filter(milestone => milestone.id !== id));
  };
  
  const getTimeForPercentage = (percentage: number) => {
    const minutes = Math.round((percentage / 100) * duration);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="space-y-4">
      <Label className="text-base">Stream Milestones (Optional)</Label>
      
      <div className="p-3 bg-secondary/30 rounded-lg space-y-3">
        <p className="text-sm text-muted-foreground">
          Add milestones to track important points in your payment stream
        </p>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input 
              placeholder="Milestone description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-20">
            <Input 
              type="number"
              min={1}
              max={99}
              value={percentage}
              onChange={(e) => setPercentage(parseInt(e.target.value) || 25)}
            />
          </div>
          <div className="flex items-center text-sm text-muted-foreground mr-2">
            %
          </div>
          <Button 
            type="button" 
            size="sm" 
            onClick={handleAddMilestone}
            disabled={!description.trim()}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        
        {milestones.length > 0 && (
          <div className="space-y-2 mt-3">
            {milestones.map((milestone) => (
              <div 
                key={milestone.id} 
                className="flex items-center justify-between bg-background p-2 rounded"
              >
                <div className="flex items-center">
                  <Milestone className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{milestone.description}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-sm text-muted-foreground mr-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {getTimeForPercentage(milestone.percentage)}
                    <span className="mx-1">•</span>
                    {milestone.percentage}%
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => handleRemoveMilestone(milestone.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneInput;

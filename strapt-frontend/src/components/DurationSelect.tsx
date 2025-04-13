
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export type DurationUnit = 'seconds' | 'minutes' | 'hours' | 'days';

interface DurationSelectProps {
  value: number;
  unit: DurationUnit;
  onChange: (value: number, unit: DurationUnit) => void;
  label?: string;
  id?: string;
  className?: string;
}

const DurationSelect = ({ 
  value, 
  unit, 
  onChange, 
  label = "Duration", 
  id = "duration",
  className
}: DurationSelectProps) => {
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    onChange(newValue, unit);
  };
  
  const handleUnitChange = (newUnit: DurationUnit) => {
    onChange(value, newUnit);
  };

  // Convert to seconds for internal calculations
  const getSeconds = (val: number, unitType: DurationUnit): number => {
    switch (unitType) {
      case 'seconds': return val;
      case 'minutes': return val * 60;
      case 'hours': return val * 60 * 60;
      case 'days': return val * 24 * 60 * 60;
    }
  };

  // Format for display
  const formatDuration = (val: number, unitType: DurationUnit): string => {
    const seconds = getSeconds(val, unitType);
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return secs ? `${mins} min ${secs} sec` : `${mins} minutes`;
    }
    if (seconds < 86400) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      return mins ? `${hrs} hr ${mins} min` : `${hrs} hours`;
    }
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    return hrs ? `${days} day ${hrs} hr` : `${days} days`;
  };

  return (
    <div className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex space-x-2 mt-1.5">
        <Input
          id={id}
          type="number"
          min="1"
          value={value}
          onChange={handleValueChange}
          className="flex-1"
          placeholder="Enter duration"
        />
        <Select value={unit} onValueChange={(val) => handleUnitChange(val as DurationUnit)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds">Seconds</SelectItem>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
            <SelectItem value="days">Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {value > 0 && (
        <p className="text-xs text-muted-foreground mt-1">
          {formatDuration(value, unit)}
        </p>
      )}
    </div>
  );
};

export default DurationSelect;

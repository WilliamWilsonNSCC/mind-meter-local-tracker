import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface MoodSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  emoji?: string;
}

const MoodSlider = ({ label, value, onChange, emoji }: MoodSliderProps) => {
  const getMoodColor = (val: number) => {
    if (val <= 3) return "text-destructive";
    if (val <= 6) return "text-muted-foreground";
    return "text-secondary";
  };

  const getMoodLabel = (val: number) => {
    if (val <= 2) return "Very Low";
    if (val <= 4) return "Low";
    if (val <= 6) return "Moderate";
    if (val <= 8) return "Good";
    return "Excellent";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-medium flex items-center gap-2">
          {emoji && <span className="text-2xl">{emoji}</span>}
          {label}
        </Label>
        <div className={`flex items-center gap-2 ${getMoodColor(value)}`}>
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm font-medium">{getMoodLabel(value)}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={1}
        max={10}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>1 - Low</span>
        <span>10 - High</span>
      </div>
    </div>
  );
};

export default MoodSlider;

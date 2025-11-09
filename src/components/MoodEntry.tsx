import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export interface MoodEntryData {
  id: string;
  mentalLevel: number;
  stressLevel: number;
  activities: string[];
  notes: string;
  timestamp: string;
}

interface MoodEntryProps {
  entry: MoodEntryData;
}

const MoodEntry = ({ entry }: MoodEntryProps) => {
  const getMoodEmoji = (level: number) => {
    if (level <= 3) return "😔";
    if (level <= 6) return "😐";
    return "😊";
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getMoodEmoji(entry.mentalLevel)}</span>
              <div>
                <p className="text-xs text-muted-foreground">Mental</p>
                <p className="text-lg font-semibold text-primary">{entry.mentalLevel}/10</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">💭</span>
              <div>
                <p className="text-xs text-muted-foreground">Stress</p>
                <p className="text-lg font-semibold text-accent">{entry.stressLevel}/10</p>
              </div>
            </div>
          </div>
        </div>
        <time className="text-xs text-muted-foreground">
          {format(new Date(entry.timestamp), "MMM dd, h:mm a")}
        </time>
      </div>

      {entry.activities.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {entry.activities.map((activity) => (
            <Badge key={activity} variant="secondary" className="text-xs">
              {activity}
            </Badge>
          ))}
        </div>
      )}

      {entry.notes && (
        <p className="text-sm text-muted-foreground italic border-l-2 border-accent pl-3">
          "{entry.notes}"
        </p>
      )}
    </Card>
  );
};

export default MoodEntry;

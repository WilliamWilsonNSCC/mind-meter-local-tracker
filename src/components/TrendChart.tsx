import { Card } from "@/components/ui/card";
import { MoodEntryData } from "./MoodEntry";
import { format } from "date-fns";

interface TrendChartProps {
  entries: MoodEntryData[];
}

const TrendChart = ({ entries }: TrendChartProps) => {
  if (entries.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Start logging your mood to see trends and patterns
        </p>
      </Card>
    );
  }

  // Take last 7 entries for the chart
  const recentEntries = entries.slice(0, 7).reverse();
  const maxValue = 10;

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Recent Trends</h3>
      <div className="space-y-6">
        {/* Mental Level Chart */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <span className="text-xl">😊</span>
              Mental Level
            </span>
            <span className="text-xs text-muted-foreground">
              Avg: {(recentEntries.reduce((sum, e) => sum + e.mentalLevel, 0) / recentEntries.length).toFixed(1)}
            </span>
          </div>
          <div className="h-20 flex items-end gap-2">
            {recentEntries.map((entry, idx) => (
              <div key={entry.id} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-calm rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${(entry.mentalLevel / maxValue) * 100}%`,
                    minHeight: "4px",
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {format(new Date(entry.timestamp), "EEE")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stress Level Chart */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <span className="text-xl">💭</span>
              Stress Level
            </span>
            <span className="text-xs text-muted-foreground">
              Avg: {(recentEntries.reduce((sum, e) => sum + e.stressLevel, 0) / recentEntries.length).toFixed(1)}
            </span>
          </div>
          <div className="h-20 flex items-end gap-2">
            {recentEntries.map((entry, idx) => (
              <div key={entry.id} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-accent to-secondary rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${(entry.stressLevel / maxValue) * 100}%`,
                    minHeight: "4px",
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {format(new Date(entry.timestamp), "EEE")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrendChart;

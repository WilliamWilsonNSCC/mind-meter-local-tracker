import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import MoodSlider from "@/components/MoodSlider";
import ActivityTags from "@/components/ActivityTags";
import MoodEntry, { MoodEntryData } from "@/components/MoodEntry";
import TrendChart from "@/components/TrendChart";
import { Brain, Plus, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

const STORAGE_KEY = "mindmeter-entries";

const Index = () => {
  const [mentalLevel, setMentalLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [activities, setActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<MoodEntryData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // Load entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading entries:", e);
      }
    }
  }, []);

  // Save entries to localStorage
  const saveEntry = () => {
    const newEntry: MoodEntryData = {
      id: Date.now().toString(),
      mentalLevel,
      stressLevel,
      activities,
      notes,
      timestamp: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

    // Reset form
    setMentalLevel(5);
    setStressLevel(5);
    setActivities([]);
    setNotes("");
    setShowForm(false);

    toast({
      title: "Entry saved! 🎉",
      description: "Your mood has been recorded.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-calm opacity-80" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-white drop-shadow-lg" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              MindMeter
            </h1>
          </div>
          <p className="text-xl text-white/90 mb-8 drop-shadow max-w-2xl mx-auto">
            Track your mental wellness and discover patterns in your daily life
          </p>
          {!showForm && (
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="shadow-glow bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
            >
              <Plus className="mr-2 h-5 w-5" />
              Log Your Mood
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
        {/* Mood Logging Form */}
        {showForm && (
          <Card className="p-6 shadow-soft animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              How are you feeling?
            </h2>

            <div className="space-y-8">
              <MoodSlider
                label="Mental Level"
                value={mentalLevel}
                onChange={setMentalLevel}
                emoji="😊"
              />

              <MoodSlider
                label="Stress Level"
                value={stressLevel}
                onChange={setStressLevel}
                emoji="💭"
              />

              <ActivityTags
                selectedTags={activities}
                onTagsChange={setActivities}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Notes (optional)
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling? What's on your mind?"
                  className="min-h-24 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={saveEntry}
                  className="flex-1 bg-gradient-calm text-white hover:opacity-90"
                  size="lg"
                >
                  Save Entry
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Trends Section */}
        {entries.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h2 className="text-2xl font-bold">Your Insights</h2>
            </div>
            <TrendChart entries={entries} />
          </div>
        )}

        {/* Recent Entries */}
        {entries.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Entries</h2>
            <div className="space-y-4">
              {entries.map((entry) => (
                <MoodEntry key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {entries.length === 0 && !showForm && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-calm rounded-full mx-auto flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Start Your Journey</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Begin tracking your mental wellness today. Log your first mood entry to discover insights about your well-being.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-gradient-calm text-white hover:opacity-90"
              >
                <Plus className="mr-2 h-5 w-5" />
                Log First Entry
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;

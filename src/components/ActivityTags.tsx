import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ActivityTagsProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const PRESET_ACTIVITIES = [
  "Working",
  "Studying",
  "Exercising",
  "Socializing",
  "Resting",
  "Eating",
  "Commuting",
  "Entertainment",
  "Family Time",
  "Meditation",
];

const ActivityTags = ({ selectedTags, onTagsChange }: ActivityTagsProps) => {
  const [customTag, setCustomTag] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      onTagsChange([...selectedTags, customTag.trim()]);
      setCustomTag("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">What were you doing?</h3>
      <div className="flex flex-wrap gap-2">
        {PRESET_ACTIVITIES.map((activity) => (
          <Badge
            key={activity}
            variant={selectedTags.includes(activity) ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => toggleTag(activity)}
          >
            {activity}
            {selectedTags.includes(activity) && (
              <X className="ml-1 h-3 w-3" />
            )}
          </Badge>
        ))}
      </div>

      {selectedTags.filter((tag) => !PRESET_ACTIVITIES.includes(tag)).length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          {selectedTags
            .filter((tag) => !PRESET_ACTIVITIES.includes(tag))
            .map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
        </div>
      )}

      {showCustomInput ? (
        <div className="flex gap-2">
          <Input
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="Type custom activity..."
            onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
            className="flex-1"
          />
          <Button onClick={addCustomTag} size="sm" variant="secondary">
            Add
          </Button>
          <Button
            onClick={() => {
              setShowCustomInput(false);
              setCustomTag("");
            }}
            size="sm"
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setShowCustomInput(true)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Activity
        </Button>
      )}
    </div>
  );
};

export default ActivityTags;

import { useState } from "react";
import { Card } from "@/components/ui/card";

const moods = [
  { emoji: "😔", label: "Low", color: "bg-serenity/20 border-serenity/30 hover:bg-serenity/30", value: 1 },
  { emoji: "😕", label: "Meh", color: "bg-muted border-border hover:bg-muted/80", value: 2 },
  { emoji: "😊", label: "Good", color: "bg-nature-light border-nature/30 hover:bg-nature/20", value: 3 },
  { emoji: "😄", label: "Great", color: "bg-warmth-light border-warmth/30 hover:bg-warmth/20", value: 4 },
  { emoji: "🤩", label: "Amazing", color: "bg-calm-light border-calm/30 hover:bg-calm/20", value: 5 },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Sample mood data for the week
const weekMoods = [3, 4, 2, 5, 4, 3, null]; // null for today (not yet logged)

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setIsLogged(true);
  };

  const getMoodColor = (value: number | null) => {
    if (value === null) return "bg-muted/50";
    const colors = [
      "",
      "bg-serenity/40",
      "bg-muted",
      "bg-nature/30",
      "bg-warmth/40",
      "bg-calm/40",
    ];
    return colors[value] || "bg-muted/50";
  };

  return (
    <section id="mood" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              How Are You Feeling?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Take a moment to check in with yourself. Tracking your mood helps build self-awareness and emotional resilience.
            </p>
          </div>

          {/* Mood Selection */}
          <Card className="p-8 md:p-10 shadow-medium border-0 bg-card">
            <h3 className="text-lg font-medium text-foreground mb-6 text-center">
              {isLogged ? "You're feeling " + moods.find(m => m.value === selectedMood)?.label.toLowerCase() + " today!" : "Select your current mood"}
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 ${mood.color} ${
                    selectedMood === mood.value
                      ? "ring-2 ring-calm ring-offset-2 scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  <span className="text-4xl md:text-5xl">{mood.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{mood.label}</span>
                </button>
              ))}
            </div>

            {/* Weekly Overview */}
            <div className="pt-8 border-t border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">Your Week at a Glance</h4>
              <div className="flex justify-center gap-2 md:gap-4">
                {weekDays.map((day, index) => {
                  const moodValue = index === 6 && isLogged ? selectedMood : weekMoods[index];
                  return (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${getMoodColor(moodValue)} transition-all duration-300 flex items-center justify-center`}
                      >
                        {moodValue && (
                          <span className="text-lg md:text-xl">
                            {moods.find(m => m.value === moodValue)?.emoji}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MoodTracker;

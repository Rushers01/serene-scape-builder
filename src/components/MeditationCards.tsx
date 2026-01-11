import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Headphones, Moon, Sun, Wind, Heart } from "lucide-react";

const meditations = [
  {
    title: "Morning Calm",
    description: "Start your day with clarity and intention",
    duration: "10 min",
    icon: Sun,
    gradient: "gradient-warmth",
    listeners: "12.5k",
  },
  {
    title: "Stress Relief",
    description: "Release tension and find your center",
    duration: "15 min",
    icon: Wind,
    gradient: "gradient-calm",
    listeners: "28.3k",
  },
  {
    title: "Deep Sleep",
    description: "Drift into peaceful, restorative sleep",
    duration: "30 min",
    icon: Moon,
    gradient: "gradient-serenity",
    listeners: "45.1k",
  },
  {
    title: "Self-Love",
    description: "Cultivate compassion for yourself",
    duration: "12 min",
    icon: Heart,
    gradient: "gradient-nature",
    listeners: "18.7k",
  },
];

const MeditationCards = () => {
  return (
    <section id="meditate" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Guided Meditations
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Choose a meditation that resonates with you. Each session is crafted to guide you towards inner peace.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meditations.map((meditation, index) => {
              const Icon = meditation.icon;
              return (
                <Card
                  key={meditation.title}
                  className="group relative overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 bg-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon Header */}
                  <div className={`${meditation.gradient} p-8 flex justify-center`}>
                    <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {meditation.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {meditation.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {meditation.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Headphones className="w-3.5 h-3.5" />
                        {meditation.listeners}
                      </span>
                    </div>

                    {/* Play Button */}
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Session
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <Button variant="calm" size="lg">
              Explore All Meditations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeditationCards;

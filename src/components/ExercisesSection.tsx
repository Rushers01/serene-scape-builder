import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, RotateCcw, CheckCircle2 } from "lucide-react";

const exercises = [
  {
    id: 1,
    title: "Box Breathing",
    description: "A powerful technique to calm your nervous system",
    steps: ["Inhale for 4 seconds", "Hold for 4 seconds", "Exhale for 4 seconds", "Hold for 4 seconds"],
    duration: "4 min",
    color: "calm",
  },
  {
    id: 2,
    title: "5-4-3-2-1 Grounding",
    description: "Use your senses to anchor yourself in the present",
    steps: ["5 things you see", "4 things you feel", "3 things you hear", "2 things you smell", "1 thing you taste"],
    duration: "5 min",
    color: "serenity",
  },
  {
    id: 3,
    title: "Body Scan",
    description: "Release tension by focusing on each part of your body",
    steps: ["Start at your toes", "Notice any tension", "Breathe into that area", "Move slowly upward"],
    duration: "10 min",
    color: "nature",
  },
  {
    id: 4,
    title: "Gratitude Practice",
    description: "Shift your focus to what brings you joy",
    steps: ["Think of 3 things you're grateful for", "Feel the emotion", "Write them down", "Reflect on why they matter"],
    duration: "5 min",
    color: "warmth",
  },
];

const ExercisesSection = () => {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const handleStart = (id: number) => {
    setActiveExercise(id);
    setCurrentStep(0);
  };

  const handleNextStep = (exercise: typeof exercises[0]) => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompletedExercises((prev) => [...prev, exercise.id]);
      setActiveExercise(null);
      setCurrentStep(0);
    }
  };

  const handleReset = () => {
    setActiveExercise(null);
    setCurrentStep(0);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; light: string; text: string }> = {
      calm: { bg: "bg-calm", light: "bg-calm-light", text: "text-calm" },
      serenity: { bg: "bg-serenity", light: "bg-serenity-light", text: "text-serenity" },
      nature: { bg: "bg-nature", light: "bg-nature-light", text: "text-nature" },
      warmth: { bg: "bg-warmth", light: "bg-warmth-light", text: "text-warmth" },
    };
    return colors[color] || colors.calm;
  };

  return (
    <section id="exercises" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Quick Relief Exercises
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Simple, effective techniques you can practice anywhere to find calm in moments of stress.
            </p>
          </div>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise) => {
              const colors = getColorClasses(exercise.color);
              const isActive = activeExercise === exercise.id;
              const isCompleted = completedExercises.includes(exercise.id);

              return (
                <Card
                  key={exercise.id}
                  className={`p-6 md:p-8 border-0 shadow-soft transition-all duration-500 ${
                    isActive ? "ring-2 ring-offset-2 " + colors.text.replace("text", "ring") : ""
                  } ${isCompleted ? colors.light : "bg-card"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                        ) : (
                          <span className="text-xl font-bold text-primary-foreground">{exercise.id}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {exercise.title}
                        </h3>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Timer className="w-3.5 h-3.5" />
                          {exercise.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{exercise.description}</p>

                  {isActive ? (
                    <div className="space-y-4">
                      {/* Progress */}
                      <div className="flex gap-1 mb-4">
                        {exercise.steps.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              idx <= currentStep ? colors.bg : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Current Step */}
                      <div className={`${colors.light} rounded-xl p-6 text-center`}>
                        <p className="text-sm text-muted-foreground mb-2">
                          Step {currentStep + 1} of {exercise.steps.length}
                        </p>
                        <p className={`text-lg font-medium ${colors.text}`}>
                          {exercise.steps[currentStep]}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={handleReset}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                        <Button
                          className={`flex-1 ${
                            exercise.color === "calm" ? "gradient-calm" :
                            exercise.color === "serenity" ? "gradient-serenity" :
                            exercise.color === "nature" ? "gradient-nature" :
                            "gradient-warmth"
                          } text-primary-foreground`}
                          onClick={() => handleNextStep(exercise)}
                        >
                          {currentStep < exercise.steps.length - 1 ? "Next Step" : "Complete"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Steps Preview */}
                      <ul className="space-y-2 mb-6">
                        {exercise.steps.slice(0, 3).map((step, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                            {step}
                          </li>
                        ))}
                        {exercise.steps.length > 3 && (
                          <li className="text-sm text-muted-foreground ml-3.5">
                            +{exercise.steps.length - 3} more steps
                          </li>
                        )}
                      </ul>

                      <Button
                        variant={isCompleted ? "outline" : "default"}
                        className={`w-full ${!isCompleted && colors.bg + " text-primary-foreground hover:opacity-90"}`}
                        onClick={() => handleStart(exercise.id)}
                      >
                        {isCompleted ? "Practice Again" : "Start Exercise"}
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExercisesSection;

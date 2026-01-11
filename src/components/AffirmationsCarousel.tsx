import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const affirmations = [
  {
    text: "I am worthy of love, peace, and happiness.",
    author: "Daily Affirmation",
    gradient: "gradient-calm",
  },
  {
    text: "Every breath I take fills me with calm and clarity.",
    author: "Mindfulness Practice",
    gradient: "gradient-serenity",
  },
  {
    text: "I release what I cannot control and embrace what I can.",
    author: "Letting Go",
    gradient: "gradient-nature",
  },
  {
    text: "My mind is clear, my heart is open, my spirit is free.",
    author: "Inner Peace",
    gradient: "gradient-warmth",
  },
  {
    text: "I am growing stronger and more resilient each day.",
    author: "Personal Growth",
    gradient: "gradient-calm",
  },
];

const AffirmationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentAffirmation = affirmations[currentIndex];

  return (
    <section className="py-20 md:py-32 gradient-hero">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Daily Affirmations
            </h2>
            <p className="text-lg text-muted-foreground">
              Let these words guide you towards positivity and self-compassion.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div
              className={`${currentAffirmation.gradient} rounded-3xl p-8 md:p-16 shadow-medium transition-all duration-500 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <Quote className="w-12 h-12 text-primary-foreground/40 mb-6" />
              
              <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl text-primary-foreground leading-relaxed mb-8">
                "{currentAffirmation.text}"
              </blockquote>
              
              <p className="text-primary-foreground/80 font-medium">
                — {currentAffirmation.author}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="glass"
                size="icon"
                onClick={goToPrev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {affirmations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-calm w-8"
                        : "bg-calm/30 hover:bg-calm/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="glass"
                size="icon"
                onClick={goToNext}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffirmationsCarousel;

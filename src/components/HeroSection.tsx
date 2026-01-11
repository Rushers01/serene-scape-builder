import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Heart, Sparkles, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-calm/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-serenity/10 blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-warmth/10 blur-3xl animate-float" style={{ animationDelay: '-4s' }} />

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-calm-light border border-calm/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-calm" />
            <span className="text-sm font-medium text-calm">Your mental wellness companion</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-tight mb-6 animate-slide-up">
            Find Your
            <span className="block text-calm">Inner Peace</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Track your mood, practice mindfulness, and discover calm through guided meditations and therapeutic exercises designed for your wellbeing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="calm" size="xl" className="group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Begin Your Journey
            </Button>
            <Button variant="glass" size="xl" className="group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* AI Chat Button */}
          <div className="mt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/ai-chat">
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                Chat with AI Companion
              </Button>
            </Link>
          </div>

          {/* Breathing Circle */}
          <div className="mt-20 flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-calm/30 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-calm/40 flex items-center justify-center animate-breathe">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full gradient-calm flex items-center justify-center shadow-glow-calm">
                    <span className="text-primary-foreground font-medium text-sm md:text-base">Breathe</span>
                  </div>
                </div>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border border-calm/20 animate-pulse-soft" />
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Follow the circle • Inhale as it expands • Exhale as it contracts
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

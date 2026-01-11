import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MoodTracker from "@/components/MoodTracker";
import AffirmationsCarousel from "@/components/AffirmationsCarousel";
import MeditationCards from "@/components/MeditationCards";
import ExercisesSection from "@/components/ExercisesSection";
import Footer from "@/components/Footer";
import AIChatbox from "@/components/AIChatbox";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MoodTracker />
        <AffirmationsCarousel />
        <MeditationCards />
        <ExercisesSection />
      </main>
      <Footer />
      <AIChatbox />
    </div>
  );
};

export default Index;

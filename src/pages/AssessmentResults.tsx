import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Sparkles, 
  AlertTriangle, 
  Phone, 
  MessageCircle,
  BookOpen,
  Users,
  ArrowRight,
  RefreshCw,
  Stethoscope,
  Brain,
  Leaf
} from "lucide-react";

interface ResultLevel {
  level: string;
  color: string;
  gradient: string;
  icon: React.ElementType;
  description: string;
  suggestions: string[];
  professionals: { title: string; description: string; icon: React.ElementType }[];
}

const resultLevels: Record<string, ResultLevel> = {
  excellent: {
    level: "Excellent",
    color: "text-nature",
    gradient: "gradient-nature",
    icon: Sparkles,
    description: "Your mental health appears to be in a great place! Continue nurturing your wellbeing with positive habits.",
    suggestions: [
      "Maintain your current self-care routines",
      "Continue regular physical exercise",
      "Keep nurturing your social connections",
      "Practice gratitude journaling",
      "Consider helping others in their mental health journey",
    ],
    professionals: [
      { title: "Life Coach", description: "Optimize your potential and set meaningful goals", icon: Sparkles },
      { title: "Wellness Counselor", description: "Enhance your already healthy lifestyle", icon: Leaf },
    ],
  },
  good: {
    level: "Good",
    color: "text-calm",
    gradient: "gradient-calm",
    icon: Heart,
    description: "You're managing well overall with some areas that could use attention. Small adjustments can make a big difference.",
    suggestions: [
      "Establish a consistent sleep schedule",
      "Try mindfulness meditation for 10 minutes daily",
      "Limit social media and screen time",
      "Connect with a friend or family member weekly",
      "Practice deep breathing when stressed",
    ],
    professionals: [
      { title: "Therapist", description: "Develop coping strategies and build resilience", icon: MessageCircle },
      { title: "Counselor", description: "Work through specific concerns in a safe space", icon: Heart },
    ],
  },
  moderate: {
    level: "Moderate Concern",
    color: "text-warmth",
    gradient: "gradient-warmth",
    icon: AlertTriangle,
    description: "Your responses indicate some challenges that would benefit from professional support. You're not alone in this.",
    suggestions: [
      "Consider speaking with a mental health professional",
      "Join a support group or community",
      "Practice self-compassion and avoid self-criticism",
      "Establish daily routines for stability",
      "Limit alcohol and caffeine intake",
      "Try guided meditation or relaxation exercises",
    ],
    professionals: [
      { title: "Licensed Therapist", description: "Evidence-based therapy for anxiety and depression", icon: Brain },
      { title: "Psychiatrist", description: "Medical evaluation and treatment options", icon: Stethoscope },
      { title: "Support Group Leader", description: "Connect with others facing similar challenges", icon: Users },
    ],
  },
  high: {
    level: "Significant Concern",
    color: "text-destructive",
    gradient: "bg-destructive",
    icon: Phone,
    description: "Your responses suggest you may be experiencing significant distress. Please reach out to a mental health professional as soon as possible.",
    suggestions: [
      "Contact a mental health professional immediately",
      "Reach out to a trusted friend or family member",
      "Call a mental health helpline if in crisis",
      "Avoid making major decisions during this time",
      "Focus on basic self-care: eating, sleeping, hygiene",
      "Remember: seeking help is a sign of strength",
    ],
    professionals: [
      { title: "Crisis Counselor", description: "Immediate support during difficult times", icon: Phone },
      { title: "Psychiatrist", description: "Comprehensive mental health evaluation", icon: Stethoscope },
      { title: "Clinical Psychologist", description: "In-depth therapy and psychological support", icon: Brain },
    ],
  },
};

const AssessmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: 0 };

  // Determine result level based on score (max score: 30)
  const getResultLevel = (score: number): ResultLevel => {
    if (score <= 5) return resultLevels.excellent;
    if (score <= 12) return resultLevels.good;
    if (score <= 20) return resultLevels.moderate;
    return resultLevels.high;
  };

  const result = getResultLevel(score);
  const Icon = result.icon;

  const helplines = [
    { name: "National Crisis Helpline", number: "988", country: "USA" },
    { name: "iCall", number: "9152987821", country: "India" },
    { name: "Samaritans", number: "116 123", country: "UK" },
    { name: "Lifeline", number: "13 11 14", country: "Australia" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            {/* Result Header */}
            <Card className={`p-8 md:p-12 ${result.gradient} text-primary-foreground text-center mb-8 border-0`}>
              <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
                <Icon className="w-10 h-10" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                Your Wellbeing Level: {result.level}
              </h1>
              <p className="text-lg opacity-90 max-w-xl mx-auto">
                {result.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-primary-foreground/20 px-4 py-2 rounded-full">
                <span className="text-sm">Assessment Score: {score}/30</span>
              </div>
            </Card>

            {/* Suggestions */}
            <Card className="p-6 md:p-8 border-0 shadow-medium bg-card mb-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-calm" />
                Personalized Suggestions
              </h2>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-calm-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-calm">{idx + 1}</span>
                    </div>
                    <span className="text-foreground">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Professional Recommendations */}
            <Card className="p-6 md:p-8 border-0 shadow-medium bg-card mb-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-serenity" />
                Recommended Professionals
              </h2>
              <div className="grid gap-4">
                {result.professionals.map((professional, idx) => {
                  const ProfIcon = professional.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-serenity-light flex items-center justify-center">
                        <ProfIcon className="w-6 h-6 text-serenity" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{professional.title}</h3>
                        <p className="text-sm text-muted-foreground">{professional.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Find Near Me
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Crisis Helplines */}
            {score > 12 && (
              <Card className="p-6 md:p-8 border-2 border-warmth/30 bg-warmth-light mb-8">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-warmth" />
                  Crisis Helplines - Available 24/7
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {helplines.map((helpline, idx) => (
                    <a
                      key={idx}
                      href={`tel:${helpline.number}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-background transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{helpline.name}</p>
                        <p className="text-xs text-muted-foreground">{helpline.country}</p>
                      </div>
                      <span className="font-bold text-warmth">{helpline.number}</span>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate("/assessment")} size="lg">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Link to="/community">
                <Button variant="calm" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Join Our Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-8 max-w-lg mx-auto">
              This assessment is a screening tool and not a diagnostic instrument. 
              For accurate diagnosis and treatment, please consult with a qualified mental health professional.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentResults;

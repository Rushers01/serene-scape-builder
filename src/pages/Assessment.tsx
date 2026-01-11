import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: 1,
    category: "Mood",
    question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    category: "Interest",
    question: "How often have you had little interest or pleasure in doing things you usually enjoy?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    category: "Sleep",
    question: "How would you describe your sleep quality recently?",
    options: [
      { text: "I sleep well and feel rested", score: 0 },
      { text: "Occasional trouble sleeping", score: 1 },
      { text: "Frequently disrupted sleep", score: 2 },
      { text: "Severe insomnia or oversleeping", score: 3 },
    ],
  },
  {
    id: 4,
    category: "Energy",
    question: "How often do you feel tired or have little energy?",
    options: [
      { text: "Rarely, I feel energetic", score: 0 },
      { text: "Sometimes tired", score: 1 },
      { text: "Often fatigued", score: 2 },
      { text: "Constantly exhausted", score: 3 },
    ],
  },
  {
    id: 5,
    category: "Anxiety",
    question: "How often do you feel nervous, anxious, or on edge?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    category: "Worry",
    question: "How often do you find it difficult to stop or control worrying?",
    options: [
      { text: "I manage worry well", score: 0 },
      { text: "Occasionally overwhelmed", score: 1 },
      { text: "Frequently worried", score: 2 },
      { text: "Constant uncontrollable worry", score: 3 },
    ],
  },
  {
    id: 7,
    category: "Social",
    question: "How connected do you feel to friends, family, or community?",
    options: [
      { text: "Very connected and supported", score: 0 },
      { text: "Somewhat connected", score: 1 },
      { text: "Often feel isolated", score: 2 },
      { text: "Completely disconnected", score: 3 },
    ],
  },
  {
    id: 8,
    category: "Self-worth",
    question: "How often do you feel bad about yourself or that you're a failure?",
    options: [
      { text: "Never, I value myself", score: 0 },
      { text: "Occasionally", score: 1 },
      { text: "Frequently", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 9,
    category: "Concentration",
    question: "How is your ability to concentrate on things like reading or watching TV?",
    options: [
      { text: "No trouble concentrating", score: 0 },
      { text: "Some difficulty", score: 1 },
      { text: "Significant difficulty", score: 2 },
      { text: "Unable to concentrate", score: 3 },
    ],
  },
  {
    id: 10,
    category: "Coping",
    question: "When facing stress, how well do you cope?",
    options: [
      { text: "I handle stress well", score: 0 },
      { text: "I manage with some effort", score: 1 },
      { text: "I often feel overwhelmed", score: 2 },
      { text: "I can't cope at all", score: 3 },
    ],
  },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleOptionSelect = (score: number) => {
    setSelectedOption(score);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = { ...answers, [question.id]: selectedOption };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(answers[questions[currentQuestion + 1]?.id] ?? null);
      } else {
        // Calculate total score and navigate to results
        const totalScore = Object.values(newAnswers).reduce((sum, score) => sum + score, 0);
        navigate("/assessment/results", { state: { score: totalScore, answers: newAnswers } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(answers[questions[currentQuestion - 1]?.id] ?? null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-serenity-light border border-serenity/20 mb-4">
                <Brain className="w-4 h-4 text-serenity" />
                <span className="text-sm font-medium text-serenity">Mental Health Assessment</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                Understand Your Wellbeing
              </h1>
              <p className="text-muted-foreground">
                Answer honestly - this helps us provide personalized guidance
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="p-6 md:p-8 border-0 shadow-medium bg-card">
              <div className="mb-2">
                <span className="text-xs font-medium text-calm bg-calm-light px-3 py-1 rounded-full">
                  {question.category}
                </span>
              </div>
              
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6 mt-4">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option.score)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedOption === option.score
                        ? "border-calm bg-calm-light"
                        : "border-border hover:border-calm/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedOption === option.score
                            ? "border-calm bg-calm"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {selectedOption === option.score && (
                          <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="calm"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                >
                  {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-6">
              This assessment is for informational purposes only and is not a clinical diagnosis.
              Please consult a mental health professional for proper evaluation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;

import { useState } from "react";
import { Heart, Sparkles, Users, QrCode, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const donationAmounts = [10, 25, 50, 100, 250, 500];

const impactStats = [
  { icon: Users, label: "Orphanages Supported", value: "24+" },
  { icon: Heart, label: "Lives Touched", value: "1,200+" },
  { icon: Sparkles, label: "Smiles Created", value: "10,000+" },
];

const Donations = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleDonate = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount;
    if (!amount || amount <= 0) {
      toast({
        title: "Please select an amount",
        description: "Choose a donation amount to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Thank you for your kindness! 💖",
        description: `Your $${amount} donation will bring joy to children in need.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Spread Love, Gain Happiness</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kindness <span className="text-primary">Scanner</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every donation brings warmth to a child's heart. Your kindness today 
            becomes their smile tomorrow. Spreading happiness is gaining happiness.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scanner Card */}
        <div className="max-w-xl mx-auto">
          <Card className="bg-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-primary" />
                </div>
                <span>Donation Scanner</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Scanner Display */}
              <div className="relative aspect-square max-w-[280px] mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-4 border-2 border-dashed border-primary/30">
                <div className={`absolute inset-4 rounded-xl overflow-hidden ${isScanning ? 'animate-pulse' : ''}`}>
                  {/* QR Code Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className={`w-24 h-24 mx-auto mb-4 ${isScanning ? 'text-primary animate-bounce' : 'text-muted-foreground/50'}`} />
                      <p className="text-sm text-muted-foreground">
                        {isScanning ? "Processing your kindness..." : "Scan to donate"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Scanning Animation Overlay */}
                {isScanning && (
                  <div className="absolute inset-4 rounded-xl overflow-hidden">
                    <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                  </div>
                )}
                
                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary rounded-br-lg" />
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Select Amount</p>
                <div className="grid grid-cols-3 gap-3">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        selectedAmount === amount && !customAmount
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-8 pr-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <Button 
                onClick={handleDonate}
                disabled={isScanning}
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Spreading Kindness...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Donate & Spread Joy
                    <ChevronRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              {/* Trust Badge */}
              <p className="text-xs text-center text-muted-foreground">
                🔒 100% of donations go directly to orphanages. 
                <br />Spreading happiness is gaining happiness. 💖
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe every child deserves to feel loved and valued. Through your donations, 
            we partner with orphanages to provide essential needs, educational resources, 
            and most importantly—moments of joy. When you give, you don't just donate money; 
            you share a piece of your heart.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donations;

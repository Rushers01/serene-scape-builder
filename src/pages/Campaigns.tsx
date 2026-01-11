import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Globe,
  Building2,
  GraduationCap,
  Calendar,
  MapPin,
  Users,
  Heart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  Handshake,
  School,
  Landmark,
  Megaphone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: number;
  title: string;
  organization: string;
  type: "school" | "college" | "ngo" | "corporate";
  location: string;
  date: string;
  participants: number;
  status: "upcoming" | "ongoing" | "completed";
  description: string;
  image: string;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Mental Health Week at Delhi University",
    organization: "Delhi University",
    type: "college",
    location: "New Delhi, India",
    date: "Feb 15-21, 2026",
    participants: 5000,
    status: "upcoming",
    description: "A week-long awareness campaign featuring workshops, expert talks, and peer support sessions.",
    image: "🎓",
  },
  {
    id: 2,
    title: "Youth Wellness Initiative",
    organization: "WHO Partnership",
    type: "ngo",
    location: "Global - 50+ Countries",
    date: "March 2026",
    participants: 100000,
    status: "upcoming",
    description: "Global campaign to promote mental health awareness among youth aged 15-25.",
    image: "🌍",
  },
  {
    id: 3,
    title: "Student Stress Management",
    organization: "Sunrise High School",
    type: "school",
    location: "Mumbai, India",
    date: "Jan 10, 2026",
    participants: 800,
    status: "completed",
    description: "Interactive session on managing academic stress and building resilience.",
    image: "📚",
  },
  {
    id: 4,
    title: "Corporate Wellness Program",
    organization: "TechCorp Global",
    type: "corporate",
    location: "San Francisco, USA",
    date: "Ongoing",
    participants: 2500,
    status: "ongoing",
    description: "Monthly mental health check-ins and resources for employees.",
    image: "💼",
  },
  {
    id: 5,
    title: "Rural Mental Health Outreach",
    organization: "Mind Matters NGO",
    type: "ngo",
    location: "Karnataka, India",
    date: "Feb 1-28, 2026",
    participants: 15000,
    status: "upcoming",
    description: "Bringing mental health awareness and resources to underserved rural communities.",
    image: "🏡",
  },
];

const partnerTypes = [
  { id: "school", label: "School", icon: School, color: "bg-warmth-light text-warmth" },
  { id: "college", label: "College/University", icon: GraduationCap, color: "bg-serenity-light text-serenity" },
  { id: "ngo", label: "NGO/Non-profit", icon: Heart, color: "bg-nature-light text-nature" },
  { id: "corporate", label: "Corporate", icon: Building2, color: "bg-calm-light text-calm" },
];

const Campaigns = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"browse" | "partner">("browse");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    contactName: "",
    email: "",
    location: "",
    message: "",
  });

  const filteredCampaigns = selectedType === "all" 
    ? campaigns 
    : campaigns.filter(c => c.type === selectedType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.orgName || !formData.email || !formData.orgType) {
      toast({
        title: "Please fill required fields",
        description: "Organization name, type, and email are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Partnership Request Submitted!",
      description: "We'll reach out to you within 2-3 business days.",
    });
    
    setFormData({
      orgName: "",
      orgType: "",
      contactName: "",
      email: "",
      location: "",
      message: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-calm-light text-calm";
      case "ongoing": return "bg-nature-light text-nature";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "school": return School;
      case "college": return GraduationCap;
      case "ngo": return Heart;
      case "corporate": return Building2;
      default: return Landmark;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-calm-light border border-calm/20 mb-4">
              <Globe className="w-4 h-4 text-calm" />
              <span className="text-sm font-medium text-calm">Global Impact</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Mental Health Campaigns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with NGOs, schools, and organizations worldwide to spread mental health awareness and make a difference.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: Megaphone, label: "Active Campaigns", value: "150+" },
              { icon: Globe, label: "Countries", value: "75+" },
              { icon: Users, label: "Lives Impacted", value: "2M+" },
              { icon: Handshake, label: "Partner Organizations", value: "500+" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-4 text-center border-0 shadow-soft">
                <stat.icon className="w-6 h-6 text-calm mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-2 mb-8 justify-center">
              <Button
                variant={activeTab === "browse" ? "calm" : "outline"}
                size="lg"
                onClick={() => setActiveTab("browse")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Browse Campaigns
              </Button>
              <Button
                variant={activeTab === "partner" ? "calm" : "outline"}
                size="lg"
                onClick={() => setActiveTab("partner")}
              >
                <Handshake className="w-4 h-4 mr-2" />
                Become a Partner
              </Button>
            </div>

            {activeTab === "browse" ? (
              <>
                {/* Filter */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                  <button
                    onClick={() => setSelectedType("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedType === "all" ? "bg-calm text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    All Campaigns
                  </button>
                  {partnerTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                        selectedType === type.id ? "bg-calm text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Campaigns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <Card key={campaign.id} className="overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all group">
                        <div className="h-32 gradient-calm flex items-center justify-center text-5xl">
                          {campaign.image}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                            <TypeIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-calm transition-colors">
                            {campaign.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {campaign.description}
                          </p>
                          <div className="space-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {campaign.organization}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {campaign.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {campaign.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {campaign.participants.toLocaleString()} participants
                            </div>
                          </div>
                          <Button variant="outline" className="w-full group-hover:bg-calm group-hover:text-primary-foreground group-hover:border-calm transition-all">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* CTA */}
                <Card className="mt-12 p-8 md:p-12 gradient-serenity text-primary-foreground text-center border-0">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                    Want to Host a Campaign?
                  </h2>
                  <p className="mb-6 opacity-90 max-w-lg mx-auto">
                    Partner with us to bring mental health awareness to your institution or community.
                  </p>
                  <Button 
                    variant="glass" 
                    size="lg"
                    onClick={() => setActiveTab("partner")}
                    className="bg-primary-foreground/20 hover:bg-primary-foreground/30"
                  >
                    Become a Partner
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </>
            ) : (
              /* Partner Form */
              <Card className="max-w-2xl mx-auto p-6 md:p-8 border-0 shadow-medium">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">
                  Partner With Us
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Fill out the form below to start a mental health awareness campaign at your organization.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Partner Type Selection */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Organization Type *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {partnerTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, orgType: type.id })}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.orgType === type.id
                              ? "border-calm bg-calm-light"
                              : "border-border hover:border-calm/50"
                          }`}
                        >
                          <type.icon className={`w-6 h-6 mb-2 ${formData.orgType === type.id ? "text-calm" : "text-muted-foreground"}`} />
                          <p className="font-medium text-foreground">{type.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Organization Name *
                      </label>
                      <Input
                        placeholder="e.g., Delhi Public School"
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Contact Person
                      </label>
                      <Input
                        placeholder="Your name"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="contact@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Location
                      </label>
                      <Input
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tell us about your campaign goals
                    </label>
                    <Textarea
                      placeholder="Describe the type of campaign you'd like to run, expected participants, and any specific topics you want to cover..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px]"
                      maxLength={1000}
                    />
                  </div>

                  <Button type="submit" variant="calm" size="lg" className="w-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Submit Partnership Request
                  </Button>
                </form>

                {/* Benefits */}
                <div className="mt-10 pt-8 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4 text-center">What You Get as a Partner</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Free campaign materials & resources",
                      "Expert speaker sessions",
                      "Custom mental health assessments",
                      "Ongoing support & guidance",
                      "Impact reports & analytics",
                      "Community recognition",
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-nature flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Campaigns;

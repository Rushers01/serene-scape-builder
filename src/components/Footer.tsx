import { Leaf, Heart, Mail, Github, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    features: [
      { label: "Mood Tracking", href: "#mood" },
      { label: "Meditations", href: "#meditate" },
      { label: "Exercises", href: "#exercises" },
      { label: "Journal", href: "#" },
    ],
    resources: [
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
    community: [
      { label: "Blog", href: "#" },
      { label: "Stories", href: "#" },
      { label: "Events", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Stay Connected to Your Wellbeing
            </h3>
            <p className="text-muted-foreground mb-6">
              Get weekly tips, new meditations, and mindfulness practices delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-calm focus:border-transparent transition-all"
              />
              <Button variant="calm" className="h-12">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-calm flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-semibold text-foreground">
                MindEase
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Your companion on the journey to mental wellness. Find peace, build resilience, and thrive.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[Twitter, Instagram, Github].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-calm-light transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} MindEase. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-warmth fill-warmth" /> for your wellbeing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

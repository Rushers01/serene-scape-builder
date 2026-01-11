import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, LogIn, LogOut, User, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, signOut, loading } = useAuth();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Assessment", href: "/assessment" },
    { label: "Community", href: "/community" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "AI Chat", href: "/ai-chat", icon: MessageCircle },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-calm flex items-center justify-center shadow-soft group-hover:shadow-glow-calm transition-all duration-300">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl font-semibold text-foreground">
              MindEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === item.href 
                    ? "text-foreground bg-muted/50" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              <>
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={signOut}
                      className="gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button variant="calm" size="default" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.href 
                      ? "text-foreground bg-muted/50" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 px-4">
                {!loading && (
                  <>
                    {isAuthenticated ? (
                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Button>
                    ) : (
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="calm" className="w-full gap-2">
                          <LogIn className="w-4 h-4" />
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

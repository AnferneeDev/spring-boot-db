import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Trophy, Menu, X, BarChart3, Globe2, Timer, Shield, Gamepad2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "./FeatureCard";

const Badge = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div
    className={`inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-zinc-950/80 backdrop-blur-md border-zinc-800" : "bg-transparent border-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center transform rotate-3">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">PitchPerfect</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                How to Play
              </a>
              <div className="flex items-center gap-4 ml-4">
                <Button variant="ghost" className="text-zinc-300">
                  Log in
                </Button>
                <Button>Get Started</Button>
              </div>
            </div>

            <button className="md:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <Badge className="animate-fade-in">⚽ Pick your team. Play the match.</Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">Play a fantasy match</h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Draft your dream team and compete instantly. Simple rules, quick results, and pure football fun.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Button className="h-14 px-8 text-lg w-full sm:w-auto gap-3 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20">
                <Gamepad2 className="w-5 h-5" />
                Play vs AI
              </Button>
              <Button className="h-14 px-8 text-lg w-full sm:w-auto gap-3 bg-emerald-600 hover:bg-emerald-700">
                <Users className="w-5 h-5" />
                Play vs a Friend
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Quick & Simple</h2>
            <p className="text-zinc-400">No complex spreadsheets. Just pick your players and go.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<BarChart3 className="w-6 h-6 text-emerald-400" />} title="Simple Scoring" desc="Points for goals, assists, and clean sheets. Easy to understand." />
            <FeatureCard icon={<Timer className="w-6 h-6 text-blue-400" />} title="Instant Results" desc="Matches are simulated instantly based on real player stats." />
            <FeatureCard icon={<Globe2 className="w-6 h-6 text-purple-400" />} title="Global Leagues" desc="Climb the leaderboard and show off your football knowledge." />
            <FeatureCard icon={<Shield className="w-6 h-6 text-yellow-400" />} title="Fair Play" desc="Balanced matchmaking ensures every game is competitive." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Ready for kick off?</h2>
          <p className="text-xl text-zinc-400 mb-10">Join thousands of players in the simplest fantasy football game.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#hero" className="w-full sm:w-auto">
              <Button className="h-14 px-8 text-lg w-full bg-linear-to-r from-emerald-400/50 to-cyan-400/50 hover:bg-linear-to-r hover:from-emerald-400/70 hover:to-cyan-400/70">Start a Match Now</Button>
            </a>
            <span className="text-zinc-500 text-sm">No account needed for practice mode</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <Trophy className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-zinc-200">PitchPerfect</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Rules
            </a>
          </div>
          <div className="text-sm text-zinc-600">© 2025 PitchPerfect Fantasy.</div>
        </div>
      </footer>
    </div>
  );
}

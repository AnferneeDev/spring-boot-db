import React, { useState, useEffect } from "react";
import { Trophy, TrendingUp, Users, Shield, ArrowRight, Menu, X, Activity, BarChart3, Globe2, Timer } from "lucide-react";

// --- MOCK SHADCN UI COMPONENTS ---
// In your actual project, replace these with imports: import { Button } from "@/components/ui/button"

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20",
    outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100",
    ghost: "hover:bg-zinc-800 text-zinc-300 hover:text-white",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => <div className={`rounded-xl border border-zinc-800 bg-zinc-950/50 text-zinc-100 shadow-sm ${className}`}>{children}</div>;

const Badge = ({ children, className = "" }) => (
  <div
    className={`inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

// --- MAIN LANDING PAGE ---

export default function App() {
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
              <span className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">PitchPerfect</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                Features
              </a>
              <a href="#leagues" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                Leagues
              </a>
              <a href="#stats" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                Data
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
      <section className="relative pt-32 pb-20 lg:pt-15 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <Badge className="animate-fade-in">🚀 Season 2025/26 Pre-registration Open</Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Manage your squad like a <span className="text-emerald-500">Pro</span>.
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">The only fantasy platform powered by real-time xG, xA, and advanced heatmap analytics. Don't just watch the match—master the data.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button className="h-12 px-8 text-lg w-full sm:w-auto gap-2">
                Create Your Team <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="h-12 px-8 text-lg w-full sm:w-auto">
                View Demo
              </Button>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="mt-16 relative rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4 shadow-2xl shadow-emerald-900/20">
              <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mock Card 1 */}
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Top Performer</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg">🇧🇷</div>
                    <div>
                      <p className="font-semibold text-sm">G. Jesus</p>
                      <p className="text-xs text-zinc-500">Arsenal • FWD</p>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-zinc-900 rounded p-1">
                      <p className="text-[10px] text-zinc-500">xG</p>
                      <p className="font-mono text-emerald-400 text-sm">7.7</p>
                    </div>
                    <div className="bg-zinc-900 rounded p-1">
                      <p className="text-[10px] text-zinc-500">Gls</p>
                      <p className="font-mono text-white text-sm">5</p>
                    </div>
                    <div className="bg-zinc-900 rounded p-1">
                      <p className="text-[10px] text-zinc-500">Pts</p>
                      <p className="font-mono text-emerald-400 text-sm">42</p>
                    </div>
                  </div>
                </div>

                {/* Mock Card 2 */}
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 hidden md:flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">League Table</span>
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-500">1</span> FC Barcalona
                      </span>
                      <span className="font-mono">2,450</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2">
                        <span className="text-zinc-500">2</span> Madrid City
                      </span>
                      <span className="font-mono text-zinc-400">2,310</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-2">
                        <span className="text-zinc-500">3</span> Athletic United
                      </span>
                      <span className="font-mono text-zinc-400">2,180</span>
                    </div>
                  </div>
                </div>

                {/* Mock Card 3 */}
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 hidden md:flex flex-col gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Live Match</span>
                    <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs text-zinc-400">Gameweek 14</p>
                    <div className="flex justify-between items-center mt-2 font-bold text-lg">
                      <span>ARS</span>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-sm">2 - 0</span>
                      <span>WOL</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-2">Martinelli (54'), Saka (62')</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to win</h2>
            <p className="text-zinc-400">Stop guessing. Start using professional-grade data to draft your squad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<BarChart3 className="w-6 h-6 text-emerald-400" />} title="Advanced xG & xA" desc="Go beyond goals and assists. See who is actually performing with Expected Goals metrics." />
            <FeatureCard icon={<Timer className="w-6 h-6 text-blue-400" />} title="Live Updates" desc="Points update in real-time as the action happens on the pitch. No delays." />
            <FeatureCard icon={<Globe2 className="w-6 h-6 text-purple-400" />} title="Global Leagues" desc="Join public leagues or create private ones with custom scoring rules for your friends." />
            <FeatureCard icon={<Shield className="w-6 h-6 text-yellow-400" />} title="Fair Play System" desc="Our anti-cheat algorithms ensure a fair transfer market and clean competition." />
          </div>
        </div>
      </section>

      {/* Stats Teaser Section */}
      <section id="stats" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">New Feature</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Smart Transfer Market</h2>
              <p className="text-zinc-400 text-lg">Our algorithm analyzes thousands of data points—from heat maps to injury risks—to suggest the perfect replacement for your injured striker.</p>
              <ul className="space-y-4 pt-4">
                {["Price prediction algorithms", "Injury risk assessment", "Upcoming fixture difficulty rating"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-emerald-500" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="mt-4">
                Explore Market Data
              </Button>
            </div>

            {/* Visual element representing the table data */}
            <div className="flex-1 w-full">
              <Card className="p-0 overflow-hidden bg-zinc-900/80 border-zinc-800">
                <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
                  <span className="font-semibold">Transfer Targets</span>
                  <Activity className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="divide-y divide-zinc-800">
                  <PlayerRow name="B. Saka" team="ARS" pos="FW" value="£9.8m" trend="+0.4" />
                  <PlayerRow name="E. Haaland" team="MCI" pos="FW" value="£14.2m" trend="+0.1" />
                  <PlayerRow name="M. Salah" team="LIV" pos="MF" value="£12.5m" trend="-0.2" />
                  <PlayerRow name="K. Trippier" team="NEW" pos="DF" value="£6.4m" trend="+0.1" />
                  <PlayerRow name="M. Rashford" team="MUN" pos="FW" value="£8.1m" trend="+0.3" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Ready to build your dynasty?</h2>
          <p className="text-xl text-zinc-400 mb-10">Join over 50,000 managers competing for glory. It's free to start.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="h-14 px-8 text-lg w-full sm:w-auto">Get Started for Free</Button>
            <span className="text-zinc-500 text-sm">No credit card required</span>
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
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
          <div className="text-sm text-zinc-600">© 2025 PitchPerfect Fantasy.</div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components for cleaner code
function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="p-6 bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/50 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 text-zinc-100">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </Card>
  );
}

function PlayerRow({ name, team, pos, value, trend }) {
  const isPositive = trend.startsWith("+");
  return (
    <div className="px-6 py-3 flex items-center justify-between hover:bg-zinc-900/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">{name.charAt(0)}</div>
        <div>
          <p className="font-medium text-sm text-zinc-200">{name}</p>
          <p className="text-xs text-zinc-500">
            {team} • {pos}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm text-zinc-300">{value}</p>
        <p className={`text-xs font-medium ${isPositive ? "text-emerald-500" : "text-red-500"}`}>{trend}</p>
      </div>
    </div>
  );
}

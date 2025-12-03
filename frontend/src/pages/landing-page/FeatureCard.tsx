import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <Card className="p-6 bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/50 transition-all duration-300 group text-zinc-100">
      <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 text-zinc-100">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </Card>
  );
}

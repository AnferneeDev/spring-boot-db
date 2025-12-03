import { FORMATIONS, Formation } from "@/utils/formations";
import { cn } from "@/lib/utils";

interface FormationSelectorProps {
  selected: string;
  onChange: (formation: Formation) => void;
}

export function FormationSelector({ selected, onChange }: FormationSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {FORMATIONS.map((formation) => (
        <button
          key={formation.name}
          onClick={() => onChange(formation)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
            "hover:scale-105 active:scale-95",
            selected === formation.name ? "bg-primary text-primary-foreground shadow-glow" : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
          )}
        >
          {formation.label}
        </button>
      ))}
    </div>
  );
}

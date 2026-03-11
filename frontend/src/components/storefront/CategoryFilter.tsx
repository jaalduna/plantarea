import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedId: number | undefined;
  onSelect: (id: number | undefined) => void;
}

export function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(undefined)}
        className={cn(
          "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
          selectedId === undefined
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
        )}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
            selectedId === cat.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          {cat.icon && <span className="mr-1">{cat.icon}</span>}
          {cat.name}
        </button>
      ))}
    </div>
  );
}

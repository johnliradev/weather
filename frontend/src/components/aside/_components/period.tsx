import { Calendar } from "lucide-react";
import { useSearch } from "../../../context/search-context";

const periodOptions = [
  { label: "Today", value: 0 },
  { label: "Tomorrow", value: 1 },
  { label: "3 Days", value: 3 },
  { label: "7 Days", value: 7 },
];

export const Period = () => {
  const { periodOption, setPeriodOption } = useSearch();
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="uppercase text-xs text-muted-foreground font-medium">
          Period
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {periodOptions.map((option) => (
          <button
            key={option.value}
            className={`h-11 rounded border text-sm font-medium transition-colors
              ${
                periodOption === option.value
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-muted text-zinc-900 border-zinc-300 hover:border-zinc-400"
              }
              `}
            onClick={() => setPeriodOption(option.value as any)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

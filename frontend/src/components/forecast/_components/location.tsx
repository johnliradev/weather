import { Calendar } from "lucide-react";
import { useForecast } from "../../../context/forecast-context";
import { useSearch } from "../../../context/search-context";

export const Location = () => {
  const { forecast } = useForecast();
  const { periodOption } = useSearch();

  const getPeriodLabel = (option: number) => {
    if (option === 0) return "Today";
    if (option === 1) return "Tomorrow";
    if (option === 3) return "Next 3 Days";
    if (option === 7) return "Next 7 Days";
    return `Next ${option} Days`;
  };

  return (
    <div className="px-6 py-8  rounded-t flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-black leading-tight">
        {forecast?.resolvedAddress || <span className="text-zinc-400">—</span>}
      </h1>
      <div className="flex items-center gap-2 mt-1">
        <Calendar className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
        <span className="text-zinc-500 text-base">
          {getPeriodLabel(periodOption)}
        </span>
      </div>
    </div>
  );
};

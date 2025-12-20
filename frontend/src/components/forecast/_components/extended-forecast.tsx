import React from "react";
import { useForecast } from "../../../context/forecast-context";
import { useSearch } from "../../../context/search-context";
import { formatTemperature } from "../../../utils/unit-converter";

function formatDay(dateStr: string): string {
  // Parse a data como local (YYYY-MM-DD) para evitar problemas de timezone
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export const ExtendedForecast: React.FC = () => {
  const { forecast } = useForecast();
  const { periodOption, unit } = useSearch();

  if (!forecast || !forecast.days || !forecast.days.length) return null;

  // Garantir que temos dias suficientes (precisa de pelo menos periodOption + 1 dias)
  if (forecast.days.length < periodOption + 1) {
    return null;
  }

  // Para 3 ou 7 dias, sempre pula o primeiro dia (hoje, índice 0) e pega os próximos periodOption dias
  // periodOption = 3 → slice(1, 4) → índices 1, 2, 3 (3 dias após hoje)
  // periodOption = 7 → slice(1, 8) → índices 1 até 7 (7 dias após hoje)
  const days = forecast.days.slice(1, 1 + periodOption);

  return (
    <section className="flex flex-col gap-4 px-4">
      <span className="font-medium text-zinc-500 text-sm block px-2">
        EXTENDED FORECAST
      </span>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scroll-smooth">
        {days.map((day: any, index: number) => (
          <div
            className="rounded border border-zinc-200 bg-white px-4 py-3 flex justify-between items-center min-h-[70px]"
            key={`${day.datetime}-${index}`}
          >
            <div>
              <div className="font-medium text-sm text-black">
                {formatDay(day.datetime)}
              </div>
              <div className="text-xs text-zinc-400 mt-1">{day.conditions}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-zinc-700">
                {formatTemperature(day.temp, unit)}
              </span>
              <span className="font-medium text-zinc-400 text-xs mt-1">
                {`${formatTemperature(day.tempmin, unit)} / ${formatTemperature(
                  day.tempmax,
                  unit
                )}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

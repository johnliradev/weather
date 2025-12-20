import React from "react";
import { useForecast } from "../../../context/forecast-context";
import { useSearch } from "../../../context/search-context";

function formatDay(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export const ExtendedForecast: React.FC = () => {
  const { forecast } = useForecast();
  const { periodOption } = useSearch();

  if (!forecast || !forecast.days || !forecast.days.length) return null;

  const days = forecast.days.slice(0, periodOption);

  return (
    <section className="flex flex-col gap-4 px-4">
      <span className="font-medium text-zinc-500 text-sm block px-2">
        EXTENDED FORECAST
      </span>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scroll-smooth">
        {days.map((day: any) => (
          <div
            className="rounded border border-zinc-200 bg-white px-4 py-3 flex justify-between items-center min-h-[70px]"
            key={day.datetime}
          >
            <div>
              <div className="font-medium text-sm text-black">
                {formatDay(day.datetime)}
              </div>
              <div className="text-xs text-zinc-400 mt-1">{day.conditions}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-zinc-700">
                {Math.round(day.temp)}°C
              </span>
              <span className="font-medium text-zinc-400 text-xs mt-1">
                {`${Math.round(day.tempmin)}° / ${Math.round(day.tempmax)}°`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

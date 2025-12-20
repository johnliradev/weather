import { Cloud, Eye, ThermometerSnowflake, ThermometerSun } from "lucide-react";
import { useForecast } from "../../../context/forecast-context";

export const AdditionalDetails = () => {
  const { forecast } = useForecast();

  if (!forecast || !forecast.days.length) return null;

  const day = forecast.days[0];

  const details = [
    {
      label: "Max Temperature",
      value: `${Math.round(day.tempmax)}°C`,
      icon: <ThermometerSun className="w-4 h-4 text-zinc-400" />,
    },
    {
      label: "Visibility",
      value: `${day.visibility} km`,
      icon: <Eye className="w-4 h-4 text-zinc-400" />,
    },
    {
      label: "Min Temperature",
      value: `${Math.round(day.tempmin)}°C`,
      icon: <ThermometerSnowflake className="w-4 h-4 text-zinc-400" />,
    },
    {
      label: "Clouds",
      value: `${Math.round(day.cloudcover)}%`,
      icon: <Cloud className="w-4 h-4 text-zinc-400" />,
    },
  ];

  return (
    <div className="rounded border border-zinc-300 bg-white px-6 py-5 mb-4">
      <span className="font-medium text-zinc-500 text-sm">
        ADDITIONAL DETAILS
      </span>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex justify-between items-center border-b border-zinc-300"
          >
            <span className="text-zinc-500 text-sm flex items-center gap-2">
              {detail.icon}
              {detail.label}
            </span>
            <span className="font-medium text-zinc-700">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

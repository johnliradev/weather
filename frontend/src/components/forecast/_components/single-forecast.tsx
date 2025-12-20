import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react";
import { useForecast } from "../../../context/forecast-context";
import { CardForecast } from "./card-forecast";
import { AdditionalDetails } from "./additional-details";
import { useSearch } from "../../../context/search-context";
import { formatTemperature, formatWindSpeed } from "../../../utils/unit-converter";

export const SingleForecast = () => {
  // If prop not passed, get from context
  const { forecast } = useForecast();
  const { periodOption, unit } = useSearch();

  // Defensive fallback
  if (!forecast || !forecast.days.length) return null;

  const day = forecast.days[periodOption] ?? forecast.days[0];

  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature Card */}
        <CardForecast
          title={"TEMPERATURE"}
          icon={<Thermometer className="w-4 h-4 text-zinc-400" />}
          content={formatTemperature(day.temp, unit)}
          footer={day.conditions}
        />
        {/* Humidity Card */}
        <CardForecast
          title={"HUMIDITY"}
          icon={<Droplets className="w-4 h-4 text-zinc-400" />}
          content={`${Math.round(day.humidity)}%`}
          footer={"Relative humidity"}
        />
        {/* Wind Card */}
        <CardForecast
          title={"WIND"}
          icon={<Wind className="w-4 h-4 text-zinc-400" />}
          content={formatWindSpeed(day.windspeed, unit)}
          footer={"Wind speed"}
        />
        {/* Rain Card */}
        <CardForecast
          title={"RAIN"}
          icon={<CloudRain className="w-4 h-4 text-zinc-400" />}
          content={`${Math.round(day.precipprob)}%`}
          footer={`${day.precip}mm expected`}
        />
      </div>
      <AdditionalDetails />
    </section>
  );
};

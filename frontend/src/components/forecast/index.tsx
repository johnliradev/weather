import { Cloud } from "lucide-react";
import { useForecast } from "../../context/forecast-context";
import { useSearch } from "../../context/search-context";
import { Location } from "./_components/location";
import { ResponseStatus } from "./_components/response-status";
import { SingleForecast } from "./_components/single-forecast";
import { ExtendedForecast } from "./_components/extended-forecast";

export const Forecast = () => {
  const { forecast, loading } = useForecast();
  const { periodOption } = useSearch();

  const isSingleDay = periodOption === 0 || periodOption === 1;

  return (
    <div className="w-2/3 flex flex-col bg-zinc-50 rounded ">
      <ResponseStatus />
      {loading ? (
        <div className="flex flex-col items-center justify-center flex-1 py-16 gap-4 animate-pulse">
          <Cloud className="text-zinc-400 w-12 h-12 animate-spin" />
          <h2 className="text-xl font-semibold text-zinc-700">
            Loading forecast...
          </h2>
          <p className="text-zinc-500 text-center max-w-xs">
            Retrieving the latest weather data. Please wait.
          </p>
        </div>
      ) : forecast ? (
        <>
          <Location />
          {isSingleDay ? <SingleForecast /> : <ExtendedForecast />}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 py-16 gap-4">
          <Cloud />
          <h2 className="text-xl font-semibold text-zinc-700">
            No forecast data
          </h2>
          <p className="text-zinc-500 text-center max-w-xs">
            Search for a city and select a period to see the weather forecast
            here.
          </p>
        </div>
      )}
    </div>
  );
};

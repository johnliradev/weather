import { createContext, useContext, useState, type ReactNode } from "react";
import { useSearch } from "./search-context";
import { api } from "../services/api";

type Hour = {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  preciptype: string[] | null;
  snow: number | null;
  snowdepth: number | null;
  windgust: number | null;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations: string[] | null;
  source: string;
};

type Day = {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: string[] | null;
  snow: number;
  snowdepth: number | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations: string[];
  source: string;
  hours: Hour[];
};

type Station = {
  distance: number;
  latitude: number;
  longitude: number;
  useCount: number;
  id: string;
  name: string;
  quality: number;
  contribution: number;
};

type CurrentConditions = {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number | null;
  precipprob: number;
  preciptype: string[] | null;
  snow: number;
  snowdepth: number;
  windgust: number | null;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  conditions: string;
  icon: string;
  stations: string[];
  source: string;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
};

type Forecast = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: Day[];
  alerts: unknown[];
  stations: Record<string, Station>;
  currentConditions: CurrentConditions;
};

type ForecastContextType = {
  forecast: Forecast | null;
  setForecast: (forecast: Forecast | null) => void;
  getForecast: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  fromCache: boolean | null;
  responseTime: number | null;
  statusCode: number | null;
};

const ForecastContext = createContext<ForecastContextType | undefined>(
  undefined
);

export const ForecastProvider = ({ children }: { children: ReactNode }) => {
  const { city } = useSearch();
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState<boolean | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const getForecast = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getForecast(city);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatusCode(response.statusCode ?? null);
      setFromCache(response.fromCache ?? null);
      setResponseTime(response.responseTime ?? null);

      if (response.ok && response.data) {
        setForecast(response.data);
        setError(null);
      } else {
        setForecast(null);
        setError(
          response.error?.message ||
            `Error ${response.statusCode}: ${getStatusMessage(
              response.statusCode
            )}`
        );
      }
    } catch (err) {
      setForecast(null);
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatusCode(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForecastContext.Provider
      value={{
        forecast,
        setForecast,
        getForecast,
        loading,
        setLoading,
        error,
        setError,
        fromCache,
        responseTime,
        statusCode,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};

function getStatusMessage(code: number): string {
  const messages: Record<number, string> = {
    200: "OK",
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    404: "NOT_FOUND",
    429: "TOO_MANY_REQUESTS",
    500: "INTERNAL_SERVER_ERROR",
  };
  return messages[code] || "UNKNOWN_ERROR";
}

export const useForecast = () => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error("useForecast must be used within a ForecastProvider");
  }
  return context;
};

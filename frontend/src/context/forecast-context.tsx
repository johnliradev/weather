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
};

const ForecastContext = createContext<ForecastContextType | undefined>(
  undefined
);

export const ForecastProvider = ({ children }: { children: ReactNode }) => {
  const { city } = useSearch();
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getForecast = async () => {
    setLoading(true);
    const response = await api.getForecast(city);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setForecast(response.data);
    setLoading(false);
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
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};

export const useForecast = () => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error("useForecast must be used within a ForecastProvider");
  }
  return context;
};

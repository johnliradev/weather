import { createContext, useContext, useState, type ReactNode } from "react";

export type Unit = "metric" | "us" | "uk";

type SearchContextType = {
  city: string;
  periodOption: number;
  unit: Unit;
  setCity: (city: string) => void;
  setPeriodOption: (days: number) => void;
  setUnit: (unit: Unit) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("");
  const [periodOption, setPeriodOption] = useState<number>(0);
  const [unit, setUnit] = useState<Unit>("metric");
  return (
    <SearchContext.Provider
      value={{ city, setCity, periodOption, setPeriodOption, unit, setUnit }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

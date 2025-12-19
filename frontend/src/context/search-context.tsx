import { createContext, useContext, useState, type ReactNode } from "react";

type PeriodOption = "today" | "tomorrow" | "3days" | "7days";
type SearchContextType = {
  city: string;
  periodOption: PeriodOption;
  setCity: (city: string) => void;
  setPeriodOption: (option: PeriodOption) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("");
  const [periodOption, setPeriodOption] = useState<PeriodOption>("today");
  return (
    <SearchContext.Provider
      value={{ city, setCity, periodOption, setPeriodOption }}
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

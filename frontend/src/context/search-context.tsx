import { createContext, useContext, useState, type ReactNode } from "react";

type SearchContextType = {
  city: string;
  periodOption: number;
  setCity: (city: string) => void;
  setPeriodOption: (days: number) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("");
  const [periodOption, setPeriodOption] = useState<number>(0);
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

import { MapPin } from "lucide-react";
import { useSearch } from "../../../context/search-context";

const examples = [
  { city: "Tokyo", country: "JP" },
  { city: "Rio de Janeiro", country: "BR" },
  { city: "London", country: "GB" },
  { city: "New York", country: "US" },
];

export const Examples = () => {
  const { setCity } = useSearch();
  return (
    <div>
      <p className="uppercase text-xs text-muted-foreground font-medium mb-4">
        Examples
      </p>
      <div className="flex flex-col gap-2">
        {examples.map(({ city, country }) => (
          <button
            key={city}
            type="button"
            onClick={() => setCity(city)}
            className="cursor-pointer flex items-center justify-between w-full h-12 px-3 rounded border border-zinc-200 bg-white transition-shadow hover:shadow-sm"
          >
            <span className="flex items-center gap-2 text-zinc-900 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {city}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {country}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

import { useSearch } from "../../../context/search-context";

export const Search = () => {
  const { city, setCity } = useSearch();
  return (
    <div>
      <p className="uppercase text-xs text-muted-foreground font-medium mb-4">
        Location
      </p>
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">City</label>
        <input
          placeholder="e.g.: São Paulo, London, Tokyo"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-9 w-full rounded border border-zinc-400 bg-muted px-3 text-sm outline-none"
        />
      </div>
    </div>
  );
};

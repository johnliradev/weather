import { useSearch, type Unit } from "../../../context/search-context";

const units: { value: Unit; label: string }[] = [
  { value: "metric", label: "Celsius" },
  { value: "us", label: "Fahrenheit" },
];

export const UnitSelector = () => {
  const { unit, setUnit } = useSearch();

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-zinc-500 font-medium">Unit:</label>
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value as Unit)}
        className="px-3 py-1.5 text-sm border border-zinc-300 rounded bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent cursor-pointer"
      >
        {units.map((u) => (
          <option key={u.value} value={u.value}>
            {u.label}
          </option>
        ))}
      </select>
    </div>
  );
};

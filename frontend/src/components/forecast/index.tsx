import { useSearch } from "../../context/search-context";

export const Forecast = () => {
  const { city, periodOption } = useSearch();
  return (
    <div className="w-2/3 flex flex-col items-center justify-center bg-white p-8 rounded-lg">
      <p className="font-code font-bold">Forecast</p>
      <p>
        Looking for <span className="font-code font-bold ">{city}</span>
      </p>
      <p>On period ( {periodOption} ) </p>
    </div>
  );
};

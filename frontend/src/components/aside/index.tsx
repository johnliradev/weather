import { Cloud } from "lucide-react";
import { Examples } from "./_components/examples";
import { Period } from "./_components/period";
import { Search } from "./_components/search";

export const Aside = () => {
  return (
    <aside className="w-1/3 flex flex-col  gap-4 bg-white p-8 rounded-lg">
      {/* "Logo" */}
      <div className="flex items-center  gap-1 ">
        <Cloud />
        <p className="font-medium">Weather</p>
      </div>
      <hr className="text-zinc-300" />
      <Search />
      <Period />
      <button
        type="button"
        className="w-full h-12 rounded bg-zinc-400 text-white font-medium text-base mt-4"
      >
        Search Forecast
      </button>
      <hr className="text-zinc-300" />
      <Examples />
    </aside>
  );
};

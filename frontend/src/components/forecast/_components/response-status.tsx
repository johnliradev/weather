import { useForecast } from "../../../context/forecast-context";

export const ResponseStatus = () => {
  const { forecast } = useForecast();
  // TODO: Personalize isso

  return (
    <div className="flex justify-between items-center border-b border-zinc-300 rounded-t bg-white px-6 py-4 font-code">
      <span className="text-zinc-500 text-sm font-medium">RESPONSE</span>
      <p className="text-sm">TODO</p>

      <div className="flex gap-2 items-center">
        {forecast ? (
          <>
            <span className="text-xs font-medium text-black bg-zinc-200 rounded px-2 py-0.5">
              604 ms
            </span>
            <span className="text-xs text-blue-600 bg-blue-200 rounded px-2 py-0.5">
              Saved on Redis
            </span>
            <span className="text-xs font-medium text-purple-700 bg-purple-300 rounded px-2 py-0.5">
              Retrieved from Redis
            </span>
            <span className="text-xs font-medium text-green-700 bg-green-100 rounded px-2 py-0.5">
              200 OK
            </span>
          </>
        ) : (
          <span className="text-xs font-medium text-zinc-600 bg-zinc-200 rounded px-2 py-0.5">
            Waiting
          </span>
        )}
      </div>
    </div>
  );
};

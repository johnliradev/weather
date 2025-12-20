import { useForecast } from "../../../context/forecast-context";

function getStatusColor(code: number): string {
  if (code >= 200 && code < 300) return "text-green-700 bg-green-100";
  if (code >= 400 && code < 500) return "text-red-700 bg-red-100";
  if (code >= 500) return "text-orange-700 bg-orange-100";
  return "text-zinc-700 bg-zinc-200";
}

function getStatusLabel(code: number): string {
  const labels: Record<number, string> = {
    200: "200 OK",
    400: "400 BAD_REQUEST",
    401: "401 UNAUTHORIZED",
    404: "404 NOT_FOUND",
    429: "429 TOO_MANY_REQUESTS",
    500: "500 INTERNAL_SERVER_ERROR",
  };
  return labels[code] || `${code} ERROR`;
}

export const ResponseStatus = () => {
  const { forecast, fromCache, responseTime, statusCode, error } =
    useForecast();

  return (
    <div className="flex justify-between items-center border-b border-zinc-300 rounded-t bg-white px-6 py-4 font-code">
      <span className="text-zinc-500 text-sm font-medium">RESPONSE</span>

      <div className="flex gap-2 items-center">
        {statusCode !== null ? (
          <>
            {responseTime !== null && (
              <span className="text-xs font-medium text-black bg-zinc-200 rounded px-2 py-0.5">
                {responseTime} ms
              </span>
            )}
            {fromCache !== null && forecast && (
              <>
                {fromCache ? (
                  <span className="text-xs font-medium text-purple-700 bg-purple-300 rounded px-2 py-0.5">
                    Retrieved from Redis
                  </span>
                ) : (
                  <span className="text-xs text-blue-600 bg-blue-200 rounded px-2 py-0.5">
                    Saved on Redis
                  </span>
                )}
              </>
            )}
            <span
              className={`text-xs font-medium rounded px-2 py-0.5 ${getStatusColor(
                statusCode
              )}`}
            >
              {getStatusLabel(statusCode)}
            </span>
            {error && (
              <span className="text-xs font-medium text-red-600 bg-red-50 rounded px-2 py-0.5">
                {error}
              </span>
            )}
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

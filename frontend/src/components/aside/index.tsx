import { useEffect, useRef, useState } from "react";
import { Cloud } from "lucide-react";
import { Examples } from "./_components/examples";
import { Period } from "./_components/period";
import { Search } from "./_components/search";
import { useForecast } from "../../context/forecast-context";
import { useSearch } from "../../context/search-context";

export const Aside = () => {
  const { getForecast, loading, error, statusCode } = useForecast();
  const { city } = useSearch();
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [buttonMessage, setButtonMessage] = useState("Search Forecast");
  const lastCity = useRef(city);

  // Restaura estado se city mudar
  useEffect(() => {
    if (lastCity.current !== city) {
      setButtonState("idle");
      setButtonMessage("Search Forecast");
      lastCity.current = city;
    }
  }, [city]);

  // Monitora loading e altera para success ou error depois da consulta
  useEffect(() => {
    if (!loading && buttonState === "loading") {
      if (error) {
        setButtonState("error");

        // Modificação: mensagem para código 400 orientando o usuário
        setButtonMessage(
          statusCode === 404
            ? "Not found"
            : statusCode === 401
            ? "Unauthorized"
            : statusCode === 429
            ? "Too many requests"
            : statusCode === 400
            ? "Request error. Please check if the city name is correct."
            : "Error"
        );
      } else {
        setButtonState("success");
        setButtonMessage("Located!");
      }
    }
  }, [loading, error, statusCode, buttonState]);

  const onSearchClick = async () => {
    if (!city) return;
    setButtonState("loading");
    setButtonMessage("Searching...");
    await getForecast();
    // the useEffect above will update state after loading changes
  };

  let btnClass =
    "w-full h-12 rounded text-white font-medium text-base mt-4 transition-colors duration-200 flex items-center justify-center";
  if (!city) {
    btnClass += " bg-zinc-400 cursor-not-allowed opacity-60";
  } else if (buttonState === "success") {
    btnClass += " bg-green-600 hover:bg-green-700";
  } else if (buttonState === "error") {
    btnClass += " bg-red-500 hover:bg-red-600";
  } else if (buttonState === "loading") {
    btnClass += " bg-black cursor-wait";
  } else {
    btnClass += " bg-black hover:bg-zinc-900";
  }

  return (
    <aside className="w-1/3 flex flex-col gap-4 bg-white p-8 rounded-lg">
      {/* "Logo" */}
      <div className="flex items-center gap-1 ">
        <Cloud />
        <p className="font-medium">Weather</p>
      </div>
      <hr className="text-zinc-300" />
      <Search />
      <Period />
      <button
        type="button"
        onClick={onSearchClick}
        disabled={!city || buttonState === "loading"}
        className={btnClass}
      >
        {buttonState === "loading" && (
          <svg
            className="animate-spin mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-30"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {buttonMessage}
      </button>
      <hr className="text-zinc-300" />
      <Examples />
    </aside>
  );
};

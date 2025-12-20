import type { Unit } from "../context/search-context";

export const convertTemperature = (celsius: number, unit: Unit): number => {
  if (unit === "metric") {
    return celsius;
  }
  // US e UK usam Fahrenheit
  return (celsius * 9) / 5 + 32;
};

export const getTemperatureSymbol = (unit: Unit): string => {
  if (unit === "metric") {
    return "°C";
  }
  return "°F";
};

export const convertWindSpeed = (kmh: number, unit: Unit): number => {
  if (unit === "metric") {
    return kmh;
  }
  // US e UK usam mph (miles per hour)
  return kmh * 0.621371;
};

export const getWindSpeedUnit = (unit: Unit): string => {
  if (unit === "metric") {
    return "km/h";
  }
  return "mph";
};

export const formatTemperature = (celsius: number, unit: Unit): string => {
  const converted = convertTemperature(celsius, unit);
  const symbol = getTemperatureSymbol(unit);
  return `${Math.round(converted)}${symbol}`;
};

export const formatWindSpeed = (kmh: number, unit: Unit): string => {
  const converted = convertWindSpeed(kmh, unit);
  const unitLabel = getWindSpeedUnit(unit);
  return `${Math.round(converted)} ${unitLabel}`;
};


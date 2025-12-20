export const api = {
  getForecast: async (city: string, unit = "metric") => {
    const url = `/api/forecast/${city}/${unit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error to get forecast");
    return res.json();
  },
};

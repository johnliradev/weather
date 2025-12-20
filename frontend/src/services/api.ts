export const api = {
  getForecast: async (city: string, unit = "metric") => {
    const url = `/api/forecast/${city}/${unit}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      ...data,
      statusCode: res.status,
      ok: res.ok,
    };
  },
};

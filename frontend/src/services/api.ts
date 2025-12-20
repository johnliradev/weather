export const api = {
  getForecast: async (city: string) => {
    // Sempre usa metric na API, conversão é feita no frontend
    const url = `/api/forecast/${city}/metric`;

    try {
      const res = await fetch(url);
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        return {
          data: null,
          fromCache: false,
          responseTime: null,
          statusCode: res.status,
          ok: false,
          error: {
            message: "Invalid response format from server",
          },
        };
      }

      return {
        ...data,
        statusCode: res.status,
        ok: res.ok,
      };
    } catch (error) {
      return {
        data: null,
        fromCache: false,
        responseTime: null,
        statusCode: null,
        ok: false,
        error: {
          message:
            error instanceof TypeError && error.message.includes("fetch")
              ? "Network error: Unable to connect to server"
              : error instanceof Error
              ? error.message
              : "Unknown error occurred",
        },
      };
    }
  },
};

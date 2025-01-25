function formatDate(date) {
  return date.toISOString().split("T")[0]; // Returns yyyy-mm-dd
}

export async function fetchWeather(city, date) {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(startDate.getDate() + 7);

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=b34043427a684e529b5183719252501&q=${city}&dt=${formattedStartDate}&end_dt=${formattedEndDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

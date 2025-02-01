export async function fetchCitySuggestions(query) {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=b34043427a684e529b5183719252501&q=${query}`
    );

    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

export function displaySuggestions(suggestions, suggestionsContainer) {
  suggestionsContainer.innerHTML = "";

  if (!suggestions.length) {
    suggestionsContainer.style.display = "none";
    return;
  }

  suggestions.forEach((city) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = `${city.name}, ${city.country}`;

    div.addEventListener("click", () => {
      searchInput.value = city.name;
      updateWeatherDisplay(city.name);
      suggestionsContainer.style.display = "none";
    });

    suggestionsContainer.appendChild(div);
  });

  suggestionsContainer.style.display = "block";
}

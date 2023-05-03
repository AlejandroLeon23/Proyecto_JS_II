function searchWeather() {
  const apiKey = 'c51b101eac0d61916ab4caf887b4aaf8';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const cityInput = document.querySelector('#city-input');
  const weatherContainer = document.querySelector('#weather-container');

  const city = cityInput.value.trim();

  if (city) {
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const { name, main: { temp, description } } = data;
        const weatherHtml = `
        <th>Ciudad</th>
          <th>${name}</th>
          <th>Temperatura</th>
          <th>${temp}°C</th>
          <th>Descripción</th>
          <th>Descripción: ${description}°C</th>
          `;
        weatherContainer.innerHTML = weatherHtml;
      })
      .catch(error => {
        console.error(error);
        weatherContainer.innerHTML = 'Error retrieving weather data';
      });
  }
}

const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', searchWeather);





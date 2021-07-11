const app = document.querySelector('#app');

async function getWeather(lon, lat) {
  try {
    const savedWeather = await sessionStorage.getItem('weatherBitSaved');
    if (savedWeather) {
      displayWeather(JSON.parse(savedWeather));
    } else {
      let response = await fetch(
        `/.netlify/functions/getweather?lon=${lon}&lat=${lat}`,
      );
      if (!response.ok) {
        throw 'Response failed. Status: ' + response.status;
      }
      let data = await response.json();
      sessionStorage.setItem('weatherBitSaved', JSON.stringify(data.data[0]));
      displayWeather(data.data[0]);
    }
  } catch (error) {
    console.warn(error);
  }
}

/**
 * gather the user's location details
 */
function getLocation() {
  const savedLocation = sessionStorage.getItem('locationSaved');
  if (savedLocation) {
    let locData = JSON.parse(savedLocation);
    let lon = locData.lon;
    let lat = locData.lat;
    getWeather(lon, lat);
  } else {
    navigator.geolocation.getCurrentPosition(
      getLocationFromGeolocation,
      showError,
    );
  }
}

function getLocationFromGeolocation(position) {
  const locData = {};
  locData.lon = position.coords.longitude;
  locData.lat = position.coords.latitude;
  sessionStorage.setItem('locationSaved', JSON.stringify(locData));
  getWeather(locData.lon, locData.lat);
}

/**
 * Log an error message
 * @param  {Object} error The error details
 */
function showError(error) {
  console.warn(error);
  app.innerHTML = 'Sorry, something went wrong. Please try again.';
}

function displayWeather({
  city_name,
  state_code,
  country_code,
  temp,
  weather,
}) {
  const html = `
    <img style="display: block" src="https://www.weatherbit.io/static/img/icons/${weather.icon}.png" alt="${weather.description}." />

    In ${city_name}, ${state_code} ${country_code} 
    it is currently ${temp} degrees with ${weather.description}. 
  `;
  app.innerHTML = html;
}

getLocation();
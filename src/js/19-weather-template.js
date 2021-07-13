function getWeatherTemplate(options) {
  const defaults = {
    selector: '#app',
    icon: false,
    unit: 'fahrenheit',
    message:
      'It is defaultly {{temperature}} and {{conditions}} at {{location}}',
  };

  const templateData = Object.assign(defaults, options);

  // Variables
  let app = document.querySelector(templateData.selector);

  function convertToCelcius(temperature) {
    const convert = Math.floor((temperature - 32) / 1.8);
    console.log(' convert ', convert);
    return convert;
  }

  /**
   * Sanitize and encode all HTML in a user-submitted string
   * https://portswigger.net/web-security/cross-site-scripting/preventing
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  function sanitizeHTML(str) {
    return str
      .toString()
      .replace(/javascript:/gi, '')
      .replace(/[^\w-_. ]/gi, function (c) {
        return `&#${c.charCodeAt(0)};`;
      });
  }

  function createDescription(weather) {
    const currTemp =
      templateData.unit === 'celcius'
        ? convertToCelcius(weather.temp)
        : weather.temp;

    return templateData.message
      .replaceAll(
        '{{location}}',
        `${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(
          weather.state_code,
        )}`,
      )
      .replaceAll(
        '{{temperature}}',
        `${currTemp} ${templateData.unit === 'celcius' ? 'C' : 'F'}`,
      )
      .replaceAll(
        '{{conditions}}',
        `${sanitizeHTML(weather.weather.description)}`,
      );
  }

  /**
   * Render the weather data into the DOM
   * @param  {Object} weather The weather data object
   */
  function renderWeather(weather) {
    app.innerHTML = `${
      templateData.icon
        ? `<p>
        <img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
          weather.weather.icon,
        )}.png">
        </p>`
        : ''
    }
    <p>${createDescription(weather)}</p>`;
  }

  /**
   * Show an error message when unable to get the weather
   */
  function noWeather() {
    app.textContent = 'Unable to get weather data at this time.';
  }

  /**
   * Get weather for the user's current location
   * @param  {Object} position The location data
   */
  function fetchWeather(position) {
    fetch(
      `/.netlify/functions/getweather?lon=${position.coords.longitude}&lat=${position.coords.latitude}`,
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw response.status;
      })
      .then(function (data) {
        renderWeather(data.data[0]);
      })
      .catch(function (error) {
        console.warn(error);
        noWeather();
      });
  }

  // Get the user's current position
  navigator.geolocation.getCurrentPosition(fetchWeather, noWeather, {
    enableHighAccuracy: true,
  });
}

getWeatherTemplate({
  selector: '#app',
  icon: false,
  unit: 'celcius',
  message:
    'At {{location}}, it is optionally {{temperature}} with {{conditions}}.',
});

function getWeatherTemplate(options) {
  const defaults = {
    selector: '#app',
    icon: true,
    unit: 'I',
    message:
      'It is defaultly {{temperature}} and {{conditions}} at {{location}}',
  };

  const templateData = Object.assign(defaults, options);

  // Variables
  let app = document.querySelector(templateData.selector);

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

  function createDescription({ city_name, state_code, temp, weather }) {
    console.log(' weather ', weather);
    return templateData.message
      .replaceAll(
        '{{location}}',
        `${sanitizeHTML(city_name)}, ${sanitizeHTML(state_code)}`,
      )
      .replaceAll(
        '{{temperature}}',
        `${temp} ${templateData.unit === 'M' ? 'C' : 'F'}`,
      )
      .replaceAll('{{conditions}}', `${sanitizeHTML(weather.description)}`);
  }

  /**
   * Render the weather data into the DOM
   * @param  {Object} weather The weather data object
   */
  function renderWeather(weather) {
    const { icon } = weather.weather;
    app.innerHTML = `${
      templateData.icon
        ? `<p>
        <img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(
          icon,
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
      `/.netlify/functions/getweather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=M`,
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

/**
 * init
 */
getWeatherTemplate({
  selector: '#app',
  icon: true,
  unit: 'M',
  message:
    'At {{location}}, it is optionally {{temperature}} with {{conditions}}.',
});

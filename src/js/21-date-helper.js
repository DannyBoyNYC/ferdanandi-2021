import { serialize } from '/js/modules/serialize.js';

// variables
const form = document.querySelector('form');
const response = document.querySelector('#response');

const timeUnitsEnum = {
  hours: 1000 * 60 * 60,
  days: 1000 * 60 * 60 * 24,
  weeks: 1000 * 60 * 60 * 24 * 7,
  months: 1000 * 60 * 60 * 24 * 30,
  years: 1000 * 60 * 60 * 24 * 365,
};

function getFormData(event) {
  event.preventDefault();
  let data = new FormData(form);
  let serializedData = serialize(data);
  getNewDate(serializedData);
}

/**
 * Get a date in the future (or past) from a timestamp
 * @return {String} A formatted date string
 */
function getNewDate(options = {}) {
  const defaultOptions = {
    timestamp: new Date().getTime(),
    units: 'days',
    numberOfUnits: '7',
    dateStyle: 'long',
    timeStyle: 'short',
    hour12: true,
  };
  let { timestamp, units, numberOfUnits, dateStyle, timeStyle, hour12 } =
    Object.assign(defaultOptions, options);
  numberOfUnits = +numberOfUnits;
  timestamp += numberOfUnits * timeUnitsEnum[units];

  const newDate = new Date(timestamp).toLocaleString(navigator.language, {
    dateStyle,
    timeStyle,
    hour12: hour12 === 'true' ? true : false,
  });

  const responseStr = `In ${numberOfUnits} ${units} from now it will be ${newDate}`;

  response.innerText = responseStr;
}

document.addEventListener('submit', getFormData);

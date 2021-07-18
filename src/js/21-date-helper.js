import { serialize } from '/js/modules/serialize.js';

// variables
let form = document.querySelector('form');
let response = document.querySelector('#response');

let timeUnits = {
  hours: 1000 * 60 * 60,
  days: 1000 * 60 * 60 * 24,
  weeks: 1000 * 60 * 60 * 24 * 7,
  months: 1000 * 60 * 60 * 24 * 30,
  years: 1000 * 60 * 60 * 24 * 365,
};

function convertDate(event) {
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
  };
  const temporalData = Object.assign(defaultOptions, options);
  // convert numberOfUnits string to int
  temporalData.numberOfUnits = +temporalData.numberOfUnits;

  temporalData.timestamp +=
    temporalData.numberOfUnits * timeUnits[temporalData.units];
  const responseStr = new Date(temporalData.timestamp).toLocaleString(
    navigator.language,
    {
      dateStyle: 'long',
      timeStyle: 'short',
      hour12: true,
    },
  );
  response.innerText = responseStr;
}

document.addEventListener('submit', convertDate);

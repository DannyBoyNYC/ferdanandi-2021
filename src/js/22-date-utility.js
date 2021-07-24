let stamp = (function () {
  const times = {
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30,
    years: 1000 * 60 * 60 * 24 * 365,
  };

  const format = {
    dateStyle: 'long',
    timeStyle: 'short',
    hour12: true,
  };

  const addHours = (timestamp, n = 1) => {
    return timestamp + n * times.hours;
  };

  const addDays = (timestamp, n = 1) => {
    return timestamp + n * times.days;
  };

  const addWeeks = (timestamp, n = 1) => {
    return timestamp + n * times.weeks;
  };

  const addMonths = (timestamp, n = 1) => {
    return timestamp + n * times.months;
  };

  const addYears = (timestamp, n = 1) => {
    return timestamp + n * times.years;
  };

  const getDate = (timestamp) => {
    let newDate = new Date(timestamp);
    return newDate.toLocaleString(navigator.language, format);
  };

  return { getDate, addHours, addDays, addWeeks, addMonths, addYears };
})();

// Get a timestamp for right now
let now = new Date().getTime();

// Add three weeks
let threeWeeks = stamp.addWeeks(now, 3);
let dateOne = stamp.getDate(threeWeeks);
console.log(' in three weeks ', dateOne);

// Add three hours
let threeHours = stamp.addHours(now, 3);
let dateFive = stamp.getDate(threeHours);
console.log(' in three Hours ', dateFive);

// Add three days
let threeDays = stamp.addDays(now, 3);
let dateTwo = stamp.getDate(threeDays);
console.log(' in three days ', dateTwo);

// Add three Months
let threeMonths = stamp.addMonths(now, 3);
let dateThree = stamp.getDate(threeMonths);
console.log(' in three Months ', dateThree);

// Add three Years
let threeYears = stamp.addYears(now, 3);
let dateFour = stamp.getDate(threeYears);
console.log(' in three Years ', dateFour);

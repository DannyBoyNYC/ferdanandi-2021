let Stamp = (function () {
  const times = {
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30,
    years: 1000 * 60 * 60 * 24 * 365,
  };

  function Constructor(date) {
    this.timestamp = date ? new Date(date).getTime() : new Date().getTime();
  }

  Constructor.prototype.addHours = function (n = 1) {
    this.n = n * times.hours;
    return this;
  };

  Constructor.prototype.addDays = function (n = 1) {
    this.n = n * times.days;
    return this;
  };

  Constructor.prototype.addWeeks = function (n = 1) {
    this.n = n * times.weeks;
    return this;
  };

  Constructor.prototype.addYears = function (n = 1) {
    this.n = n * times.years;
    return this;
  };

  Constructor.prototype.getDate = function (options = {}) {
    const format = Object.assign(
      {
        dateStyle: 'long',
        timeStyle: 'short',
        hour12: true,
      },
      options,
    );
    return Date(this.timestamp).toLocaleString(navigator.language, format);
  };

  return Constructor;
})();

// Create a new Stamp() instance for right now
let now = new Stamp();
let fourYears = new Stamp();
let fourUnitsFromNow = fourYears
  .addHours(4)
  // .addWeeks(3)
  // .addDays(3)
  // .addYears(3)
  .getDate();
console.log(' fourUnitsFromNow ', fourUnitsFromNow);

let aWhileAgo = now.addWeeks().addDays(2).addYears(-3).getDate();
console.log(' aWhileAgo ', aWhileAgo);

const testProto = Object.getPrototypeOf(now);
console.log(' testProto ', testProto);

const stampProto = Stamp.prototype;
console.log(' stampProto ', stampProto);

const isInstance = now instanceof Stamp;
console.log(' isInstance ', isInstance);

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
    return new Constructor(this.timestamp + n * times.hours);
  };

  Constructor.prototype.addDays = function (n = 1) {
    return new Constructor(this.timestamp + n * times.days);
  };

  Constructor.prototype.addWeeks = function (n = 1) {
    return new Constructor(this.timestamp + n * times.weeks);
  };

  Constructor.prototype.addYears = function (n = 1) {
    return new Constructor(this.timestamp + n * times.years);
  };

  Constructor.prototype.getDate = function (options = {}) {
    let format = Object.assign(
      {
        dateStyle: 'long',
        timeStyle: 'short',
        hour12: true,
      },
      options,
    );

    return new Date(this.timestamp).toLocaleString(navigator.language, format);
  };

  return Constructor;
})();

// Create a new Stamp() instance for right now
let now = new Stamp();
let fourYears = new Stamp();
let fourUnitsFromNow = fourYears
  .addHours(4)
  .addWeeks(4)
  .addDays(4)
  .addYears(4)
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

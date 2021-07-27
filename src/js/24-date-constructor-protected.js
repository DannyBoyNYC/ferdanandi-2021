let Stamp = (function () {
  function Constructor(date) {
    Object.defineProperties(this, {
      timestamp: {
        value: date ? new Date(date).getTime() : new Date().getTime(),
      },
    });
  }

  const hours = 1000 * 60 * 60;
  const days = hours * 24;
  const weeks = days * 7;
  const months = days * 30;
  const years = days * 365;

  const units = {
    hours,
    days,
    weeks,
    months,
    years,
  };

  Constructor.prototype.addHours = function (n = 1) {
    return new Constructor(this.timestamp + n * units.hours);
  };

  Constructor.prototype.addDays = function (n = 1) {
    return new Constructor(this.timestamp + n * units.days);
  };

  Constructor.prototype.addWeeks = function (n = 1) {
    return new Constructor(this.timestamp + n * units.weeks);
  };

  Constructor.prototype.addYears = function (n = 1) {
    return new Constructor(this.timestamp + n * units.years);
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
// Try to update it
// This should NOT change the value of now.timestamp
now.timestamp = 12345;
console.log(' now.timestamp ', now.timestamp);

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

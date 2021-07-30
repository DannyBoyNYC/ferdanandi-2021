import shuffle from '/js/modules/shuffle.js';

let Dice = (function () {
  const defaults = {
    sides: 6,
    message: 'You rolled a',
  };

  function createListener(dice, result, settings) {
    function roll() {
      shuffle(settings.sides);
      result.textContent = `${settings.message} ${settings.sides[0]}`;
    }

    dice.addEventListener('click', roll);
  }

  function arrayFromInteger(int) {
    let arr = new Array(int).fill(0);
    arr = arr.map(function (_, index) {
      return index + 1;
    });
    return arr;
  }

  function Constructor(dice, result, options = {}) {
    let diceEl = document.querySelector(dice);
    let resultEl = document.querySelector(result);
    if (!diceEl || !resultEl)
      throw 'Dice and result elements must be provided.';

    let settings = Object.assign({}, defaults, options);
    const sidesArray = arrayFromInteger(settings.sides);
    settings.sides = sidesArray;

    createListener(diceEl, resultEl, settings);
  }
  return Constructor;
})();

let d6 = new Dice('#d6', '#result');
let d20 = new Dice('#d20', '#result', {
  sides: 20,
  message: 'Boo yah! I rolled',
});

import shuffle from '/js/modules/shuffle.js';

let Dice = (function () {
  function createListener(sidesArr, instance) {
    const { dice, result, userName } = instance;
    function roll() {
      shuffle(sidesArr);
      result.textContent = `${userName} rolled ${sidesArr[0]}`;
    }

    dice.addEventListener('click', roll);
  }

  function arrayFromInteger(int) {
    let arr = new Array(int).fill(0);
    arr = arr.map((_, index) => {
      return index + 1;
    });
    return arr;
  }

  function Constructor(dice, result, options = {}) {
    let diceEl = document.querySelector(dice);
    let resultEl = document.querySelector(result);
    if (!diceEl || !resultEl)
      throw 'Dice and result elements must be provided.';

    let { sides, userName } = Object.assign(
      { sides: 6, userName: 'Daniel' },
      options,
    );

    const sidesArray = arrayFromInteger(sides);
    // sides = sidesArray;

    // Create properties
    Object.defineProperties(this, {
      dice: { value: diceEl },
      result: { value: resultEl },
      sides: { value: sides },
      userName: { value: userName },
    });

    createListener(sidesArray, this);
  }
  return Constructor;
})();

let d6 = new Dice('#d6', '#result');
let d20 = new Dice('#d20', '#result', {
  sides: 20,
  userName: 'Jack',
});

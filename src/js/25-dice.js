import shuffle from '/js/modules/shuffle.js';

let Dice = (function () {
  // Sides of the dice
  let sides = [1, 2, 3, 4, 5, 6];

  function createBtn(elem, btnText) {
    let btn = document.createElement('button');
    btn.innerHTML = btnText;
    elem.append(btn);
    return btn;
  }

  /**
   * Create an event listener
   * @param  {Node}        btn      The button to attach the listener to
   * @param  {Constructor} instance The current instantiation
   */
  function createEventListener(btn, instance) {
    function roll() {
      shuffle(sides);
      instance._resultsElem.textContent = `You rolled a ${sides[0]}`;
    }
    btn.addEventListener('click', roll);
  }

  /**
   * The constructor object
   */
  function Constructor(btnSelector, resultsSelector, btnText) {
    let btnElem = document.querySelector(btnSelector);
    let resultsElem = document.querySelector(resultsSelector);
    let btn = createBtn(btnElem, btnText);

    if (!btnElem || !resultsElem || !btn)
      throw 'elements and button text must be provided.';

    createEventListener(btn, this);

    Object.defineProperties(this, {
      _btnElem: { value: btnElem, writable: true },
      _btn: { value: btn },
      _btnText: { value: btnText, writable: true },
      _resultsElem: { value: resultsElem, writable: true },
    });
  }
  return Constructor;
})();

let d6 = new Dice('.btn', '.result', 'Roll Buddy!');
console.log(' d6 ', d6);
let dieTwo = new Dice('.btn2', '.result', 'Roll Two!');
console.log(' dieTwo ', dieTwo);

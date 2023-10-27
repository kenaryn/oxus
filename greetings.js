'use strict';

// HTML tag selections.
const classesListElm = document.getElementById('classes--list');
const btnGreet = document.getElementById('greet');
const fullNameElm = document.getElementById('p--fullname');
const raceElm = document.getElementById('p--race');
const errorClassElm = document.querySelector('.error');

let title = document.getElementById('title').value;
let fname = document.getElementById('fname').value;
let lname = document.getElementById('lname').value;

const greetByName = function (/** @type {string} */ firstName, /** @type {string} */ lastName) {
  return !firstName && !lastName ? 'Hi stranger.' : `Greetings, ${title} ${firstName} ${lastName}!`;
};

const greet = function () {
  /**
   * Greet the user with his/her fullname, or default one otherwise,
   * filling the `p--fullname` element.
   */
  let fullName = greetByName(fname, lname);
  const nameGreeting = document.createTextNode(fullName);
  fullNameElm.appendChild(nameGreeting);
};

const getnumberOfclasses = function () {
  let classes = document.querySelectorAll('.characterClass:checked');
  return classes.length;
};

const getClassesList = function () {
  /**
   * Feed `ul` `classes--list` with list items composed of user's class' names.
   */
  let classes = document.querySelectorAll('.characterClass:checked');
  classes.forEach(characterClass => {
    const li = document.createElement('li');
    const className = document.createTextNode(characterClass.name);
    li.appendChild(className);
    classesListElm.insertBefore(li, classesListElm.children[-1]);
  });
};

const emoteRace = function (/** @type {string} */ race) {
  /**
   * Return a string for the guard reaction according to user's race.
   */
  let emote = '';

  switch (race) {
    case 'human':
      emote = '<q>The guard observes the stranger approaching towards him.</q>';
      break;
    case 'elve':
      emote = 'The guard beholds the foreigner walking toward him, plainly subdued by his grace.';
      break;
    case 'orc':
      emote =
        'The guard watches the difform orc approaching, repelled by his ugliness, wrinkling his nose.';
      break;
    default:
      emote = 'The guard observes the stranger approaching towards him.';
  }

  return emote;
};

const greetByRace = function () {
  /**
   * Feed `p--race` element with a message depending on the user'race.
   */
  const race = document.getElementById('race').value;
  const racialGreeting = document.createTextNode(emoteRace(race));
  raceElm.appendChild(racialGreeting);
};

const emoteRank = function (/** @type {string} */ rank) {
  /**
   * Return a string for the guard reaction according to user's rank.
   */
  let guardReply = '';

  switch (rank) {
    case 'commoner':
      guardReply = 'The guard acknowledges your presence with a slight wave of his hand.';
      break;
    case 'noble':
      guardReply = 'The guard respectfully bows at your arrival.';
      break;
    case 'royal':
      guardReply = 'The guard, and all those present, bow deeply when you approach.';
      break;
    default:
      guardReply = 'The guard acknowledges your presence with a slight wave of his hand.';
  }
  return guardReply;
};

const greetByRank = function () {
  /**
   * Feed `p--rank` element with a message depending on the user's rank.
   */

  const rank = document.querySelector('input[name=rank]:checked').value;
  const rankGreeting = document.createTextNode(emoteRank(rank));
  const pRank = document.getElementById('p--rank');
  pRank.appendChild(rankGreeting);

  // Prints an error message if no or all classes are selected by the player.
  if (getnumberOfclasses() < 1 || getnumberOfclasses() > 3) {
    const node = document.createTextNode('Please choose between 1 and 3 classes.');
    errorClassElm.appendChild(node);
    errorClassElm.classList.add('error');
  } else {
    // Prints all checked classes.
    getClassesList();
  }
};

const greetFormally = function (/** @type {any} */ e) {
  /**
   * Call all handler's functions to greet the player.
   */
  // Disable browser default behaviour.
  e.preventDefault();

  greet();
  greetByRace();
  greetByRank();

  // Mask the button to prevent awkwardnesses.
  btnGreet.classList.toggle('hidden');
};

btnGreet.addEventListener('click', greetFormally);

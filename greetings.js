'use strict';

const classesList = document.querySelector('#classes-list');
const btnGreet = document.getElementById('greet');

const greet = function (e) {
  e.preventDefault();
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const title = document.getElementById('title').value;

  let fullName = !fname && !lname ? 'Hi stranger.' : `Greetings, ${title} ${fname} ${lname}!`;
  const pFullName = document.getElementById('p--fullname');
  const nameGreeting = document.createTextNode(fullName);
  pFullName.appendChild(nameGreeting);
};

// const getnumberOfclasses = function () {
//   return classes.length;
// };

const getClassesList = function () {
  let classes = document.querySelectorAll('.characterClass:checked');
  classes.forEach(characterClass => {
    const li = document.createElement('li');
    const className = document.createTextNode(characterClass.name);
    li.appendChild(className);
    classesList.insertBefore(li, classesList.children[-1]);
  });
};

const emoteRace = function (/** @type {string} */ race) {
  let emote = '';

  switch (race) {
    case 'human':
      emote = 'The guard observes the stranger approaching towards him.';
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

const greetByRace = function (e) {
  greet(e);

  const race = document.getElementById('race').value;
  const racialGreeting = document.createTextNode(emoteRace(race));

  const pRace = document.getElementById('p--race');
  pRace.appendChild(racialGreeting);
};

const emoteRank = function (/** @type {string} */ rank) {
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

const greetByRank = function (e) {
  greetByRace(e);

  const rank = document.querySelector('input[name=rank]:checked').value;
  const rankGreeting = document.createTextNode(emoteRank(rank));
  const pRank = document.getElementById('p--rank');
  pRank.appendChild(rankGreeting);

  getClassesList();
};

btnGreet.addEventListener('click', greetByRank);

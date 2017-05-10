const timeIncrements = ['12am', '12:30am', '1am', '1:30am','2am', '2:30am','3am', '3:30am','4am', '4:30am',
  '5am', '5:30am','6am', '6:30am','7am', '7:30am','8am', '8:30am','9am', '9:30am',
  '10am', '10:30am','11am', '11:30am','12pm', '12:30pm', '1pm', '1:30pm','2pm',
  '2:30pm','3pm', '3:30pm','4pm', '4:30pm', '5pm', '5:30pm','6pm', '6:30pm','7pm',
  '7:30pm','8pm', '8:30pm','9pm', '9:30pm','10pm', '10:30pm','11pm', '11:30pm'];

const timeValues = [1, 30, 100, 130, 200, 230, 300, 330, 400, 430, 500, 530, 600, 630,
  700, 730, 800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430,
  1500, 1530, 1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130, 2200, 2230,
  2300, 2330];

const todos = ['Read a chapter of How to Win Friends', 'Call James', 'Make oatmeal for the week',
  'Return library books', 'Buy toothbrush', 'Copy housekey', 'Study German', 'Take vitamins', 'Call Mom',
  'Send Thank You notes', 'Send Melanie that recipe', 'Send resume to HotNewStartup.com', 'Play Rocket League',
  'Take a nap. You earned it.', 'Play Chess',  'Boardgames with friends!', 'Graduation Party',
  'Get a passport photo', 'Wash dishes. For real.', 'Wash cat', 'Do laundry', 'Pay parking ticket',
  'Hustle', 'Add autoprefixer', 'Read MDN', 'Twitch stream Minesweeper', 'Eat an apple', 'Brush teeth',
  'Beer with friends!', 'Sit in traffic', 'Delete FB account', 'Get married', 'Meditate', 'React Meetup',
  'Buy Sigur Ros tickets', "'Like' some cat videos"
];

const todosComplete = todos.map((todo) => {

  const randomTimeIndex = getRandomInt(48, 0);

  return ({
    activity: todo,
    date: getRandomDate(),
    time: timeIncrements[randomTimeIndex],
    timeValue: timeValues[randomTimeIndex]
  })
});

// TODO: A table should be filled completely with a single <td>
// todosComplete.push(
//   {activity: 'test1: this slice should show test2 as well.', date: getTodayDate(), time: timeIncrements[0], timeValue: timeValues[0]},
//   {activity: 'test2', date: getTodayDate(), time: timeIncrements[0], timeValue: timeValues[0]},
// );
//
// todosComplete.push(
//   {activity: 'test3: this slice should show test4 as well.', date: getTomorrowDate(), time: timeIncrements[0], timeValue: timeValues[0]},
//   {activity: 'test4', date: getTomorrowDate(), time: timeIncrements[0], timeValue: timeValues[0]},
// );

// Want to set a random date between 7 days in the past and 14 days in the future
function getRandomInt(max, min) {
  return Math.floor(Math.random() * max + min);
}

function getRandomDate() {
  const randDate = new Date();
  randDate.setHours(0,0,0,0);
  randDate.setDate(randDate.getDate() + getRandomInt(21, -7));
  return randDate;
}

function getTodayDate() {
  const today = new Date();
  today.setHours(0,0,0,0);
  return today;
}

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setHours(0,0,0,0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

Object.freeze(todosComplete);
module.exports = todosComplete;

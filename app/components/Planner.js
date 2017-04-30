const React = require('react');
const PropTypes = require('prop-types');
const CalendarMini = require('./CalendarMini');
const CalendarDay = require('./CalendarDay');
const CalendarWeek = require('./CalendarWeek');
const CalendarMonth = require('./CalendarMonth');
const CalendarYear = require('./CalendarYear');
const CalendarViewButton = require('./CalendarViewButton');
const Clock = require('./Clock');
const Todos = require('./Todos');

class Planner extends React.Component {

  constructor() {
    super();

    let trueDate = new Date(); // current date with hr, min, sec, ms zeroed out
    trueDate.setHours(0, 0, 0, 0);

    let testDate = new Date();
    testDate.setHours(0,0,0,0);

    let testDate2 = new Date();
    testDate2.setHours(0,0,0,0);
    testDate2.setDate(testDate.getDate() + 2);

    this.state = {
      trueDate: trueDate,
      selectedDate: trueDate,
      todos: new Array(
        {
          activity: 'read',
          date: testDate,
          time: '8am'
        },
        {
          activity: 'return library book to the library so that i can return the book to the library',
          date: testDate2,
          time: '12pm'
        }
      ),
      calendarView: 'month',
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeIncrements: ['12am', '12:30am', '1am', '1:30am','2am', '2:30am','3am', '3:30am','4am', '4:30am',
                        '5am', '5:30am','6am', '6:30am','7am', '7:30am','8am', '8:30am','9am', '9:30am',
                        '10am', '10:30am','11am', '11:30am','12pm', '12:30pm', '1am', '1:30pm','2pm',
                        '2:30pm','3pm', '3:30pm','4pm', '4:30pm', '5pm', '5:30pm','6pm', '6:30pm','7pm',
                        '7:30pm','8pm', '8:30pm','9pm', '9:30pm','10pm', '10:30pm','11pm', '11:30pm'],
    }

    this.updateSelectedDate = this.updateSelectedDate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateTrueDate = this.updateTrueDate.bind(this);
  }

  updateSelectedDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  updateTrueDate() {
    const trueDate = new Date(); // current date with hr, min, sec, ms zeroed out
    trueDate.setHours(0, 0, 0, 0);

    this.setState({
      trueDate: trueDate
    });
  }

  handleInput(e) {
    if (e.key === 'Enter' && e.target.value !== "") {
      e.preventDefault();

      const isActivityUnique = this.state.todos.every((todo) => {
        return todo.activity !== e.target.value;
      });

      if (isActivityUnique) {
        const todos = this.state.todos.slice();

        const date = new Date();
        date.setHours(0,0,0,0);

        todos.push({
          activity: e.target.value,
          date: date
        });

        this.setState({
          todos: todos
        });

      } else {
        alert('That activity already exists in your todo list.');
      }
      e.target.value = '';
    }
  }

  updateView(viewCommand) {
    this.setState({
      calendarView: viewCommand
    });
  }

  render() {
    const { calendarView, dayNames, monthNames, selectedDate, timeIncrements, todos, trueDate } = this.state;
    let calendar = null;
    if (calendarView === 'month') {
      calendar = <CalendarMonth
        monthNames={monthNames}
        dayNames={dayNames}
        trueDate={trueDate}
        todos={todos}
        selectedDate={selectedDate}
        updateSelectedDate={this.updateSelectedDate}
      />;
  } else if (calendarView === 'day') {
    calendar = <CalendarDay />;
  } else if (calendarView === 'week') {
    calendar = <CalendarWeek
      monthNames={monthNames}
      dayNames={dayNames}
      selectedDate={selectedDate}
      timeIncrements={timeIncrements}
      trueDate={trueDate}
      todos={todos}
      updateSelectedDate={this.updateSelectedDate}
    />;
  } else if (calendarView === 'year') {
    calendar = <CalendarYear />;
  }

    return (
      <div className="Planner">
        <h1>Planner</h1>
        <Clock monthNames={this.state.monthNames} updateTrueDate={this.updateTrueDate}/>

        <div className="planner-view-btn-container">
          <CalendarViewButton title={'Day'} calendarView={calendarView} viewCommand={'day'} updateView={(cmd) => this.updateView(cmd)}/>
          <CalendarViewButton title={'Week'} calendarView={calendarView} viewCommand={'week'} updateView={(cmd) => this.updateView(cmd)}/>
          <CalendarViewButton title={'Month'} calendarView={calendarView} viewCommand={'month'} updateView={(cmd) => this.updateView(cmd)}/>
          <CalendarViewButton title={'Year'} calendarView={calendarView} viewCommand={'year'} updateView={(cmd) => this.updateView(cmd)}/>
        </div>
        <div className="planner-container">
          <CalendarMini
            dayNames={dayNames}
            monthNames={monthNames}
            selectedDate={selectedDate}
            trueDate={trueDate}
            todos={todos}
            updateSelectedDate={this.updateSelectedDate}
          />
          {/*<Todos
            todos={this.state.todos}
            inputHandler={this.handleInput}
            selectedDate={this.state.selectedDate}
          />
          */}
          {calendar}
        </div>
      </div>
    )
  }
}

module.exports = Planner;

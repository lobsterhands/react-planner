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
    testDate.setDate(testDate.getDate() - 27);

    this.state = {
      trueDate: trueDate,
      selectedDate: trueDate,
      todos: new Array(
        {
          activity: 'read',
          date: testDate
        }
      ),
      calendarView: 'month',
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
    const { calendarView, dayNames, monthNames, selectedDate, todos, trueDate } = this.state;
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
    calendar = <CalendarWeek />;
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

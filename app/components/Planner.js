var React = require('react');
var PropTypes = require('prop-types');
var Calendar = require('./Calendar');
var Clock = require('./Clock');
var Todos = require('./Todos');

class Planner extends React.Component {

  constructor() {
    super();

    this.state = {
      todos: new Array({
        activity: 'buy milk',
        date: new Date()
      }, {
        activity: 'sleep in',
        date: new Date()
      }),
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      calendarDays: new Array(42).fill(0),
    }
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      const isActivityUnique = this.state.todos.every((todo) => {
        return todo.activity !== e.target.value;
      });

      if (isActivityUnique) {
        var todos = this.state.todos.slice();

        let date = new Date();
        date.setHours(0,0,0,0);

        todos.push({
          activity: e.target.value,
          date: date
        });

        this.setState(function () {
          return {
            todos: todos
          }
        })

      } else {
        alert('That activity already exists in your todo list.');
      }
      e.target.value = '';
    }
  }

  updateCalendarDays(newDays) {
    this.setState(function() {
      return {
        calendarDays: newDays
      }
    })
  }

  render() {
    console.log(this.state.calendarDays);

    return (
      <div className="Planner">
        <h1>Planner</h1>
        <Clock monthNames={this.state.monthNames}/>
        <Todos todos={this.state.todos} inputHandler={(e) => this.handleEnter(e)} />
        <Calendar
          updateCalendarDays={(days) => this.updateCalendarDays(days)}
          calendarDays={this.state.calendarDays}
          monthNames={this.state.monthNames}
          dayNames={this.state.dayNames}
          trueDate={this.state.trueDate}
          viewDate={this.state.viewDate}/>
      </div>
    )
  }
}

module.exports = Planner;

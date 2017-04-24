var React = require('react');
var PropTypes = require('prop-types');
var Calendar = require('./Calendar');
var Clock = require('./Clock');
var Todos = require('./Todos');

class Planner extends React.Component {

  constructor() {
    super();

    var trueDate = new Date(); // current date with hr, min, sec, ms zeroed out
    trueDate.setHours(0, 0, 0, 0);

    var testDate = new Date();
    testDate.setHours(0,0,0,0);
    testDate.setDate(testDate.getDate() - 1);

    this.state = {
      trueDate: trueDate,
      selectedDate: trueDate,
      todos: new Array(
        {
          activity: 'read',
          date: testDate
        }
      ),
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
  }

  updateSelectedDate(date) {
    this.setState(function() {
      return {
        selectedDate: date
      }
    })
  }

  updateTrueDate() {
    var trueDate = new Date(); // current date with hr, min, sec, ms zeroed out
    trueDate.setHours(0, 0, 0, 0);

    this.setState(function () {
      return {
        trueDate: trueDate
      }
    })
  }

  handleInput(e) {
    if (e.key === 'Enter' && e.target.value !== "") {
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

  render() {
    return (
      <div className="Planner">
        <h1>Planner</h1>
        <Clock monthNames={this.state.monthNames} updateTrueDate={() => this.updateTrueDate()}/>
        <Todos todos={this.state.todos} inputHandler={(e) => this.handleInput(e)} />
        <Calendar
          updateCalendarDays={() => this.updateCalendarDays(days)}
          monthNames={this.state.monthNames}
          dayNames={this.state.dayNames}
          trueDate={this.state.trueDate}
          todos={this.state.todos}
          updateSelectedDate={(date) => this.updateSelectedDate(date)}/>
      </div>
    )
  }
}

module.exports = Planner;

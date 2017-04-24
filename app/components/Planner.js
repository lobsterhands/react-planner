var React = require('react');
var PropTypes = require('prop-types');
var Calendar = require('./Calendar');
var Clock = require('./Clock');
var Todos = require('./Todos');

class Planner extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: new Array('buy milk'),
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
  }

  handleEnter(e) {
    if (e.key === 'Enter') {

      var todos = this.state.todos.slice();
      todos.push(e.target.value);
      e.target.value = '';

      this.setState(function () {
          return {
            todos: todos
          }
        })
      }
  }

  render() {
    return (
      <div className="Planner">
        <h1>Planner</h1>
        <Clock monthNames={this.state.monthNames}/>
        <Todos todos={this.state.todos} inputHandler={(e) => this.handleEnter(e)} />
        <Calendar monthNames={this.state.monthNames} dayNames={this.state.dayNames}/>
      </div>
    )
  }
}

module.exports = Planner;

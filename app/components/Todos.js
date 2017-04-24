var React = require('react');
var PropTypes = require('prop-types');

class Todos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayAll: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      displayAll: value
    })
  }

  render() {

    let { selectedDate } = this.props;
    let { displayAll } = this.state;

    let pertinentTodos = null;
    if (displayAll) {
      pertinentTodos = this.props.todos.map(function (todo, index) {
        return (
          <li className="todo" key={todo.activity} onClick={() => console.log(todo.date)}>
            {todo.activity}
          </li>
        )
      });
    } else {
      pertinentTodos = this.props.todos.filter(function (todo) {
        return (todo.date.getTime() === selectedDate.getTime());
      }).map(function (todo, index) {
        return (
          <li className="todo" key={todo.activity} onClick={() => console.log(todo.date)}>
            {todo.activity}
          </li>
        )
      });
    }

    return (
      <div className="Todos">
        <h2>Todos</h2>
        <div className="todos-show-all">
          <label>Show All Todos
          <input
             name="displayAll"
             type="checkbox"
             checked={this.state.displayAll}
             onChange={this.handleInputChange} />
         </label>
         </div>
        <input type="text" onKeyPress={this.props.inputHandler}
          placeholder="Enter a new todo"/>
        <h3>{displayAll ? 'Todos: All' : 'Todos: ' + (selectedDate.getMonth() + 1) + '/' +
          selectedDate.getDate() + '/' + selectedDate.getFullYear()}</h3>
        <ul>
          {pertinentTodos}
        </ul>
      </div>
    )
  }
}

module.exports = Todos;

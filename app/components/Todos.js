var React = require('react');
var PropTypes = require('prop-types');

class Todos extends React.Component {

  render() {
    return (
      <div className="Todos">
        <h2>Todos</h2>
        <input type="text" onKeyPress={this.props.inputHandler}
          placeholder="Enter a new todo"/>
        <ul>
          {this.props.todos.map(function (todo, index) {
            return (
              <li className="todo" key={todo.activity} onClick={() => console.log(todo.date)}>
                {todo.activity}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Todos;

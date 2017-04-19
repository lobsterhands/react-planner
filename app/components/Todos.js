var React = require('react');
var PropTypes = require('prop-types');

class Todos extends React.Component {

  render() {
    return (
      <div className="Todos">
        <h2>Todos</h2>
        <ul>
          {this.props.todos.map(function (todo) {
            return (
              <li key={todo}>{todo}</li>
            )
          })}
        </ul>
        <input type="text" onKeyPress={this.props.inputHandler}
          placeholder="Enter a new todo"/>
      </div>
    )
  }
}

module.exports = Todos;

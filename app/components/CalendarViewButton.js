var React = require('react');

class CalendarViewButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={() => this.props.updateView(this.props.viewCommand)}>
        {this.props.title}
      </button>
    )
  }
}

module.exports = CalendarViewButton;

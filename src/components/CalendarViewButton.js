const React = require('react');

class CalendarViewButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {calendarView, viewCommand} = this.props;
    let isSelected = viewCommand === calendarView;

    return (
      <button className=
        {"planner-view-btn " + (isSelected ? "planner-view-btn-active" : "")}
        onClick={() => this.props.updateView(this.props.viewCommand)}>
        {this.props.title}
      </button>
    )
  }
}

module.exports = CalendarViewButton;

const React = require('react');
const PropTypes = require('prop-types');

class CalendarViewButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {calendarView, title, updateView, viewCommand} = this.props;
    let isSelected = (viewCommand === calendarView);

    return (
      <button className=
        {"planner-view-btn " + (isSelected ? "planner-view-btn-active" : "")}
        onClick={() => updateView(viewCommand)}
      >
        {title}
      </button>
    )
  }
}

CalendarViewButton.propTypes = {
  calendarView: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updateView: PropTypes.func.isRequired,
  viewCommand: PropTypes.string.isRequired
}

module.exports = CalendarViewButton;

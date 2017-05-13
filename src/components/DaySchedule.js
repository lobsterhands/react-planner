import React from 'react';

class DaySchedule extends React.Component {

  handleClick(e, date, timeSlice) {
    this.props.onClick(date);
  }

  render() {
    const {viewDate, timeSlice, todo, trueDate} = this.props;
    const isCurrentDay = (viewDate.getTime() === trueDate.getTime());

    return (
      <td
        className={"schedule-activity" + (isCurrentDay ? " current-day" : "")}
        onClick={(e) => this.handleClick(e, viewDate, timeSlice)}
        key={todo.activity}>
          {todo.activity}
      </td>
    )
  }
}

module.exports = DaySchedule;

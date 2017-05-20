import React from 'react';

class ScheduleData extends React.Component {

  handleClick(e, date, timeSlice) {
    this.props.onClick(date);
  }

  render() {
    const {date, timeSlice, todos, trueDate} = this.props;
    const isCurrentDay = (date.getTime() === trueDate.getTime());

    const timeSliceTodos = todos.filter((todo) => {
      return (todo.date.getTime() === date.getTime() && todo.time === timeSlice)
    });

    const [todo] = timeSliceTodos;

    return (
      <td
        className={"schedule-activity " + (isCurrentDay ? "current-day " : "")}
        onClick={(e) => this.handleClick(e, date, timeSlice)}>
        {(todo ? todo.activity : '')}
      </td>
    )
  }
}

module.exports = ScheduleData;

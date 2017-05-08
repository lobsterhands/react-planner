import React from 'react';

class ScheduleData extends React.Component {

  handleClick(date, timeSlice) {
    this.props.onClick(date);
  }

  render() {
    const {date, timeSlice, todos, trueDate} = this.props;
    const isCurrentDay = (date.getTime() === trueDate.getTime());

    const todayTodos = todos.filter((todo) => {
      return (todo.date.getTime() === date.getTime() && todo.time === timeSlice)
    });
    const [todo] = todayTodos;

    return (
        <td className={"schedule-activity " + (isCurrentDay ? "current-day " : "")} onClick={() => this.handleClick(date, timeSlice)}>
          {(todo ? todo.activity : '')}
        </td>
    )
  }
}

module.exports = ScheduleData;

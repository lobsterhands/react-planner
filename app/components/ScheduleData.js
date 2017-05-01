import React from 'react';

class ScheduleData extends React.Component {

  render() {
    const {date, timeSlice, todos, trueDate} = this.props;
    const isCurrentDay = (date.getTime() === trueDate.getTime());

    const todayTodos = todos.filter((todo) => {
      return (todo.date.getTime() === date.getTime() && todo.time === timeSlice)
    });
    const [todo] = todayTodos;

    return (
        <td className={"schedule-activity " + (isCurrentDay ? "current-day " : "")} onClick={() => console.log(date, timeSlice)}>
          {(todo ? todo.activity : '')}
        </td>
    )
  }
}

module.exports = ScheduleData;

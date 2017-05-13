import React from 'react';
const PropTypes = require('prop-types');

class ScheduledTodo extends React.Component {
  handleClick(e, date, timeSlice) {
    this.props.onClick(date);
  }

  render() {
    const {viewDate, timeSlice, todo, trueDate} = this.props;
    const isCurrentDay = (viewDate.getTime() === trueDate.getTime());
    const content = (todo ? todo.activity : '');

    return (
      <div
        className={'day-schedule-todo' + (isCurrentDay ? ' current-day' : '')}
        onClick={(e) => this.handleClick(e, viewDate, timeSlice)}
        key={todo ? todo.activity : timeSlice}>
          {content}
      </div>
    )
  }
}

ScheduledTodo.propTypes = {
  timeSlice: PropTypes.string.isRequired,
  todo: PropTypes.shape({
          activity: PropTypes.string,
          date: PropTypes.instanceOf(Date)
        }).isRequired,
  trueDate: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
  viewDate: PropTypes.instanceOf(Date)
}

module.exports = ScheduledTodo;

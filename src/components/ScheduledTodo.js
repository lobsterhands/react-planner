import React from 'react';
const PropTypes = require('prop-types');

class ScheduledTodo extends React.Component {
  handleClick(e, date, timeSlice) {
    console.log('x:',e.nativeEvent.x);
    console.log('y:',e.nativeEvent.y);
    console.log(date);
    console.log(timeSlice);
    this.props.updateSelectedDate(date);
    this.props.updateCurrentModal(date);
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
  updateCurrentModal: PropTypes.func.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  viewDate: PropTypes.instanceOf(Date).isRequired,
}

module.exports = ScheduledTodo;

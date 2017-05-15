import React from 'react';
const PropTypes = require('prop-types');

class ScheduledTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(timeSlice, todo, viewDate) {
    let modalObj = new Object();

    if (todo.activity) {
      modalObj = todo;
      this.props.onClick(modalObj);
    } else {
      modalObj.activity = "Add an activity";
      modalObj.date = viewDate;
      modalObj.timeSlice = timeSlice;
      this.props.onClick(modalObj);
    }


    this.props.updateSelectedDate(viewDate);
  }

  render() {
    const {viewDate, timeSlice, todo, trueDate} = this.props;
    const isCurrentDay = (viewDate.getTime() === trueDate.getTime());
    const content = (todo ? todo.activity : '');

    return (
      <div
        className={'day-schedule-todo' + (isCurrentDay ? ' current-day' : '')}
        onClick={() => this.handleClick(timeSlice, todo, viewDate)}
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

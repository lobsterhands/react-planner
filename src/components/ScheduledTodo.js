import React from 'react';
const PropTypes = require('prop-types');
const Modal = require('./Modal');

class ScheduledTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(timeSlice, todo, viewDate) {
    let modalInfo = new Object();

    if (todo.activity) { // todo is not empty object
      modalInfo = todo;
    } else {
      // Use timeSlice and viewDate vars to build new Todo object with empty activity ''
      modalInfo.activity = '';
      modalInfo.time = timeSlice;
      modalInfo.date = viewDate;
    }

    this.props.updateCurrentModal(
      <Modal
        closeModal={() => this.props.updateCurrentModal(null)}
        todo={modalInfo}
      />
    );
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

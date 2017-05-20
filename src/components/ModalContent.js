import React from 'react';
const PropTypes = require('prop-types');
const ModalActivity = require('./ModalActivity');

function ModalDate (props) {
  return (
    <p><b>Date:</b><br/> {props.date.toString().slice(0, 16)}</p>
  )
}
ModalDate.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired
}

function ModalTime (props) {
  return (
      <p><b>Time:</b><br/> {props.time}</p>
  )
}
ModalTime.propTypes = {
	time: PropTypes.string.isRequired
}

class ModalContent extends React.Component {
  handleClick(event) {
    event.stopPropagation();
  }

  render() {
    const {todo} = this.props;

    let activity = (todo.activity === ''
      ? (<p className="placeholder">Add activity (this will be input)...</p>)
      : (<p>Activity: {todo.activity}</p>)
    );

    return (
        <div className="modal-content" onClick={(e) => this.handleClick(e)}>
          <ModalActivity activity={todo.activity} />
          <ModalDate date={todo.date} />
          <ModalTime time={todo.time} />
        </div>
    )
  }
}
ModalContent.propTypes = {
  // TODO: update along with consistent todo formatting throughout app
}

module.exports = ModalContent;

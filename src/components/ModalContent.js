import React from 'react';
const PropTypes = require('prop-types');

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
          {activity}
          <p>Date: {todo.date.toString()}</p>
          <p>Time: {todo.time}</p>
        </div>
    )
  }
}

ModalContent.propTypes = {

}

module.exports = ModalContent;

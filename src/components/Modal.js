import React from 'react';
const PropTypes = require('prop-types');

class Modal extends React.Component {
  render() {
    const {todo} = this.props;
    console.log(todo);

    return (
      <div className="Modal">
        <div className="modal-content">
          <h1>Modal</h1>
          <h3>Activity: <p className="placeholder">{todo.activity}</p></h3>
          <h3>Time: <p className="placeholder">{todo.timeSlice}</p></h3>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  todo: PropTypes.shape({
    activity: PropTypes.string,
    date: PropTypes.instanceOf(Date)
  }).isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired
}

module.exports = Modal;

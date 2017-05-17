import React from 'react';
const PropTypes = require('prop-types');
const ModalContent = require('./ModalContent');

class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.closeModal();
  }

  render() {
    const {todo, posX, posY} = this.props;

    let activity = (todo.activity === ''
      ? (<p className="placeholder">Add activity (this will be input)...</p>)
      : (<p>{todo.activity}</p>)
    );

    return (
      <div className="Modal" onClick={this.handleClick}>
        <ModalContent todo={todo} />
      </div>
    )
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    activity: PropTypes.string,
    date: PropTypes.instanceOf(Date)
  }).isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired
}

module.exports = Modal;

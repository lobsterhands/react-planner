import React from 'react';
const PropTypes = require('prop-types');

class ModalTime extends React.Component {

  render() {
    const {time} = this.props;

    return (
        <p><b>Time:</b><br/> {time}</p>
    )
  }
}

ModalTime.propTypes = {
	time: PropTypes.string.isRequired
}

module.exports = ModalTime;

import React from 'react';
const PropTypes = require('prop-types');

class ModalDate extends React.Component {

  render() {
    const {date} = this.props;

    return (
        <p><b>Date:</b><br/> {date.toString().slice(0, 16)}</p>
    )
  }
}

ModalDate.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired
}

module.exports = ModalDate;

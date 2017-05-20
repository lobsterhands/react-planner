import React from 'react';
const PropTypes = require('prop-types');

class ModalActivity extends React.Component {

  render() {
    const {activity} = this.props;

    let content = (activity === ''
      ? (<p className="placeholder">Add activity (this will be input)...</p>)
      : (<p><b>Activity</b>:<br/> {activity}</p>)
    );

    return (
        content
    )
  }
}

ModalActivity.propTypes = {
	activity: PropTypes.string.isRequired
}

module.exports = ModalActivity;

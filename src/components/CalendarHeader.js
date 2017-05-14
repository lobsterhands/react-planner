import React from 'react';
const PropTypes = require('prop-types');
const Clock = require('./Clock');

class CalendarHeader extends React.Component {
  render() {
    const {monthNames, updateTrueDate} = this.props;
    return (
      <div>
        <div className="header">
          <h1 className="title">React Planner</h1>
          <Clock
            monthNames={monthNames}
            updateTrueDate={updateTrueDate}
          />
        </div>
        <div className="separator"></div>
      </div>
    )
  }
}

CalendarHeader.propTypes = {
  monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateTrueDate: PropTypes.func.isRequired,
}

module.exports = CalendarHeader;

import React from 'react';
const PropTypes = require('prop-types');
const CalendarViewButton = require('./CalendarViewButton');


class CalendarViewPicker extends React.Component {
  render() {
    const {calendarView, updateView} = this.props;
    return (
      <div className="planner-view-btn-container">
        <CalendarViewButton
          title={"Day"}
          calendarView={calendarView}
          viewCommand={"day"}
          updateView={updateView}
        />
        <CalendarViewButton
          title={"Week"}
          calendarView={calendarView}
          viewCommand={"week"}
          updateView={updateView}
        />
        <CalendarViewButton
          title={"Month"}
          calendarView={calendarView}
          viewCommand={"month"}
          updateView={updateView}
        />
      </div>
    )
  }
}

CalendarViewPicker.propTypes = {
  calendarView: PropTypes.string.isRequired,
  updateView: PropTypes.func.isRequired,
}

module.exports = CalendarViewPicker;

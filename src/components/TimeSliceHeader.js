import React from 'react';

class TimeSliceHeader extends React.Component {

  render() {
    const {timeSlice} = this.props;
    return (
        <th className="time-slice-header">{timeSlice}</th>
    )
  }
}

module.exports = TimeSliceHeader;

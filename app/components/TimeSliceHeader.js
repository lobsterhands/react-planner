import React from 'react';

class TimeSliceHeader extends React.Component {

  render() {
    const {timeSlice} = this.props;
    return (
        <td className="time-slice-header">{timeSlice}</td>
    )
  }
}

module.exports = TimeSliceHeader;

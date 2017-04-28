const React = require('react');
const PropTypes = require('prop-types');
const ScheduleRow = require('./ScheduleRow');

class CalendarWeek extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewDate: this.props.selectedDate
    }

    this.goBackInTime = this.goBackInTime.bind(this);
    this.goForwardInTime = this.goForwardInTime.bind(this);
  }

  goBackInTime() {
    const {viewDate} = this.state;
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() - 7);

    this.setState({
      viewDate: newViewDate
    });
  }

  goForwardInTime() {
    const {viewDate} = this.state;
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() + 7);

    this.setState({
      viewDate: newViewDate
    });
  }

  getWeekDates() {
    const {viewDate} = this.state;
    const currentDate = viewDate.getDate(); // 1-31
    const currentDay = viewDate.getDay(); // 0-6

    const weekDates = new Array(7).fill(0).map((elem, index) => {
      let weekDate = new Date(
        viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate()
      );
        weekDate.setDate(weekDate.getDate() - (currentDay - index));
        return weekDate;
    });

    return weekDates;
  }

  getFromDayToDay(viewWeek) {
    const {monthNames} = this.props;

    const fromDay = viewWeek[0];
    const toDay = viewWeek[6];
    const fromDayMonthName = monthNames[fromDay.getMonth()];
    const toDayMonthName = monthNames[toDay.getMonth()];
    let fromDayToDay = null;
    if (fromDayMonthName === toDayMonthName) {
      fromDayToDay = fromDayMonthName + " " + fromDay.getDate() + " - " +
        toDay.getDate();
    } else {
      fromDayToDay = fromDayMonthName + " " + fromDay.getDate() + " - " +
        " " + toDayMonthName + " " + toDay.getDate();
    }

    return fromDayToDay;
  }

  render() {
    const {dayNames} = this.props;
    const viewWeek = this.getWeekDates();
    const fromDayToDay = this.getFromDayToDay(viewWeek);

    return (
      <div className="CalendarWeek">
        <div className="year-month">
          <div className='calendar-left' onClick={this.goBackInTime}>
            &#8678;
          </div>
            <h3>{fromDayToDay}</h3>
          <div className='calendar-right' onClick={this.goForwardInTime}>
            &#8680;
          </div>
        </div>
        <table className='table-calendar-week'>
          <tbody>
            <tr className='day-names'>
              {dayNames.map((day, index) => {
                const viewDay = viewWeek[index];
                const dayOfMonth = viewDay.getDate();
                const monthNum = (viewDay.getMonth() + 1);
                return (
                  <th key={day} scope="col" className="th-day-name">
                    {day} {monthNum}/{dayOfMonth}
                  </th>
                )
              })}
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = CalendarWeek;

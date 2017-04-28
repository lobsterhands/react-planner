var React = require('react');

class CalendarWeek extends React.Component {
  constructor(props) {
    super(props);

  }

  getWeekDates() {
    const {selectedDate} = this.props;
    const currentDate = selectedDate.getDate(); // 1-31
    const currentDay = selectedDate.getDay(); // 0-6

    const weekDates = new Array(7).fill(0).map((elem, index) => {
      let weekDate = new Date(
        selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()
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
      </div>
    )
  }
}

module.exports = CalendarWeek;

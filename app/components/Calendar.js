var React = require('react');
var PropTypes = require('prop-types');

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendarDays: new Array(42).fill(0),
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
  }

  getDaysInMonth(month, year) {
    // @month: 1-based (January = 1)
    return new Date(year, month, 0).getDate();
  }

  goBackInTime() {
    // Display previous month's calendar
    const date = this.state.date;
    const lastMonthDate = date.setMonth(date.getMonth() - 1);

    this.setState(function() {
      return (
        date: lastMonthDate
      );
    });
  }

  goForwardInTime() {
    // Display next month's calendar
    const date = this.state.date;
    const nextMonthDate = date.setMonth(date.getMonth() + 1);

    this.setState(function() {
      return (
        date: nextMonthDate
      );
    });
  }

  getFirstDayOfMonth() {
    // Returns zero-based integer representing the first day of the month
    // 0 = Sunday, 6 = Saturday
    const date = this.state.date;
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay;
  }

  getLastDayOfMonth() {
    // Returns zero-based integer representing the first day of the month
    // 0 = Sunday, 6 = Saturday
    const date = this.state.date;
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    return lastDay;
  }

  getDaysLastMonth() {
    // Returns the number of days for the previous month
    const date = this.state.date;
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    return firstDay;
  }

  renderDayNames() {
    const dayNames = this.state.dayNames.slice();

    return dayNames.map((name) => {
      return (
        <th key={name} scope="col" className="th-day-name">{ name }</th>
      )
    })
  }

  renderCalendarDays(firstDayOfMonth, daysInMonth, daysLastMonth) {
    // @firstDay: 0-based integer (0 = Sunday, 6 = Saturday)
    // @daysInMonth: 1-based number of days in the current month
    // @daysLastMonth: number days in previous month

    const daysThisMonth = this.state.calendarDays.map(function (day, index) {
      let dayNumber;
      let currentMonth = false;
      if (index < firstDayOfMonth) {
        dayNumber = daysLastMonth - (firstDayOfMonth - (index + 1));
      } else if (index >= firstDayOfMonth && index < (daysInMonth + firstDayOfMonth)) {
        dayNumber = index - (firstDayOfMonth - 1);
        currentMonth = true;
      } else {
        dayNumber = (index - (firstDayOfMonth - 1)) % daysInMonth;
      }

      return (
        <div key={index} className={"calendar-day " + (currentMonth ? "current-month" : "not-current-month") }>
          {dayNumber}
        </div>
      )
    })

    return daysThisMonth;
  }

  render() {
    const zeroBaseMonth = this.state.date.getMonth();
    const currentMonth = this.state.monthNames[zeroBaseMonth];

    const oneBaseMonth = zeroBaseMonth + 1;
    const currentYear = this.state.date.getFullYear();
    const daysInMonth = this.getDaysInMonth(oneBaseMonth, currentYear);

    const firstDayOfMonth = this.getFirstDayOfMonth();
    const lastDayOfMonth = this.getLastDayOfMonth();
    const daysLastMonth = this.getDaysLastMonth();
    const calendarDays = this.renderCalendarDays(firstDayOfMonth, daysInMonth, daysLastMonth);

    return (
      <div className="Calendar">
        <h2>Calendar</h2>

        <div className="year-month">
          <p className='calendar-left' onClick={() => this.goBackInTime()}>&#8678;</p>
          <h3>{currentMonth} {currentYear}</h3>
          <p className='calendar-right' onClick={() => this.goForwardInTime()}>&#8680;</p>
        </div>

        <table className='table-calendar'>
          <tbody>
            <tr>
              {this.renderDayNames()}
            </tr>
            <tr>
              {calendarDays.filter((elem, index) => {
                return index < 7;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr>
              {calendarDays.filter((elem, index) => {
                return index >= 7 && index < 14;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr>
              {calendarDays.filter((elem, index) => {
                return index >= 14 && index < 21;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr>
              {calendarDays.filter((elem, index) => {
                return index >= 21 && index < 28;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr>
              {calendarDays.filter((elem, index) => {
                return index >= 28 && index < 35;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr>
              {calendarDays.filter((elem, index) => {
                return index >= 35 && index < 42;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = Calendar;

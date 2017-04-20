var React = require('react');
var PropTypes = require('prop-types');

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendarDays: new Array(42).fill(0),
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
    };
  }

  // @month is 1-based (January = 1)
  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  goBackInTime() {
    const date = this.state.date;
    const lastMonthDate = date.setMonth(date.getMonth() - 1);

    this.setState(function() {
      return (
        date: lastMonthDate
      );
    });
  }

  goForwardInTime() {
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

  getLastMonthDays() {
    // Returns the number of days for the previous month
    const date = this.state.date;
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    return firstDay;
  }

  // renderDays(firstDay, daysInMonth, daysLastMonth) {
  //   // @firstDay: 0-based integer (0 = Sunday)
  //   // @lastDay: 0-based integer (0 = Sunday)
  //   // @daysLastMonth: number days in previous month
  //
  //   const calendarDays = this.state.calendarDays;
  //
  //   var calendarDaysSquares = [];
  //   for (var i = 0; i < calendarDays; i++) {
  //
  //     let day;
  //     if (i >= firstDay && i < daysInMonth) {
  //       day = i;
  //     } else if (i <= firstDay - 1) {
  //       day = i + 1;
  //     }
  //
  //     calendarDaysSquares.push(<div key={i} className='calendar-day'>
  //     {day}
  //     </div>);
  //   }
  //
  //   return calendarDaysSquares;
  // }

  render() {
    const currentDate = this.state.date;
    const monthNames = this.state.monthNames.slice();

    const zeroBaseMonth = currentDate.getMonth();
    const currentMonth = monthNames[zeroBaseMonth];
    const oneBaseMonth = zeroBaseMonth + 1;
    const currentYear = currentDate.getFullYear();
    const daysInMonth = this.getDaysInMonth(oneBaseMonth, currentYear);
    const firstDayOfMonth = this.getFirstDayOfMonth();
    const lastDayOfMonth = this.getLastDayOfMonth();
    const daysLastMonth = this.getLastMonthDays();

    return (
      <div className="Calendar">
        <h2>Calendar</h2>
          <p className='calendar-left' onClick={() => this.goBackInTime()}>&#8678;</p>
        <div className='calendar-right' onClick={() => this.goForwardInTime()}>
          <p>&#8680;</p>
        </div>

        <h3>{currentMonth} {currentYear}</h3>
        <p>First day: {firstDayOfMonth}</p>
        <p>Last day: {lastDayOfMonth}</p>
        <p>Last month's last day: {daysLastMonth}</p>
        <h4>Days in this month: {daysInMonth}</h4>
          {
            // this.renderDays(firstDayOfMonth, daysInMonth, daysLastMonth)
            this.state.calendarDays.map(function (day, index) {
              let calDay = 0;
              let belongsToCurrent;
              if (index < firstDayOfMonth) {
                calDay = daysLastMonth - (firstDayOfMonth - (index + 1));
                belongsToCurrent = false;
              } else if (index >= firstDayOfMonth && index < daysInMonth + firstDayOfMonth) {
                calDay = index - (firstDayOfMonth - 1);
                belongsToCurrent = true;
              } else {
                calDay = (index - (firstDayOfMonth - 1)) % daysInMonth;
                belongsToCurrent = false;
              }

              return (
                <div key={index} className={"calendar-day " + (belongsToCurrent ? "current" : "not-current") }>
                {calDay}
                </div>
              )
            })
          }
      </div>
    )
  }
}

module.exports = Calendar;

var React = require('react');
var PropTypes = require('prop-types');

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendarDays: 42,
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
    };
  }

  // @month is 1-based (January = 1)
  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  renderDays() {
    const calendarDays = this.state.calendarDays;

    var calendarDaysSquares = [];
    for (var i = 0; i < calendarDays; i++) {
      calendarDaysSquares.push(<div key={i} className='calendar-day'></div>);
    }

    return calendarDaysSquares;
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
    console.log(date.parse());
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

  render() {
    const currentDate = this.state.date;
    const monthNames = this.state.monthNames.slice();

    const zeroBaseMonth = currentDate.getMonth();
    const currentMonth = monthNames[zeroBaseMonth];
    const oneBaseMonth = zeroBaseMonth + 1;
    const currentYear = currentDate.getFullYear();
    const daysInMonth = this.getDaysInMonth(oneBaseMonth, currentYear);

    return (
      <div className="Calendar">
        <h2>Calendar</h2>
        <div className='calendar-left' onClick={() => this.goBackInTime()}>
          <p>&#8678;</p>
        </div>
        <div className='calendar-right' onClick={() => this.goForwardInTime()}>
          <p>&#8680;</p>
        </div>

        <h3>{currentMonth} {currentYear}</h3>
        <p>First day: {this.getFirstDayOfMonth() + ''}</p>
        <p>Last day: {this.getLastDayOfMonth() + ''}</p>
        <h4>Days in this month: {daysInMonth}</h4>
          {
            this.renderDays().map(function (div) {
              return div;
            })
          }
      </div>
    )
  }
}

module.exports = Calendar;

var React = require('react');
var PropTypes = require('prop-types');

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    var viewDate = new Date();
    viewDate.setDate(1);
    this.state = {
      trueDate: new Date(),
      viewDate: viewDate,
      // viewYear
      // viewMonth:
      // viewDay:
      calendarDays: new Array(42).fill(0),
    };
  }

  getDaysInMonth(month, year) {
    // @month: 1-based (January = 1)
    return new Date(year, month, 0).getDate();
  }

  goBackInTime() {
    // Display previous month's calendar
    const viewDate = this.state.viewDate;
    const newView = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, viewDate.getDate());

    this.setState(function () {
    return {
      viewDate: newView,
      }
    })
  }

  goForwardInTime() {
    // Display next month's calendar
    const viewDate = this.state.viewDate;
    const newView = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, viewDate.getDate());

    this.setState(function () {
    return {
      viewDate: newView,
      }
    })
  }

  getFirstDayOfMonth() {
    // Returns zero-based integer representing the first day of the month
    // 0 = Sunday, 6 = Saturday
    const viewDate = this.state.viewDate;
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    if (firstDay === 0) {
      return firstDay + 7;
    }
    return firstDay;
  }

  getLastDayOfMonth() {
    // Returns zero-based integer representing the first day of the month
    // 0 = Sunday, 6 = Saturday
    const viewDate = this.state.viewDate;
    const lastDay = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDay();
    return lastDay;
  }

  getDaysLastMonth() {
    // Returns the number of days for the previous month
    const viewDate = this.state.viewDate;
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();
    return firstDay;
  }

  renderDayNames() {
    return this.props.dayNames.map((name) => {
      return (
        <th key={name} scope="col" className="th-day-name">{ name }</th>
      )
    })
  }

  renderCalendarDays(viewDate, firstDayOfMonth, daysInMonth) {
    // @viewDate: this.state.viewDate
    // @firstDayOfMonth: 0-based (0 = Sunday ... 6 = Saturday)
    // @daysInMonth: number days in previous month

    const daysThisMonth = this.state.calendarDays.map((day, index) => {
      let calendarDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate());

      if (index < firstDayOfMonth) {
        calendarDate.setDate(viewDate.getDate() - (firstDayOfMonth - index));
      } else if (index >= firstDayOfMonth && index <= (daysInMonth + firstDayOfMonth)) {
        calendarDate.setDate(viewDate.getDate() + (index - firstDayOfMonth));
      } else {
        // dayNumber = (index - (firstDayOfMonth - 1)) % daysInMonth;
      }

      return (
          {calendarDate.getDate()}
        </div>
      )
    })

    return daysThisMonth;
  }

  render() {
    const zeroBaseMonth = this.state.viewDate.getMonth();
    const currentMonth = this.props.monthNames[zeroBaseMonth];

    const oneBaseMonth = zeroBaseMonth + 1;
    const currentYear = this.state.viewDate.getFullYear();

    const firstDayOfMonth = this.getFirstDayOfMonth();
    const lastDayOfMonth = this.getLastDayOfMonth();
    const daysLastMonth = this.getDaysLastMonth();

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

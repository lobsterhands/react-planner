var React = require('react');
var PropTypes = require('prop-types');

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    var trueDate = new Date(); // current date with hr, min, sec, ms zeroed out
    trueDate.setHours(0, 0, 0, 0);

    var viewDate = new Date(); // current date with day set to first day of month
    viewDate.setDate(1);

    this.state = {
      trueDate: trueDate,
      viewDate: viewDate,
      calendarDays: new Array(42).fill(0),
    };
  }

  getNumDaysInMonth(month, year) {
    // @month: 0-based (January = 0)
    return new Date(year, month + 1, 0).getDate();
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
    // Returns integer representing the first day of the month
    // 1 = Monday, 7 = Sunday
    const viewDate = this.state.viewDate;
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    if (firstDay === 0) { // Avoid having Sunday start the month in the zeroth calendar square
      return 7; // Sunday
    }
    return firstDay;
  }

  renderDayNames() {
    return this.props.dayNames.map((name) => {
      return (
        <th key={name} scope="col" className="th-day-name">{ name }</th>
      )
    })
  }

  renderCalendarDays(firstDayOfMonth, daysInMonth) {
    // @viewDate: this.state.viewDate
    // @firstDayOfMonth: 0-based (0 = Sunday ... 6 = Saturday)
    // @daysInMonth: number days in previous month

    const viewDate = this.state.viewDate;
    const trueDate = this.state.trueDate;

    const daysThisMonth = this.state.calendarDays.map((day, index) => {
      let calendarDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate());

      if (index < firstDayOfMonth) {
        calendarDate.setDate(viewDate.getDate() - (firstDayOfMonth - index));
      } else if (index >= firstDayOfMonth && index <= (daysInMonth + firstDayOfMonth)) {
        calendarDate.setDate(viewDate.getDate() + (index - firstDayOfMonth));
      } else {
        calendarDate.setDate(viewDate.getDate() + (index) - firstDayOfMonth);
      }

      let currentDay = false;
      let todayOrLater = false;
      let dayPast = false;

      if (calendarDate.getMonth() === viewDate.getMonth()) {
        if (calendarDate.getTime() >= (trueDate.getTime())) {
          todayOrLater = true;
          if (calendarDate.getTime() === trueDate.getTime()) {
            currentDay = true;
          }
        } else {
          dayPast = true;
        }
      }

      return (
        <div key={calendarDate} className={"calendar-day " +
            (currentDay ? "current-day " : "" ) +
            (todayOrLater ? "current-month " : "not-current-month ") +
            (dayPast ? "day-past " : "")}>
          {calendarDate.getDate()}
        </div>
      )
    })

    return daysThisMonth;
  }

  render() {
    const zeroBaseMonth = this.state.viewDate.getMonth();
    const currentMonth = this.props.monthNames[zeroBaseMonth];
    const currentYear = this.state.viewDate.getFullYear();

    const daysInMonth = this.getNumDaysInMonth(zeroBaseMonth, currentYear);
    const firstDayOfMonth = this.getFirstDayOfMonth();
    const calendarDays = this.renderCalendarDays(firstDayOfMonth, daysInMonth);

    return (
      <div className="Calendar">
        <h2>Calendar</h2>

        <div className="year-month">
          <div className='calendar-left' onClick={() => this.goBackInTime()}>
            <p>&#8678;</p>
          </div>
            <h3>{currentMonth} {currentYear}</h3>
          <div className='calendar-right' onClick={() => this.goForwardInTime()}>
            <p>&#8680;</p>
          </div>
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

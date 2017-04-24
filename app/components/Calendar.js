var React = require('react');
var PropTypes = require('prop-types');

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    var viewDate = new Date(); // current date with day set to first day of month
    viewDate.setDate(1);

    this.state = {
      viewDate: viewDate
    };
  }

  getCalendarDays() {
    const viewDate = this.state.viewDate;
    const trueDate = this.props.trueDate;
    const firstDayOfMonth = this.getFirstDayOfMonth();
    const daysInMonth = this.getNumDaysInMonth();

    var calendarDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate());
    const daysThisMonth = new Array(42).fill(0).map((day, index) => {
      if (index === 0) {
        calendarDate.setDate(viewDate.getDate() - (firstDayOfMonth - index));
      } else {
        calendarDate.setDate(calendarDate.getDate() + 1);
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

  getNumDaysInMonth() {
    // @month: 0-based (January = 0)
    const year = this.state.viewDate.getFullYear();
    const month = this.state.viewDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  goBackInTime() {
    // Display previous month's calendar
    const viewDate = this.state.viewDate;
    const newView = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, viewDate.getDate());
    const calendarDays = this.getCalendarDays(newView);

    this.setState(function () {
      return {
        viewDate: newView
      }
    })
  }

  goForwardInTime() {
    // Display next month's calendar
    const viewDate = this.state.viewDate;
    const newView = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, viewDate.getDate());

    this.setState(function () {
    return {
      viewDate: newView
      }
    })
  }

  renderDayNames() {
    return this.props.dayNames.map((name) => {
      return (
        <th key={name} scope="col" className="th-day-name">{ name }</th>
      )
    })
  }

  render() {
    const calendarDays = this.getCalendarDays();
    const currentYear = this.state.viewDate.getFullYear();
    const currentMonth = this.props.monthNames[this.state.viewDate.getMonth()];

    return (
      <div className="Calendar">
        <h2>Calendar</h2>

        <div className="year-month">
          <div className='calendar-left' onClick={() => this.goBackInTime()}>
            &#8678;
          </div>
            <h3>{currentMonth} {currentYear}</h3>
          <div className='calendar-right' onClick={() => this.goForwardInTime()}>
            &#8680;
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

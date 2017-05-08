const React = require('react');
const PropTypes = require('prop-types');

class CalendarMonth extends React.Component {

  constructor(props) {
    super(props);

    const viewDate = new Date(this.props.selectedDate.getTime()); // current date with day set to first day of month
    viewDate.setDate(1); // Set to first day of the month

    this.state = {
      viewDate: viewDate
    };

    this.goBackInTime = this.goBackInTime.bind(this);
    this.goForwardInTime = this.goForwardInTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {selectedDate} = nextProps;
    const viewDate = new Date(selectedDate.getTime());
    viewDate.setDate(1);

    this.setState({
      viewDate: viewDate
    })
  }

  getCalendarDays() {
    const {trueDate, todos, selectedDate} = this.props;
    const {viewDate} = this.state;

    const firstDayOfMonth = this.getFirstDayOfMonth();
    const daysInMonth = this.getNumDaysInMonth();

    const daysThisMonth = new Array(42).fill(0).map((day, index) => {
      let calendarDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate());

      let currentMonth = false;
      if (index < firstDayOfMonth) {
        calendarDate.setDate(viewDate.getDate() - (firstDayOfMonth - index));
      } else if (index >= firstDayOfMonth && index < (daysInMonth + firstDayOfMonth)) {
        calendarDate.setDate(viewDate.getDate() + index - firstDayOfMonth);
        currentMonth = true;
      } else {
        calendarDate.setDate(viewDate.getDate() + index - firstDayOfMonth);
      }

      let isCurrentDay = (calendarDate.getTime() === trueDate.getTime());
      let isSelected = (calendarDate.getTime() === selectedDate.getTime());
      let hasTodo = todos.some((todo) => {
        return (todo.date.valueOf() === calendarDate.valueOf());
      })

      return (
        <div key={calendarDate} onClick={() => this.props.updateSelectedDate(calendarDate)}
          className={"calendar-day " +
            (isCurrentDay ? "current-day " : "" ) +
            (currentMonth ? "current-month " : " ") +
            (hasTodo ? "has-todo " : "") +
            (isSelected ? "calendar-day-selected " : "")}>
            <p>{calendarDate.getDate()}</p>
        </div>
      )
    })

    return daysThisMonth;
  }

  getFirstDayOfMonth() {
    // Returns integer representing the first day of the month
    // 1 = Monday, 7 = Sunday
    const {viewDate} = this.state;
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    if (firstDay === 0) { // Avoid having Sunday start the month in the zeroth calendar square
      return 7; // Sunday
    }
    return firstDay;
  }

  getNumDaysInMonth() {
    const {viewDate} = this.state;
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  goBackInTime() {
    // Display previous month's calendar
    const {viewDate} = this.state;
    const newView = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, viewDate.getDate());

    this.setState(function () {
      return {
        viewDate: newView
      }
    })
  }

  goForwardInTime() {
    // Display next month's calendar
    const {viewDate} = this.state;
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
        <th key={name} scope="col" className="th-day-name">{name}</th>
      )
    })
  }

  render() {
    const calendarDays = this.getCalendarDays();
    const currentYear = this.state.viewDate.getFullYear();
    const currentMonth = this.props.monthNames[this.state.viewDate.getMonth()];

    return (
      <div className="Calendar">
        <div className="year-month">
          <div className='calendar-left' onClick={this.goBackInTime}>
            &#8678;
          </div>
            <h3>{currentMonth} {currentYear}</h3>
          <div className='calendar-right' onClick={this.goForwardInTime}>
            &#8680;
          </div>
        </div>

        <table className='table-calendar'>
          <tbody>
            <tr>
              {this.renderDayNames()}
            </tr>
            <tr className="tr-calendar-days">
              {calendarDays.filter((elem, index) => {
                return index < 7;
              }).map((elem, index) => {
                return <td  key={index}>{elem}</td>;
              })}
            </tr>
            <tr className="tr-calendar-days">
              {calendarDays.filter((elem, index) => {
                return index >= 7 && index < 14;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr className="tr-calendar-days">
              {calendarDays.filter((elem, index) => {
                return index >= 14 && index < 21;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr className="tr-calendar-days">
              {calendarDays.filter((elem, index) => {
                return index >= 21 && index < 28;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr className="tr-calendar-days">
              {calendarDays.filter((elem, index) => {
                return index >= 28 && index < 35;
              }).map((elem, index) => {
                return <td key={index}>{elem}</td>;
              })}
            </tr>
            <tr className="tr-calendar-days">
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

CalendarMonth.propTypes = {
  trueDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string,
      date: PropTypes.instanceOf(Date)
    })
  ).isRequired,
  updateSelectedDate: PropTypes.func.isRequired
}

module.exports = CalendarMonth;

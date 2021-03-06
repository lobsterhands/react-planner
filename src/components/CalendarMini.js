const React = require('react');
const PropTypes = require('prop-types');

class CalendarMini extends React.Component {
  constructor(props) {
    super(props);

    const {viewDate} = this.props;
    const newViewDate = new Date(viewDate);
    newViewDate.setDate(1);
    const viewWeek = this.getWeekDates(viewDate);

    this.state = {
      dayNamesAbbr: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      viewDate: newViewDate,
      viewDay: viewDate,
      viewWeek: viewWeek
    };
  }

  componentWillReceiveProps(nextProps) {
    const {viewDate} = nextProps;
    const newViewDate = new Date(viewDate.getTime());
    newViewDate.setDate(1);
    const viewWeek = this.getWeekDates(viewDate);

    this.setState({
      viewDate: newViewDate,
      viewDay: viewDate,
      viewWeek: viewWeek
    })
  }

  getWeekDates(viewDate) {
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

  getCalendarDays() {
    const {selectedDate, trueDate, todos} = this.props;
    const {viewDate, viewWeek} = this.state;

    const firstDayOfMonth = this.getFirstDayOfMonth();
    const daysInMonth = this.getNumDaysInMonth();

    const daysThisMonth = new Array(42).fill(0).map((day, index) => {
      let calendarDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate());

      let currentMonth = false;
      if (index < firstDayOfMonth) {
        calendarDate.setDate(viewDate.getDate() - (firstDayOfMonth - index));
      } else if (index >= firstDayOfMonth && index < (daysInMonth + firstDayOfMonth)) {
        calendarDate.setDate(viewDate.getDate() + (index - firstDayOfMonth));
        currentMonth = true;
      } else {
        calendarDate.setDate(viewDate.getDate() + (index - firstDayOfMonth));
      }

      let isSelected = (calendarDate.getTime() === selectedDate.getTime());
      let hasTodo = todos.some((todo) => {
        return (todo.date.valueOf() === calendarDate.valueOf());
      });

      let currentDay = false;
      if (calendarDate.getMonth() === viewDate.getMonth()) {
        if (calendarDate.getTime() === trueDate.getTime()) {
          currentDay = true;
        }
      }

      let isCurrentView;
      switch(this.props.calendarView) {
        case 'day':
          isCurrentView = (calendarDate.getTime() === this.state.viewDay.getTime());
          break;
        case 'week':
          isCurrentView = viewWeek.some((date) => {
            return calendarDate.getTime() === date.getTime()
          });
          break;
      }

      return (
        <div key={calendarDate} onClick={() => this.props.updateSelectedDate(calendarDate)}
          className={" calendar-day-mini" +
            (currentDay ? " current-day-mini" : "" ) +
            (currentMonth ? " current-month-mini" : " not-current-month-mini") +
            (isSelected ? " calendar-day-selected" : "") +
            (hasTodo ? " has-todo-mini" : "") +
            (isCurrentView ? " current-week-view" : "")
          }>
              {calendarDate.getDate()}
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
    const year =  viewDate.getFullYear();
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
    return this.state.dayNamesAbbr.map((name, index) => {
      return (
        <th key={index} scope="col" className="th-day-name-mini">{ name }</th>
      )
    })
  }

  render() {
    const calendarDays = this.getCalendarDays();
    const currentYear = this.state.viewDate.getFullYear();
    const currentMonth = this.props.monthNames[this.state.viewDate.getMonth()];

    return (
      <div className="CalendarMini">
        <div className="year-month-mini">
          <div className='calendar-left-mini' onClick={() => this.goBackInTime()}>
            &#8678;
          </div>
            <h3>{currentMonth} {currentYear}</h3>
          <div className='calendar-right-mini' onClick={() => this.goForwardInTime()}>
            &#8680;
          </div>
        </div>

        <table className='table-calendar-mini'>
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

CalendarMini.propTypes = {
  calendarView: PropTypes.string.isRequired,
  monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string,
      date: PropTypes.instanceOf(Date)
    })
  ).isRequired,
  trueDate: PropTypes.instanceOf(Date).isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  viewDate: PropTypes.instanceOf(Date).isRequired
}

module.exports = CalendarMini;

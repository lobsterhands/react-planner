const React = require('react');
const PropTypes = require('prop-types');
const ScheduleData = require('./ScheduleData');
const TimeSliceHeader = require('./TimeSliceHeader');

class CalendarWeek extends React.Component {
  constructor(props) {
    super(props);
    const {viewDate} = this.props;
    const viewWeek = this.getWeekDates(viewDate);

    this.state = {
      viewDate: viewDate,
      viewWeek: viewWeek
    }

    this.goBackInTime = this.goBackInTime.bind(this);
    this.goForwardInTime = this.goForwardInTime.bind(this);
    this.updateSelectedDate = this.props.updateSelectedDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {viewDate} = nextProps;
    const viewWeek = this.getWeekDates(viewDate);

    this.setState({
      viewDate: viewDate,
      viewWeek: viewWeek
    })
  }

  goBackInTime() {
    const {viewDate} = this.state;
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() - 7);
    this.props.updateViewDate(newViewDate);
  }

  goForwardInTime() {
    const {viewDate} = this.state;
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() + 7);
    this.props.updateViewDate(newViewDate);
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

  renderRows() {
    const {timeIncrements, todos, trueDate} = this.props;
    const {viewWeek} = this.state;
    const [sun, mon, tue, wed, thu, fri, sat] = viewWeek;

    let rowContainer = timeIncrements.map((timeSlice, index) => {
      return (
        <tr className={"calendar-schedule-row"} key={index}>
          <TimeSliceHeader key={timeSlice} timeSlice={timeSlice} />
          <ScheduleData date={sun} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 1} onClick={this.updateSelectedDate}/>
          <ScheduleData date={mon} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 2} onClick={this.updateSelectedDate}/>
          <ScheduleData date={tue} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 3} onClick={this.updateSelectedDate}/>
          <ScheduleData date={wed} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 4} onClick={this.updateSelectedDate}/>
          <ScheduleData date={thu} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 5} onClick={this.updateSelectedDate}/>
          <ScheduleData date={fri} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 6} onClick={this.updateSelectedDate}/>
          <ScheduleData date={sat} todos={todos} timeSlice={timeSlice} trueDate={trueDate} key={timeSlice + 7} onClick={this.updateSelectedDate}/>
        </tr>
      )
    })

    return rowContainer;
  }

  getFromDayToDay() {
    const {monthNamesAbbr} = this.props;
    const {viewWeek} = this.state;
    const fromDay = viewWeek[0];
    const toDay = viewWeek[6];
    const fromDayMonthName = monthNamesAbbr[fromDay.getMonth()];
    const toDayMonthName = monthNamesAbbr[toDay.getMonth()];
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
    const {viewWeek} = this.state;
    const fromDayToDay = this.getFromDayToDay();

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
              <th></th>
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
            {this.renderRows(viewWeek)}
          </tbody>
        </table>
      </div>
    )
  }
}

CalendarWeek.propTypes = {
  dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  monthNamesAbbr: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  timeIncrements: PropTypes.arrayOf(PropTypes.string).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string,
      date: PropTypes.instanceOf(Date)
    })
  ).isRequired,
  trueDate: PropTypes.instanceOf(Date).isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  updateViewDate: PropTypes.func.isRequired,
  viewDate: PropTypes.instanceOf(Date)
}

module.exports = CalendarWeek;

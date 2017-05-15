const React = require('react');
const PropTypes = require('prop-types');
const Modal = require('./Modal');
const ScheduledTodo = require('./ScheduledTodo');
const TimeSliceHeader = require('./TimeSliceHeader');

class CalendarDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewDate: this.props.viewDate
    }

    this.clickHandler = this.clickHandler.bind(this);
    this.goBackInTime = this.goBackInTime.bind(this);
    this.goForwardInTime = this.goForwardInTime.bind(this);
    this.updateCurrentModal = this.props.updateCurrentModal.bind(this);
    this.updateSelectedDate = this.props.updateSelectedDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      viewDate: nextProps.viewDate
    })
  }

  clickHandler(modalObject) {
    if (modalObject) {
      this.updateCurrentModal(<Modal todo={modalObject}/>);
    } else {
      this.updateCurrentModal(null);
    }
  }

  goBackInTime() {
    const {viewDate} = this.state;
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() - 1);
    this.props.updateViewDate(newViewDate);
  }

  goForwardInTime() {
    const {viewDate} = this.state;
    const newViewDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() + 1);
    this.props.updateViewDate(newViewDate);
  }

  renderDaySchedule() {
    const {timeIncrements, todos, trueDate, viewDate} = this.props;

    const todayTodos = todos.filter((todo) => {
      return todo.date.getTime() === viewDate.getTime();
    });

    const rowContainer = timeIncrements.map((timeSlice, index) => {
      const timeSliceTodos = todayTodos.filter((todo) => {
        return (todo.time === timeSlice)
      })

      let todoElements;
      if (timeSliceTodos.length) {
        todoElements = timeSliceTodos.map((todo) => {
          return (
            <ScheduledTodo
              key={todo.activity}
              onClick={this.clickHandler}
              timeSlice={timeSlice}
              todo={todo}
              trueDate={trueDate}
              updateCurrentModal={this.updateCurrentModal}
              updateSelectedDate={this.updateSelectedDate}
              viewDate={viewDate}
            />
          )
        })
      } else {
        todoElements =
          <ScheduledTodo
            onClick={this.clickHandler}
            timeSlice={timeSlice}
            todo={{}}
            trueDate={trueDate}
            updateCurrentModal={this.updateCurrentModal}
            updateSelectedDate={this.updateSelectedDate}
            viewDate={viewDate}
          />
      }

      return (
        <div className='day-schedule-todos-row' key={index}>
        <div className='day-schedule-time-slice'>{timeSlice}</div>
          {todoElements}
        </div>
      )
    })

    return rowContainer;
  }

  render() {
    const {viewDate} = this.state;
    const {dayNames, monthNamesAbbr} = this.props;
    const dayName = dayNames[viewDate.getDay()].slice(0,3);
    const monthName = monthNamesAbbr[viewDate.getMonth()];
    const dayNum = viewDate.getDate();

    return (
      <div className="CalendarDay">
        <div className="year-month">
          <div className='calendar-left' onClick={this.goBackInTime}>
            &#8678;
          </div>
            <h3>{dayName} {monthName} {dayNum}</h3>
          <div className='calendar-right' onClick={this.goForwardInTime}>
            &#8680;
          </div>
        </div>
        <div className='day-schedule-todos-container'>
          {this.renderDaySchedule()}
        </div>
      </div>
    )
  }
}

CalendarDay.propTypes = {
  dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  monthNamesAbbr: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  timeIncrements: PropTypes.arrayOf(PropTypes.string).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string,
      date: PropTypes.instanceOf(Date)
    })
  ).isRequired,
  trueDate: PropTypes.instanceOf(Date).isRequired,
  updateCurrentModal: PropTypes.func.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  updateViewDate: PropTypes.func.isRequired,
  viewDate: PropTypes.instanceOf(Date)
}

module.exports = CalendarDay;

const React = require('react');
const PropTypes = require('prop-types');
const CalendarHeader = require('./CalendarHeader');
const CalendarMini = require('./CalendarMini');
const CalendarDay = require('./CalendarDay');
const CalendarWeek = require('./CalendarWeek');
const CalendarMonth = require('./CalendarMonth');
const CalendarYear = require('./CalendarYear');
const CalendarViewPicker = require('./CalendarViewPicker');

const mockTodos = require('./mock-data/mockTodos');

class Planner extends React.Component {
  constructor() {
    super();
    const trueDate = new Date(); // Zero out time for exact comparison via .getTime()
    trueDate.setHours(0, 0, 0, 0);

    this.state = {
      calendarView: 'week',
      currentModal: null,
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      selectedDate: trueDate,
      todos: mockTodos,
      timeIncrements: ['12am', '12:30am', '1am', '1:30am','2am', '2:30am','3am', '3:30am','4am', '4:30am',
        '5am', '5:30am','6am', '6:30am','7am', '7:30am','8am', '8:30am','9am', '9:30am',
        '10am', '10:30am','11am', '11:30am','12pm', '12:30pm', '1pm', '1:30pm','2pm',
        '2:30pm','3pm', '3:30pm','4pm', '4:30pm', '5pm', '5:30pm','6pm', '6:30pm','7pm',
        '7:30pm','8pm', '8:30pm','9pm', '9:30pm','10pm', '10:30pm','11pm', '11:30pm'],
      trueDate: trueDate,
      viewDate: trueDate
    }

    this.clickHandler = this.clickHandler.bind(this);
    this.updateCurrentModal = this.updateCurrentModal.bind(this);
    this.updateSelectedDate = this.updateSelectedDate.bind(this);
    this.updateTrueDate = this.updateTrueDate.bind(this);
    this.updateViewDate = this.updateViewDate.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', () => {this.clickHandler()});
  }

  clickHandler() {
    const {currentModal} = this.state;

    if (currentModal) { // Make sure a modal exists before updating state
      const isClickOnModal = event.path.some((elem) => {
        return (elem.className === 'Modal');
      });

      if (!isClickOnModal) {
        this.setState({
          currentModal: null
        });
      }
    }
  }

  updateCurrentModal(modal) {
    this.setState({
      currentModal: modal
    });
  }

  updateSelectedDate(date) {
    if (date.getTime() !== this.state.selectedDate.getTime()) {
      this.setState({
        selectedDate: date,
        viewDate: date
      });
    }
  }

  updateTrueDate() {
    const trueDate = new Date();
    trueDate.setHours(0, 0, 0, 0);
    this.setState({
      trueDate: trueDate
    });
  }

  updateViewDate(date) {
    if (date.getTime() !== this.state.viewDate.getTime()) {
      this.setState({
        viewDate: date
      });
    }
  }

  updateView(viewCommand) {
    this.setState({
      calendarView: viewCommand
    });
  }

  render() {
    const {
      calendarView, currentModal, dayNames, monthNames, monthNamesAbbr, selectedDate,
      timeIncrements, todos, trueDate,  viewDate
    } = this.state;

    let displayCalendar = null;
    if (calendarView === 'month') {
      displayCalendar = (
        <CalendarMonth
          dayNames={dayNames}
          monthNames={monthNames}
          selectedDate={selectedDate}
          todos={todos}
          trueDate={trueDate}
          updateSelectedDate={this.updateSelectedDate}
          updateViewDate={this.updateViewDate}
          viewDate={viewDate}
        />
      );
    } else if (calendarView === 'day') {
      displayCalendar = (
        <CalendarDay
          dayNames={dayNames}
          monthNamesAbbr={monthNamesAbbr}
          onClick={this.clickHandler}
          timeIncrements={timeIncrements}
          todos={todos}
          trueDate={trueDate}
          updateCurrentModal={this.updateCurrentModal}
          updateSelectedDate={this.updateSelectedDate}
          updateViewDate={this.updateViewDate}
          viewDate={viewDate}
        />
      );
    } else if (calendarView === 'week') {
      displayCalendar = (
        <CalendarWeek
          dayNames={dayNames}
          monthNamesAbbr={monthNamesAbbr}
          timeIncrements={timeIncrements}
          todos={todos}
          trueDate={trueDate}
          updateSelectedDate={this.updateSelectedDate}
          updateViewDate={this.updateViewDate}
          viewDate={viewDate}
        />
      );
    } else if (calendarView === 'year') {
      // displayCalendar = <CalendarYear />;
    }

    return (
      <div className="Planner">
        <CalendarHeader monthNames={monthNames} updateTrueDate={this.updateTrueDate} />
        <CalendarViewPicker calendarView={calendarView} updateView={this.updateView} />
        {currentModal}

        <div className="calendar-container">
          <div className="calendar-mini-container">
            <CalendarMini
              calendarView={calendarView}
              monthNames={monthNames}
              selectedDate={selectedDate}
              todos={todos}
              trueDate={trueDate}
              updateSelectedDate={this.updateSelectedDate}
              viewDate={viewDate}
            />
          </div>
          {displayCalendar}
        </div>
      </div>
    )
  }
}

module.exports = Planner;

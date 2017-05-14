const React = require('react');
const PropTypes = require('prop-types');

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const date = new Date();

    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds(); // Update Planner's trueDate at Midnight
    if (hour === 0 && hour === min && min === sec) {
      this.props.updateTrueDate();
    }

    this.setState({
      date: new Date()
    });
  }

  render() {
    const currentDate = this.state.date.getDate();
    const currentMonth = this.props.monthNames[this.state.date.getMonth()];
    const currentYear = this.state.date.getFullYear();

    return (
      <div>
        <h2>{currentDate} {currentMonth} {currentYear}</h2>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

Clock.propTypes = {
  monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateTrueDate: PropTypes.func.isRequired,
}

module.exports = Clock;

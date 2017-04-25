var React = require('react');

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
    var date = new Date();

    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds(); // Update Planner's trueDate at Midnight
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
        <h2>Current Date: {currentDate} {currentMonth} {currentYear}</h2>
        <h2>Current Local Time: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

module.exports = Clock;

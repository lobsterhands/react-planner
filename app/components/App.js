var React = require('react');
var Planner = require('./Planner');

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Planner />
      </div>
    )
  }
}

module.exports = App;

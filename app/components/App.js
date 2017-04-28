const React = require('react');
const Planner = require('./Planner');

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

/*
Project: react-planner
Author: Lyle Denman
Author URI: http://lyledenman.com
====================================*/
'use strict';

const React = require('react');
const Planner = require('./Planner');

class App extends React.Component {
  render() {
    return (
      <Planner />
    )
  }
}

module.exports = App;

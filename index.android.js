'use strict';

var React = require('React');
var Navigator = require('Navigator');
const {AppRegistry} = require('react-native');

var IndexView = require('./js/Views/IndexView');
var DetailWeatherView = require('./js/Views/DetailView');

var Sunshine = React.createClass({
  renderScene: function(route, nav) {
    switch(route.name) {
      case 'index':
        return <IndexView name={route.name} navigator={nav}/>;
      case 'detail':
        return <DetailWeatherView name={route.name} navigator={nav} currentDetail={route.detail}></DetailWeatherView>;
    }
  },
  render: function() {
    return (
    <Navigator
      initialRoute={{name: 'index', index: 0}}
      renderScene={this.renderScene}/>
    );
  }
});

AppRegistry.registerComponent('Sunshine', () => Sunshine);

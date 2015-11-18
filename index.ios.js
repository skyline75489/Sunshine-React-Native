/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Navigator,
} = React;

var IndexView = require('./App/Views/IndexView');
var DetailWeatherView = require('./App/Views/DetailView');

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

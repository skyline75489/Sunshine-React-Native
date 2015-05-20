/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StatusBarIOS,
  Navigator,
} = React;

var IndexView = require('./App/Views/IndexView');
var DetailWeatherView = require('./App/Views/DetailView');
var SettingView = require('./App/Views/SettingView');

StatusBarIOS.setStyle(4);

var Sunshine = React.createClass({
  renderScene: function(route, nav) {
    switch(route.name) {
      case 'index':
        return <IndexView name={route.name} navigator={nav}/>;
      case 'detail':
        return <DetailWeatherView name={route.name} navigator={nav} currentDetail={route.detail}></DetailWeatherView>;
      case 'setting':
        return <SettingView name={route.name} navigator={nav}/>
    }
  },
  render: function() {
    return (
    <Navigator
      initialRoute={{name: 'index', index: 0}}
      renderScene={this.renderScene}
      configureScene={(route) => {
          if (route.sceneConfig) {
              return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight
        }
      }/>
    );
  }
});

AppRegistry.registerComponent('Sunshine', () => Sunshine);

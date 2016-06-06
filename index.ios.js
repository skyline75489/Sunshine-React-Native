import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import IndexView from './js/Views/IndexView';
import DetailWeatherView from './js/Views/DetailView';

class Sunshine extends Component {
  renderScene(route, nav) {
    switch(route.name) {
      case 'index':
        return <IndexView name={route.name} navigator={nav}/>;
      case 'detail':
        return <DetailWeatherView name={route.name} navigator={nav} currentDetail={route.detail}></DetailWeatherView>;
    }
  }
  render() {
    return (
    <Navigator
      initialRoute={{name: 'index', index: 0}}
      renderScene={this.renderScene}/>
    );
  }
};

AppRegistry.registerComponent('Sunshine', () => Sunshine);

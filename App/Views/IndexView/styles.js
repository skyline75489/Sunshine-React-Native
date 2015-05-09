'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  scrollViewUp: {
    backgroundColor: '#64c2f4', 
    height: 480
  },
  scrollView: {
    backgroundColor: '#EEEEEE',
  },
  container: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    height: 60,
  },
  leftContainer: {
    paddingLeft: 20,
    flex: 0.8,
  },
  middleContainer: {
    flex: 2.2,
  },
  rightContainer: { 
    flex: 1, 
  },
  listView: { 
    paddingTop: 10, 
    backgroundColor: '#EEEEEE', 
  },
  bigDate: {
    color: '#646464',
    fontSize: 22,
  },
  smallWeather: {
    color: '#646464',
    fontSize: 14,
  },
  bigTemp: {
    fontSize: 22,
    textAlign: 'center',
  },
  smallTemp: {
    color: '#646464',
    fontSize: 14,
    textAlign: 'center',
  },
  weatherIcon: {
    width: 40,
    height: 40,
  }
});


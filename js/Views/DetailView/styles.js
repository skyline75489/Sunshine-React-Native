'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');

module.exports = StyleSheet.create({
  detailContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
  },
  container: {
    flex: 0.7,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
  },
  todayLeftContainer: {
    flex: 1.1,
    paddingLeft: 40,
  },
  todayRightContainer: {
    paddingTop: 40,
    flex: 0.9,
  },
  todayArt: {
    width: 110,
    height: 110,
  },
  todayWeatherMain: {
    color:'#6E6E6E',
    fontSize: 18,
    paddingLeft: 35,
  },
  todayMoreDetailView: {
    flex: 1.3,
    backgroundColor: '#EEEEEE',
    paddingTop: 20,
    paddingLeft: 40
  },
  todayMoreDetail: {
    color:'#6E6E6E',
    fontSize: 22,
  },
  todayDate: {
    paddingTop: 40,
    color: '#6E6E6E',
    fontSize: 20,
  },
  todayMaxTemp: {
    color: '#6E6E6E',
    fontSize: 60,
  },
  todayMinTemp: {
    color: '#6E6E6E',
    fontSize: 30,
  },
});

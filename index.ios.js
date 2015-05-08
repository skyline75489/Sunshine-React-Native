/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Utils = require('./utils.js');

var {
  AppRegistry,
  StyleSheet,
  Image, 
  ListView,
  Text,
  View,
} = React;

var city = 'Harbin'
var format = 'json';
var units = 'metric';
var numDays = 7;

var FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

var parameters = {
  'q': city,
  'mode': format,
  'units': units,
  'cnt': numDays
};

var dayMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

var weatherIcon = {
  ic_clear: require('image!ic_clear'),
  ic_cloudy: require('image!ic_cloudy'),
  ic_fog: require('image!ic_fog'),
  ic_light_clouds: require('image!ic_light_clouds'),
  ic_light_rain: require('image!ic_light_rain'),
  ic_rain: require('image!ic_rain'),
  ic_snow: require('image!ic_snow'),
  ic_storm: require('image!ic_storm'),
};

var requestURL = Utils.buildUrl(FORECAST_BASE_URL, parameters);

console.log(requestURL);

var Sunshine = React.createClass({
  getInitialState: function() { 
    return { 
      dataSource: new ListView.DataSource({ 
        rowHasChanged: (row1, row2) => row1 !== row2, 
      }), loaded: false, 
    }; 
  },
  
  componentDidMount: function() { 
    this.fetchData(); 
  },
  
  fetchData: function() { 
    fetch(requestURL) 
      .then((response) => response.json()) 
      .then((responseData) => { 
        this.setState({ 
          dataSource: 
          this.state.dataSource.cloneWithRows(responseData.list), 
          loaded: true, 
        }); 
      }) 
      .done();
  },
  
  render: function() {
    if (!this.state.loaded) { 
      return this.renderLoadingView(); 
    }
    return (
      <ListView
       dataSource={this.state.dataSource}
       renderRow={this.renderRow} 
       style={styles.listView} />
    );
  },
  
  renderRow: function(data) {
    var icon = Utils.getIconForWeather(data.weather[0].id);
    var iconSource = weatherIcon[icon];
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
      <Image style={styles.weatherIcon} source={iconSource}></Image>
        </View>
        <View style={styles.middleContainer}>
           <Text style={styles.bigDate}>
             {dayMap[new Date(data.dt * 1000).getDay()]}
           </Text>
           <Text style={styles.smallWeather}>
            {data.weather[0].main}
           </Text>
        </View>
        
        <View style={styles.rightContainer}>
           <Text style={styles.bigTemp}>
            {data.temp.max.toFixed(0)}º
           </Text>
           <Text style={styles.smallTemp}>
            {data.temp.min.toFixed(0)}º
           </Text>
        </View>
      </View>
    )
  },
  
  renderLoadingView: function() { 
    console.log("Loading")
    return ( 
      <View style={styles.container}> 
        <Text> Loading... 
        </Text> 
      </View> ); 
  },
});

var styles = StyleSheet.create({
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
    paddingTop: 40, 
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

AppRegistry.registerComponent('Sunshine', () => Sunshine);

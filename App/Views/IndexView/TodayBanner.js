'use strict';

var React = require('react-native');

var {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} = React;

var Utils = require('../../Utils/functions.js');

var todayWeatherArt = {
  art_clear: require('../../Image/art_clear.png'),
  art_clouds: require('../../Image/art_clouds.png'),
  art_fog: require('../../Image/art_fog.png'),
  art_light_clouds: require('../../Image/art_light_rain.png'),
  art_rain: require('../../Image/art_rain.png'),
  art_snow: require('../../Image/art_snow.png'),
  art_storm: require('../../Image/art_storm.png'),
};

var TodayBanner = React.createClass({
  onPress: function() {
    this.props.navigator.push({
      name: 'detail',
      detail: this.props.today
    });
  },

  render: function() {
    var today = new Date();

    var todayArt = Utils.getArtForTodayWeather(this.props.today.weather[0].id);
    var todayArtSource = todayWeatherArt[todayArt];

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
      <View style={todayStyles.todayContainer}>
        <View style={todayStyles.todayLeftContainer}>
          <Text style={todayStyles.todayDate}>
            Today, {Utils.getMonthName(today.getMonth())} {today.getDate()}
          </Text>
          <Text style={todayStyles.todayMaxTemp}>
            {this.props.today.temp.max.toFixed(0)}º
          </Text>
          <Text style={todayStyles.todayMinTemp}>
            {this.props.today.temp.min.toFixed(0)}º
          </Text>
        </View>

        <View style={todayStyles.todayRightContainer}>
            <Image source={todayArtSource} style={todayStyles.todayArt}>
            </Image>
            <Text style={todayStyles.todayWeatherMain}>
            {this.props.today.weather[0].main}
            </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
    );
  }
});


var todayStyles = StyleSheet.create({
  todayContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#64c2f4',
    height: 200,
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
    color:'white',
    fontSize: 18,
    paddingLeft: 35,
  },
  todayDate: {
    paddingTop: 40,
    color: 'white',
    fontSize: 20,
  },
  todayMaxTemp: {
    color: 'white',
    fontSize: 60,
  },
  todayMinTemp: {
    color: 'white',
    fontSize: 30,
  },
});

module.exports = TodayBanner;

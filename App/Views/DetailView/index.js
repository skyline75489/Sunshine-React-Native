'use strict';

var React = require('react-native');

var {
  View,
  Text,
  Image
} = React;

var detailStyles = require('./styles');
var Utils = require('../../Utils/functions.js');

var todayWeatherArt = {
  art_clear: require('image!art_clear'),
  art_clouds: require('image!art_clouds'),
  art_fog: require('image!art_fog'),
  art_light_clouds: require('image!art_light_rain'),
  art_rain: require('image!art_rain'),
  art_snow: require('image!art_snow'),
  art_storm: require('image!art_storm'),
};

var DetailWeatherView = React.createClass({
  render: function() {
    var today = new Date();
    var todayArt = Utils.getArtForTodayWeather(this.props.currentDetail.weather[0].id);
    var todayArtSource = todayWeatherArt[todayArt];
    return (
      <View style={detailStyles.detailContainer}>
      <View style={detailStyles.container}>
        <View style={detailStyles.todayLeftContainer}>
          <Text style={detailStyles.todayDate}>
            Today, {Utils.getMonthName(today.getMonth())} {today.getDate()}
          </Text>
          <Text style={detailStyles.todayMaxTemp}>
            {this.props.currentDetail.temp.max.toFixed(0)}º
          </Text>
          <Text style={detailStyles.todayMinTemp}>
            {this.props.currentDetail.temp.min.toFixed(0)}º
          </Text>
        </View>

        <View style={detailStyles.todayRightContainer}>
            <Image source={todayArtSource} style={detailStyles.todayArt}>
            </Image>
            <Text style={detailStyles.todayWeatherMain}>
            {this.props.currentDetail.weather[0].main}
            </Text>
        </View>
      </View>
      <View style={detailStyles.todayMoreDetailView}>
        <Text style={detailStyles.todayMoreDetail}>Humidity: {this.props.currentDetail.humidity} %</Text>
        <Text style={detailStyles.todayMoreDetail}>Pressure: {this.props.currentDetail.pressure} hPa</Text>
        <Text style={detailStyles.todayMoreDetail}>Wind: {this.props.currentDetail.speed} km/h NE</Text>
      </View>
      </View>
    );
  }
});

module.exports = DetailWeatherView;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import {getArtForTodayWeather, getMonthName} from '../../Utils/functions.js';

const todayWeatherArt = {
  art_clear: require('../../Image/art_clear.png'),
  art_clouds: require('../../Image/art_clouds.png'),
  art_fog: require('../../Image/art_fog.png'),
  art_light_clouds: require('../../Image/art_light_rain.png'),
  art_rain: require('../../Image/art_rain.png'),
  art_snow: require('../../Image/art_snow.png'),
  art_storm: require('../../Image/art_storm.png'),
};

class DetailWeatherView extends Component {
  render() {
    const today = new Date();
    const todayArt = getArtForTodayWeather(this.props.currentDetail.weather[0].id);
    const todayArtSource = todayWeatherArt[todayArt];
    return (
      <View style={styles.detailContainer}>
      <View style={styles.container}>
        <View style={styles.todayLeftContainer}>
          <Text style={styles.todayDate}>
            Today, {getMonthName(today.getMonth())} {today.getDate()}
          </Text>
          <Text style={styles.todayMaxTemp}>
            {this.props.currentDetail.temp.max.toFixed(0)}º
          </Text>
          <Text style={styles.todayMinTemp}>
            {this.props.currentDetail.temp.min.toFixed(0)}º
          </Text>
        </View>

        <View style={styles.todayRightContainer}>
            <Image source={todayArtSource} style={styles.todayArt}>
            </Image>
            <Text style={styles.todayWeatherMain}>
            {this.props.currentDetail.weather[0].main}
            </Text>
        </View>
      </View>
      <View style={styles.todayMoreDetailView}>
        <Text style={styles.todayMoreDetail}>Humidity: {this.props.currentDetail.humidity} %</Text>
        <Text style={styles.todayMoreDetail}>Pressure: {this.props.currentDetail.pressure} hPa</Text>
        <Text style={styles.todayMoreDetail}>Wind: {this.props.currentDetail.speed} km/h NE</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default DetailWeatherView;

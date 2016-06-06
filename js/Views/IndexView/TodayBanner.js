import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
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

class TodayBanner extends Component {
  onPress = () => {
    this.props.navigator.push({
      name: 'detail',
      detail: this.props.today
    });
  }

  render() {
    const today = new Date();

    const todayArt = getArtForTodayWeather(this.props.today.weather[0].id);
    const todayArtSource = todayWeatherArt[todayArt];

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
      <View style={styles.todayContainer}>
        <View style={styles.todayLeftContainer}>
          <Text style={styles.todayDate}>
            Today, {getMonthName(today.getMonth())} {today.getDate()}
          </Text>
          <Text style={styles.todayMaxTemp}>
            {this.props.today.temp.max.toFixed(0)}º
          </Text>
          <Text style={styles.todayMinTemp}>
            {this.props.today.temp.min.toFixed(0)}º
          </Text>
        </View>

        <View style={styles.todayRightContainer}>
            <Image source={todayArtSource} style={styles.todayArt}>
            </Image>
            <Text style={styles.todayWeatherMain}>
            {this.props.today.weather[0].main}
            </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
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

export default TodayBanner;

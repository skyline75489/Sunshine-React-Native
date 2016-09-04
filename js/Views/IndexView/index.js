import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  NetInfo,
  ActivityIndicator,
} from 'react-native';

import {getIconForWeather, getDayName} from '../../Utils/functions.js';
import {FAKE_DATA, REQUEST_URL} from '../../Network/api.js';
import TodayBanner from './TodayBanner.js';

const STORAGE_KEY = '@LocalData:data';

const weatherIcon = {
  ic_clear: require('../../Image/ic_clear.png'),
  ic_cloudy: require('../../Image/ic_cloudy.png'),
  ic_fog: require('../../Image/ic_fog.png'),
  ic_light_clouds: require('../../Image/ic_light_clouds.png'),
  ic_light_rain: require('../../Image/ic_light_rain.png'),
  ic_rain: require('../../Image/ic_rain.png'),
  ic_snow: require('../../Image/ic_snow.png'),
  ic_storm: require('../../Image/ic_storm.png'),
};

class IndexView extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      today: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    /*
    NetInfo.fetch().done((reach) => {
      console.log('Initial: ' + reach);
      if (reach == 'none') {
        this.useLocalStorage();
      } else {
        this.fetchData();
      }
    });*/
    // Fake data down here
    this.setState({
      today: FAKE_DATA.list.shift(),
      dataSource: this.state.dataSource.cloneWithRows(FAKE_DATA.list),
      loaded: true,
    });
  }
  
  useLocalStorage() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        var v = JSON.parse(value);
        this.setState({
          today: v.list.shift(),
          dataSource: this.state.dataSource.cloneWithRows(v.list),
          loaded: true,
        });
      })
      .done();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseData))
         .then(() => {
          console.log("Writing to local storage");
         })
         .catch((error) => {
          console.log(error);
         })
         .done();
        this.setState({
          today: responseData.list.shift(),
          dataSource: this.state.dataSource.cloneWithRows(responseData.list),
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.useLocalStorage();
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <ListView
         dataSource={this.state.dataSource}
         renderHeader={this.renderHeader}
         renderRow={this.renderRow}
         style={styles.listView} />
    );
  }

  renderHeader = () => {
    return (
      <TodayBanner today={this.state.today} navigator={this.props.navigator} style={styles.header}/>
    );
  }
  
  renderRow = (data) => {
    var icon = getIconForWeather(data.weather[0].id);
    var iconSource = weatherIcon[icon];
    return (
      <TouchableHighlight onPress={()=>{
        this.props.navigator.push({
          name: 'detail',
          detail: data
        });
      }}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
      <Image style={styles.weatherIcon} source={iconSource}></Image>
        </View>
        <View style={styles.middleContainer}>
           <Text style={styles.bigDate}>
             {getDayName(new Date(data.dt * 1000).getDay())}
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
      </TouchableHighlight>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.horizontal}>
      <ActivityIndicator
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#EEEEEE',
  },
  header: {
    backgroundColor: '#64c2f4',
    height: 100,
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
  },
  centering: {
    paddingTop: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default IndexView;

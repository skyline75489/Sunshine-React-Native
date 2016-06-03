'use strict';

var React = require('React');
var View = require('View');
var Image = require('Image');
var Text = require('Text');
var ListView = require('ListView');
var ScrollView = require('ScrollView');
var TouchableHighlight = require('TouchableHighlight');
var AsyncStorage = require('AsyncStorage');
var NetInfo = require('NetInfo');
var ActivityIndicatorIOS = require('ActivityIndicatorIOS');
var styles = require('./styles');
var Utils = require('../../Utils/functions.js');
var api = require('../../Network/api.js');
var TodayBanner = require('./TodayBanner.js');

var STORAGE_KEY = '@LocalData:data';

var weatherIcon = {
  ic_clear: require('../../Image/ic_clear.png'),
  ic_cloudy: require('../../Image/ic_cloudy.png'),
  ic_fog: require('../../Image/ic_fog.png'),
  ic_light_clouds: require('../../Image/ic_light_clouds.png'),
  ic_light_rain: require('../../Image/ic_light_rain.png'),
  ic_rain: require('../../Image/ic_rain.png'),
  ic_snow: require('../../Image/ic_snow.png'),
  ic_storm: require('../../Image/ic_storm.png'),
};

var IndexView = React.createClass({
  getInitialState: function() {
    return {
      today: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
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
      today: api.FAKE_DATA.list.shift(),
      dataSource: this.state.dataSource.cloneWithRows(api.FAKE_DATA.list),
      loaded: true,
    });
  },
  useLocalStorage: function() {
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

  },

  fetchData: function() {
    fetch(api.REQUEST_URL)
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
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollViewUp}>
        </View>
        <TodayBanner today={this.state.today} navigator={this.props.navigator}>
        </TodayBanner>
        <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderRow}
         style={styles.listView} />
      </ScrollView>
    );
  },

  renderRow: function(data) {
    var icon = Utils.getIconForWeather(data.weather[0].id);
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
             {Utils.getDayName(new Date(data.dt * 1000).getDay())}
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
  },

  renderLoadingView: function() {
    return (
      <View style={styles.horizontal}>
      <ActivityIndicatorIOS
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
      </View>
    );
  },
});

module.exports = IndexView;

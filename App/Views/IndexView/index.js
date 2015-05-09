'use strict';

var React = require('react-native');

var {
  View, 
  Text,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  NetInfo,
} = React;

var styles = require('./styles');
var Utils = require('../../Utils/functions.js');
var api = require('../../Network/api.js');
var TodayBanner = require('./TodayBanner.js');

var STORAGE_KEY = '@LocalData:data';

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

    NetInfo.reachabilityIOS.fetch().done((reach) => {
      console.log('Initial: ' + reach);
      if (reach == 'none') {
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
      } else {
          this.fetchData(); 
      }
    });
    // Fake data down here
    /* this.setState({ 
      today: api.FAKE_DATA.list.shift(),
      dataSource: this.state.dataSource.cloneWithRows(api.FAKE_DATA.list), 
      loaded: true, 
    });*/
  },
  
  fetchData: function() { 
    fetch(api.REQUEST_URL) 
      .then((response) => response.json()) 
      .then((responseData) => { 
        this.setState({ 
          today: responseData.list.shift(),
          dataSource: this.state.dataSource.cloneWithRows(responseData.list), 
          loaded: true, 
        }); 
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseData))
         .then(() => {
          console.log("Writing");
         })
         .catch((error) => {})
         .done();
      }) 
      .done();
  },
  
  render: function() {
    if (!this.state.loaded) { 
      return this.renderLoadingView(); 
    }
    return (
      <ScrollView style={styles.scrollView} contentInset={{top: -480}}>
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
      <View style={styles.container}> 
        <Text> Loading... 
        </Text> 
      </View> 
    ); 
  },
});

module.exports = IndexView;

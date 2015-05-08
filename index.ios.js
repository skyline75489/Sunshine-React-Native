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
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Navigator,
  Text,
  View,
} = React;

var city = 'Harbin'
var format = 'json';
var units = 'metric';
var numDays = 7;

var FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

var FAKE_DATA = JSON.parse('{"cod":"200","message":0.0219,"city":{"id":6058560,"name":"London","coord":{"lon":-81.23304,"lat":42.983391},"country":"CA","population":0,"sys":{"population":0}},"cnt":7,"list":[{"dt":1431018000,"temp":{"day":15.88,"min":9.18,"max":15.88,"night":9.18,"eve":15.88,"morn":15.88},"pressure":994.67,"humidity":60,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01n"}],"speed":1.84,"deg":200,"clouds":0},{"dt":1431104400,"temp":{"day":28.7,"min":16.81,"max":28.7,"night":19.23,"eve":24.54,"morn":16.81},"pressure":993.32,"humidity":53,"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"speed":5.41,"deg":217,"clouds":20},{"dt":1431190800,"temp":{"day":28.46,"min":17.57,"max":29.06,"night":17.57,"eve":27.14,"morn":19.64},"pressure":992.84,"humidity":52,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":9.36,"deg":192,"clouds":12,"rain":5.04},{"dt":1431277200,"temp":{"day":19.43,"min":12.92,"max":19.43,"night":17.08,"eve":18.64,"morn":12.92},"pressure":998.84,"humidity":0,"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"speed":1.79,"deg":54,"clouds":48,"rain":20.28},{"dt":1431363600,"temp":{"day":20.28,"min":10.82,"max":20.28,"night":10.82,"eve":17.88,"morn":17.55},"pressure":991.94,"humidity":0,"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"speed":8.35,"deg":215,"clouds":57,"rain":14.78},{"dt":1431450000,"temp":{"day":12.17,"min":4.74,"max":12.17,"night":4.74,"eve":8.77,"morn":9.8},"pressure":998.79,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.77,"deg":289,"clouds":53,"rain":1.22},{"dt":1431536400,"temp":{"day":15.34,"min":6.07,"max":15.34,"night":6.79,"eve":15.11,"morn":6.07},"pressure":1007.8,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":6.51,"deg":264,"clouds":0}]}');

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

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

var todayWeatherArt = {
  art_clear: require('image!art_clear'),
  art_clouds: require('image!art_clouds'),
  art_fog: require('image!art_fog'),
  art_light_clouds: require('image!art_light_rain'),
  art_rain: require('image!art_rain'),
  art_snow: require('image!art_snow'),
  art_storm: require('image!art_storm'),
};

var requestURL = Utils.buildUrl(FORECAST_BASE_URL, parameters);

var DetailWeather = React.createClass({
  render: function() {
    var today = new Date();
    
    console.log(this.props.currentDetail)
    var todayArt = Utils.getArtForTodayWeather(this.props.currentDetail.weather[0].id);
    var todayArtSource = todayWeatherArt[todayArt];
    return (
      <View style={detailStyles.detailContainer}>
      <View style={detailStyles.container}>
        <View style={detailStyles.todayLeftContainer}>
          <Text style={detailStyles.todayDate}>
            Today, {monthNames[today.getMonth()]} {today.getDate()}
          </Text>
          <Text style={detailStyles.todayMaxTemp}>
            {this.props.currentDetail.temp.max.toFixed(0)}º
          </Text>
          <Text style={detailStyles.todayMinTemp}>
            {this.props.currentDetail.temp.min.toFixed(0)}º
          </Text>
        </View>

        <View style={detailStyles.todayRightContainer}>
            <Image source={todayArtSource} style={todayStyles.todayArt}>
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
            Today, {monthNames[today.getMonth()]} {today.getDate()}
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



var IndexView = React.createClass({
  getInitialState: function() { 
    return {
      name: '',
      navigator: null,
      today: {},
      dataSource: new ListView.DataSource({ 
        rowHasChanged: (row1, row2) => row1 !== row2, 
      }), 
      loaded: false, 
    }; 
  },
  
  componentDidMount: function() { 
    this.fetchData(); 
    // Fake data down here
    /*this.setState({ 
      today: FAKE_DATA.list.shift(),
      dataSource: this.state.dataSource.cloneWithRows(FAKE_DATA.list), 
      loaded: true, 
    });*/
  },
  
  fetchData: function() { 
    fetch(requestURL) 
      .then((response) => response.json()) 
      .then((responseData) => { 
        this.setState({ 
          today: responseData.list.shift(),
          dataSource: this.state.dataSource.cloneWithRows(responseData.list), 
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
      <ScrollView style={styles.scrollView}>
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

var Sunshine = React.createClass({
  renderScene: function(route, nav) {
    switch(route.name) {
      case 'index':
        return <IndexView name={route.name} navigator={nav}/>;
      case 'detail':
        return <DetailWeather name={route.name} navigator={nav} currentDetail={route.detail}></DetailWeather>;
    }
  },
  render: function() {
    return (
    <Navigator
      initialRoute={{name: 'index', index: 0}}
      renderScene={this.renderScene}/>
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

var detailStyles = StyleSheet.create({
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

var styles = StyleSheet.create({
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

AppRegistry.registerComponent('Sunshine', () => Sunshine);

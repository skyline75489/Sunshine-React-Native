'use strict';

var React = require('react-native');

var {
  View, 
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
} = React;

var Menu = require('../MenuView');

var SideMenu = require('react-native-side-menu');
var styles = require('./styles');

var SettingView = React.createClass({
  render: function() {
  	var menu = <Menu navigator={this.props.navigator} name={this.props.name}/>;
    return (
     <SideMenu menu={menu}>
       <View>
        <Text>SettingView</Text>
       </View>
     </SideMenu>
    );
  }
});

module.exports = SettingView;

'use strict';

var React = require('react-native');

var {
  View, 
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
} = React;

var TimerMixin = require('react-timer-mixin');
var styles = require('./styles');

var Menu = React.createClass({
  mixins: [TimerMixin],
  goHome: function() {
    if (this.props.name === 'index') {
      this.props.menuActions.close();
    } else {
      this.props.navigator.replace({
        name: 'index',
      });
    }
  },
  goToSetting: function() {
    console.log(this.props.animation);
    if (this.props.name === 'setting') {
      this.props.menuActions.close();
    } else {
      console.log(this.props.animation);

      this.props.menuActions.close();

      console.log(this.props.animation);

      //this.props.navigator.replace({
      //  name: 'setting',
      //});
    }
  },
  render: function() {
    return (
      <View>
      <Text onPress={this.goHome}>Home</Text>
      <Text onPress={this.goToSetting}>Setting</Text>
      </View>
    );
  }
});

module.exports = Menu;

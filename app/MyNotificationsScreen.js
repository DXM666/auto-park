import React, {
  Component,
  PropTypes
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AppRegistry,
  TouchableHighlight
} from 'react-native';

export class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Notifications',
      icon: ({ tintColor }) => (
        <Image
          source={require('./img/naga.jpg')}
          style={[styles.tabIcon, {tintColor: tintColor}]}
        />
      ),
    }),
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
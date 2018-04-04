import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Root from './root';
export default class CountersDemo extends Component {
  render() {
    return (
      <Root />
    );
  }
}


AppRegistry.registerComponent('app', () => CountersDemo);


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component,
  PropTypes
} from 'react';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
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
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';

import { getCurrentPosition_Send } from '../../action/parkactions';


class Park extends Component {
  constructor() {
    super();
    this.trafficEnabled = false;
    this.baiduHeatMapEnabled = false;
    this.mayType = MapTypes.NORMAL
  }
  componentDidMount() { // 获取位置
    this.props.getCurrentPosition()
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <MapView
          trafficEnabled={this.trafficEnabled}
          baiduHeatMapEnabled={this.baiduHeatMapEnabled}
          zoom={this.props.zoom}
          mapType={this.mapType}
          center={this.props.center}
          markers={this.props.markers}
          style={styles.map}
          onMarkerClick={(e) => {
            console.warn(JSON.stringify(e));
          }}
          onMapClick={(e) => {
          }}
        >
        </MapView> */}

        <View style={styles.row}>
          <Button title="Normal" onPress={() => {
            this.mapType = MapTypes.NORMAL
          }} />
          <Button style={styles.btn} title="Satellite" onPress={() => {
            this.mapType = MapTypes.SATELLITE
          }} />

          <Button style={styles.btn} title="Locate" onPress={() => {
            console.warn('center', this.props.center);
            this.props.getCurrentPosition_Send();
          }} />
        </View>

        <View style={styles.row}>
          <Button title="Zoom+" onPress={() => {
            this.setState({
              zoom: this.props.zoom + 1
            });
          }} />
          <Button title="Zoom-" onPress={() => {
            if (this.props.zoom > 0) {
              this.setState({
                zoom: this.props.zoom - 1
              });
            }

          }} />
        </View>

        <View style={styles.row}>
          <Button title="Traffic" onPress={() => {
            this.setState({
              trafficEnabled: !this.trafficEnabled
            });
          }} />

          <Button title="Baidu HeatMap" onPress={() => {
            this.setState({
              baiduHeatMapEnabled: !this.baiduHeatMapEnabled
            });
          }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 40
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    marginBottom: 16
  },
  icon: {
    width: 24,
    height: 24,
  }
});

function importStateToProps(storeState) {
  console.log(storeState)
  return {
    city: storeState.city,
    zoom: storeState.zoom,
    markers: [{
      latitude: storeState.latitude,
      longitude: storeState.longitude,
      title: '我的位置'
    }],
    center: {
      latitude: storeState.latitude,
      longitude: storeState.longitude,
    }
  }
}

function importActionToProps(dispatch) {
  return {
    getCurrentPosition: () => {
      dispatch(getCurrentPosition_Send(dispatch))
    }
  }
}


export const ParkScreen = connect(importStateToProps, importActionToProps)(Park)
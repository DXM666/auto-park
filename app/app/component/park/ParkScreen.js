import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Dimensions,
  Switch,
  FlatList,
  Platform,
  Button
} from 'react-native';
import { MapView } from 'react-native-amap3d';


import parkstyles from '../../styles/parkStyles'

export class ParkScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation
    state.params = state.params || { mapType: 'standard' }
    const props = {
      mode: 'dropdown',
      style: { width: 100 },
      selectedValue: state.params.mapType,
      onValueChange: mapType => setParams({ mapType }),
    }
    return {
      title: '地图模式',
      headerRight: (
        <Picker {...props}>
          <Picker.Item label="标准" value="standard" />
          <Picker.Item label="卫星" value="satellite" />
          <Picker.Item label="导航" value="navigation" />
          <Picker.Item label="夜间" value="night" />
          <Picker.Item label="公交" value="bus" />
        </Picker>
      ),
    }
  }

  state = {
    time: new Date(),
    showsCompass: false,    //指南针
    showsScale: true,    //比例尺
    showsZoomControls: true,    //缩放
    showsLocationButton: false,    //定位
    logs: [],
    zoomEnabled: true,
    scrollEnabled: true,
    rotateEnabled: true,
    tiltEnabled: true,
  }

  _animatedToZGC = () => {
    this.mapView.animateTo({
      tilt: 45,
      rotation: 90,
      zoomLevel: 18,
      coordinate: {
        latitude: 39.97837,
        longitude: 116.31363,
      },
    })
  }

  //移动动画
  _animatedToTAM = () => {
    this.mapView.animateTo({
      tilt: 0,
      rotation: 0,
      zoomLevel: 16,
      coordinate: {
        latitude: 39.90864,
        longitude: 116.39745,
      },
    })
  }

  //绘制圆形
  // coordinate = {
  //   latitude: 39.906901,
  //   longitude: 116.397972,
  // }


  //记录事件
  // _log(event, data) {
  //   this.setState({
  //     logs: [
  //       {
  //         key: Date.now(),
  //         time: new Date().toLocaleString(),
  //         event,
  //         data: JSON.stringify(data, null, 2),
  //       },
  //       ...this.state.logs,
  //     ],
  //   })
  // }

  // _logPressEvent = ({ nativeEvent }) => this._log('onPress', nativeEvent)
  // _logLongPressEvent = ({ nativeEvent }) => this._log('onLongPress', nativeEvent)
  // _logLocationEvent = ({ nativeEvent }) => this._log('onLocation', nativeEvent)
  // _logStatusChangeEvent = ({ nativeEvent }) => this._log('onStatusChange', nativeEvent)
  // _logStatusChangeCompleteEvent = ({ nativeEvent }) => this._log('onStatusChangeComplete', nativeEvent)

  // _renderItem = ({ item }) =>
  //   <Text style={styles.logText}>{item.time} {item.event}: {item.data}</Text>

  componentDidMount() {
    this.mounted = true
    setInterval(() => {
      if (this.mounted) {
        this.setState({ time: new Date() })
      }
    }, 1000)
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _coordinates = [
    {
      latitude: 39.806901,
      longitude: 116.397972,
    },
    {
      latitude: 39.806901,
      longitude: 116.297972,
    },
    {
      latitude: 39.906901,
      longitude: 116.397972,
    },
    {
      latitude: 39.706901,
      longitude: 116.397972,
    },
  ]

  _onMarkerPress = () => Alert.alert('onPress')
  _onInfoWindowPress = () => Alert.alert('onInfoWindowPress')
  _onDragEvent = ({ nativeEvent }) => Alert.alert(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)

  render() {
    return (
      <View style={styles.body}>
        {/* <Button
          style={{ padding: 5, position: 'absolute', left: 10, bottom: 20, backgroundColor: '#fff', justifyContent: 'center', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ffffff', justifyContent: 'center', }}
          onPress={() => {
            AMapLocation.init(null)
            AMapLocation.getLocation()
            //this._activityIndicator.setState({ visible: true,})
          }}>
          <Text>hello</Text>
        </Button> */}
        <View style={parkstyles.controls}>
          <View style={parkstyles.control}>
            <Text>旋转</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={rotateEnabled => this.setState({ rotateEnabled })}
              value={this.state.rotateEnabled}
            />
          </View>
          <View style={parkstyles.control}>
            <Text>滑动</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={scrollEnabled => this.setState({ scrollEnabled })}
              value={this.state.scrollEnabled}
            />
          </View>
          <View style={parkstyles.control}>
            <Text>缩放</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={zoomEnabled => this.setState({ zoomEnabled })}
              value={this.state.zoomEnabled}
            />
          </View>
          <View style={parkstyles.control}>
            <Text>倾斜</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={tiltEnabled => this.setState({ tiltEnabled })}
              value={this.state.tiltEnabled}
            />
          </View>
        </View>

        <View style={parkstyles.controls}>
          <View style={parkstyles.control}>
            <Text>指南针</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={showsCompass => this.setState({ showsCompass })}
              value={this.state.showsCompass}
            />
          </View>
          <View style={parkstyles.control}>
            <Text>比例尺</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={showsScale => this.setState({ showsScale })}
              value={this.state.showsScale}
            />
          </View>
          <View style={parkstyles.control}>
            <Text>定位</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={showsLocationButton => this.setState({ showsLocationButton })}
              value={this.state.showsLocationButton}
            />
          </View>
          <View style={parkstyles.control}>
            <Text>缩放</Text>
            <Switch
              style={parkstyles.switch}
              onValueChange={showsZoomControls => this.setState({ showsZoomControls })}
              value={this.state.showsZoomControls}
            />
          </View>
        </View>

        <MapView
          mapType={this.props.navigation.state.params.mapType}
          style={StyleSheet.absoluteFill}
          ref={ref => this.mapView = ref}
          ref={ref => this.mapView = ref}
          locationEnabled={this.state.showsLocationButton}
          showsCompass={this.state.showsCompass}
          showsScale={this.state.showsScale}
          showsLocationButton={this.state.showsLocationButton}
          showsZoomControls={this.state.showsZoomControls}
          style={parkstyles.map}

          zoomEnabled={this.state.zoomEnabled}
          scrollEnabled={this.state.scrollEnabled}
          rotateEnabled={this.state.rotateEnabled}
          tiltEnabled={this.state.tiltEnabled}

          onLocation={({ nativeEvent }) =>
            console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}

        // coordinate={{
        //   latitude: 39.90980,
        //   longitude: 116.37296,
        // }}
        // zoomLevel={18}
        // showsIndoorMap
        // tilt={45}

        // locationInterval={10000}
        // distanceFilter={10}
        // onPress={this._logPressEvent}
        // onLongPress={this._logLongPressEvent}
        // onLocation={this._logLocationEvent}
        // onStatusChange={this._logStatusChangeEvent}
        // onStatusChangeComplete={this._logStatusChangeCompleteEvent}
        // style={styles.body}
        >

          {/* 绘制圆形 */}
          {/* <MapView.Circle
            strokeWidth={5}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(255, 0, 0, 0.5)"
            radius={10000}
            coordinate={this.coordinate}
          /> */}

          <MapView.Marker
            active
            draggable
            title="一个可拖拽的标记"
            description={this.state.time.toLocaleTimeString()}
            onDragEnd={this._onDragEvent}
            onInfoWindowPress={this._onInfoWindowPress}
            coordinate={this._coordinates[0]}
          />

          <MapView.Marker color="green" coordinate={this._coordinates[1]} >
            <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
              <View style={styles.customInfoWindow}>
                <Text>自定义信息窗口</Text>
                <Text>{this.state.time.toLocaleTimeString()}</Text>
              </View>
            </TouchableOpacity>
          </MapView.Marker>

          <MapView.Marker
            image="flag"
            title="自定义图片"
            onPress={this._onMarkerPress}
            coordinate={this._coordinates[2]}
          />

          <MapView.Marker
            title="自定义 View"
            icon={() => (
              <View style={styles.customMarker}>
                <Text style={styles.markerText}>{this.state.time.toLocaleTimeString()}</Text>
              </View>
            )}
            coordinate={this._coordinates[3]}
          />
        </MapView>

        {/* <FlatList
          style={styles.logs}
          data={this.state.logs}
          renderItem={this._renderItem}
        /> */}

        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this._animatedToZGC}>
              <Text style={styles.text}>中关村</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this._animatedToTAM}>
              <Text style={styles.text}>天安门</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  buttons: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  text: {
    fontSize: 16,
  },
  customIcon: {
    width: 40,
    height: 40,
  },
  customInfoWindow: {
    backgroundColor: '#8bc34a',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#689F38',
    marginBottom: 5,
  },
  customMarker: {
    backgroundColor: '#009688',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  markerText: {
    color: '#fff',
  },
  logs: {
    elevation: 8,
    backgroundColor: '#fff',
  },
  logText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
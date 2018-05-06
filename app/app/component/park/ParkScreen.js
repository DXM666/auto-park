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
import { TWebView } from '../../common/twebview'

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

  park_latitude = [];
  park_longitude = [];
  park_name = [];
  park_distance = [];
  park = [];

  state = {
    time: new Date(),
    logs: [],
    latitude: 39.90980,
    longitude: 116.37296,
    parkDistance: false
    // park: []
  }

  _animatedToZGC = () => {
    this.mapView.animateTo({
      tilt: 30,    //倾斜度
      rotation: 90,    //旋转角度
      zoomLevel: 18,    //缩放级别
      coordinate: {    //中心坐标
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

  componentDidMount() {
    this.mounted = true
    // setInterval(() => {
    //   if (this.mounted) {
    //     this.setState({ time: new Date() })
    //   }
    // }, 1000)
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  Park_parkname = () => {
    let url = "http://restapi.amap.com/v3/place/around?key=a83dc06f627f2c8a9adf5bc046883497&location=" + `${this.state.longitude},${this.state.latitude}` + "&keywords=停车场&types=&offset=&page=&extensions=all";
    // let url = "http://restapi.amap.com/v3/geocode/regeo?key=a83dc06f627f2c8a9adf5bc046883497&location=" + `${this.state.longitude},${this.state.latitude}` + "&poitype=停车场&radius=3000&extensions=all&batch=false&roadlevel=0"
    fetch(url)
      .then(
        (resp) => {
          return resp.json()
        }
      )
      .then(
        (response) => {
          // console.log(response)
          this.setState(
            {
              park: response.pois
            }
          )
        }
      )
      .catch(
        (error) => {
          alert('停车场数据请求失败，请稍后再试')
        }
      )
  }


  Park_distance = (longitude, latitude, park) => {
    let url = "http://restapi.amap.com/v3/direction/driving?key=a83dc06f627f2c8a9adf5bc046883497&origin=" + `${this.state.longitude},${this.state.latitude}` + "&destination=" + `${longitude},${latitude}` + "&originid=&destinationid=&extensions=base&strategy=0&waypoints=&avoidpolygons=&avoidroad=";
    fetch(url)
      .then(
        (resp) => {
          return resp.json()
        }
      )
      .then(
        (response) => {
          if (response.status == 1) {
            console.log(response)
            this.park_distance.push("距离您" + `${response.route.paths[0].distance}` + "m")
          }

          // return `${response.route.paths[0].distance}` + "m"
        }
      )
      .catch(
        (error) => {
          console.log(error)
          alert('距离数据请求失败，请稍后再试')
        }
      )
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

  _line3 = [
    {
      latitude: 24.856776,
      longitude: 102.858748,
    },
    {
      latitude: 24.856817,
      longitude: 102.858727,
    },
    {
      latitude: 24.856731,
      longitude: 102.858322,
    },
    {
      latitude: 24.856535,
      longitude: 102.857399,
    },
  ]
  _onPress = () => Alert.alert('onPress')
  _onMarkerPress = () => Alert.alert('onPress')
  _onInfoWindowPress = () => Alert.alert('onInfoWindowPress')
  _onDragEvent = ({ nativeEvent }) => Alert.alert(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)

  render() {
    if (this.state.park) {
      for (let i = 0; i < this.state.park.length; i++) {
        this.park_longitude.push(parseFloat(this.state.park[i].location.split(',')[0]))
        this.park_latitude.push(parseFloat(this.state.park[i].location.split(',')[1]))
        this.park_name.push(this.state.park[i].name)
      }
    }
    return (
      <View style={styles.body}>
        <MapView
          mapType={this.props.navigation.state.params.mapType}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={StyleSheet.absoluteFill}
          ref={ref => this.mapView = ref}
          locationEnabled={true}
          showsCompass={true}    //指南针
          showsScale={true}    //比例尺
          showsLocationButton={true}    //定位
          showsZoomControls={true}    //缩放
          style={parkstyles.map}
          zoomEnabled={true}    //缩放
          scrollEnabled={true}    //滑动
          rotateEnabled={true}    //旋转
          tiltEnabled={true}    //倾斜
          locationInterval={500000}
          distanceFilter={50}
          onLocation={({ nativeEvent }) => {
            this.setState(
              {
                latitude: nativeEvent.latitude,
                longitude: nativeEvent.longitude
              }, () => {
                this.Park_parkname()
              }
            )
          }}
        >

          {
            this.state.park ?
              this.state.park.map((i, index) => {
                this.Park_distance(this.park_longitude[index], this.park_latitude[index], this.park_name[index])
                return (
                  <MapView.Marker
                    image='park'
                    key={index}
                    title={this.park_name[index]}
                    // onPress={this._onMarkerPress}
                    coordinate={
                      {
                        latitude: this.park_latitude[index],
                        longitude: this.park_longitude[index],
                      }
                    }
                  description={this.park_distance[index]}
                  >
                    {/* <View>
                      <Text>{this.park_name[index]}</Text>
                      <Text>{this.park_distance[index]}</Text>
                      <Button
                        title='导航'
                        onPress={() => {
                          <View>
                            <TWebView url={"http://uri.amap.com/navigation?from=116.478346,39.997361,startpoint&to=116.3246,39.966577,endpoint&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0"} />
                          </View>
                        }}
                      />
                    </View> */}
                    {/* <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                      <View style={styles.customInfoWindow}>

                        <Text>{this.state.time.toLocaleTimeString()}</Text>
                      </View>
                    </TouchableOpacity> */}
                  </MapView.Marker>
                )
              }) : null
          }

          {/* <MapView.Polyline
            gradient
            width={5}
            colors={['#f44336', '#2196f3', '#4caf50']}
            onPress={this._onPress}
            coordinates={this._line3}
          /> */}
        </MapView>

        {/* <View style={styles.buttons}>
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
        </View> */}
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
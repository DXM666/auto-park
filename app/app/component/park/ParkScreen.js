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
  Button,
  StatusBar,
  TouchableNativeFeedback
} from 'react-native';
import { MapView } from 'react-native-amap3d';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import parkstyles from '../../styles/parkStyles';
import { TWebView } from '../../common/twebview';
import { Menu } from '../menu/Menu';

export class ParkScreen extends Component {

  static navigationOptions = {
    header: false
  };

  park_latitude = [];
  park_longitude = [];
  park_name = [];
  park_distance = [];
  park = [];

  state = {
    sideMenu: false,
    weatherside:false,
    latitude: 39.90980,
    longitude: 116.37296,
    parkDistance: false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  Park_parkname = () => {
    //获取停车场信息的API
    let url = "http://restapi.amap.com/v3/place/around?key=a83dc06f627f2c8a9adf5bc046883497&location=" + `${this.state.longitude},${this.state.latitude}` + "&keywords=停车场&types=&offset=&page=&extensions=all";
    fetch(url)
      .then(
        (resp) => {
          return resp.json()
        }
      )
      .then(
        (response) => {
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
    //获取停车场与用户的距离
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
            // console.log(response)
            this.park_distance.push("距离您" + `${response.route.paths[0].distance}` + "m")
          }
        }
      )
      .catch(
        (error) => {
          console.log(error)
          alert('距离数据请求失败，请稍后再试')
        }
      )
  }

  render() {
    const { navigate } = this.props.navigation;
    const menu = <Menu navigation={this.props.navigation} style={{ marginTop: 22 }} />;    //创建的Menu组件
    if (this.state.park) {
      for (let i = 0; i < this.state.park.length; i++) {
        this.park_longitude.push(parseFloat(this.state.park[i].location.split(',')[0]))
        this.park_latitude.push(parseFloat(this.state.park[i].location.split(',')[1]))
        this.park_name.push(this.state.park[i].name)
      }
    }
    return (
      <SideMenu
        isOpen={this.state.sideMenu}
        menu={menu}                    //抽屉内的组件
        disableGestures={this.state.sideMenu ? false : true}
      >
      
        {/* <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/> */}
        <View style={styles.headerTop}>
          <TouchableNativeFeedback
            onPress={() => {
              this.setState({
                sideMenu: this.state.sideMenu ? false : true
              })
            }}>
            <Icon name='md-menu' color={'black'} size={30} style={{ backgroundColor: 'white', padding: 10 }} />
          </TouchableNativeFeedback>
        </View>
        <View style={styles.body}>
          <MapView
            region={{
              latitude: this.state.latitude,    //用户所在位置的纬度
              longitude: this.state.longitude,    //用户所在位置的经度
              latitudeDelta: 0.005,    //纬度精确范围
              longitudeDelta: 0.005,    //经度精确范围
            }}
            style={StyleSheet.absoluteFill}
            ref={ref => this.mapView = ref}    //地图类型
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
            locationInterval={50000}    //每隔50秒获取一次数据    
            distanceFilter={50}  //用户移动50米重新获取数据
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
                this.state.park.map((i, index) => {    //遍历停车场数据，依次显示停车场信息
                  this.Park_distance(this.park_longitude[index], this.park_latitude[index], this.park_name[index])
                  return (
                    <MapView.Marker
                      image='park'
                      key={index}
                      title={this.park_name[index]}    //停车场名称
                      // onPress={this._onMarkerPress}
                      coordinate={
                        {
                          latitude: this.park_latitude[index],    //停车场纬度
                          longitude: this.park_longitude[index],    //停车场经度
                        }
                      }
                      description={this.park_distance[index]}
                    >
                      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                        <View>
                          <Text>{this.park_name[index]}</Text>
                          <Text>{this.park_distance[index]}</Text>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={
                            () => {
                              navigate('ParkInfo')
                            }
                          }
                        >
                          <Icon name='ios-car-outline' color={'black'} size={30} style={{ paddingLeft: 10 }} />
                        </TouchableOpacity>
                      </View>
                    </MapView.Marker>
                  )
                }) : null
            }
          </MapView>
        </View>
      </SideMenu>
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
  logText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
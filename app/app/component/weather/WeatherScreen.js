import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Button,
    ScrollView,
    RefreshControl
} from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import { connect } from 'react-redux';


import { Forecast } from './Forecast';
import { requestWeatherByName_Send } from '../../action/weatheractions';
import { AirCondition } from './air_condition';
import { WeatherHeader } from './weather_header';
import { WeatherCurrent } from './weather_current';
import { WeatherFuture } from './weather_future';
import { LifeSuggestion } from './life_suggestion';


//天气模块
export class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},
            address: ''
        }
    }

    componentDidMount() {
        this.props.requestWeatherByName(this.props.city)
    }

    // fetchWeatherData(address) {
    //     var url = "https://www.sojson.com/open/api/weather/json.shtml?city=" + address;
    //     fetch(url)
    //         .then(
    //         (response) =>
    //             response.json()
    //         )
    //         .then((response) => {
    //             console.log(response)
    //             this.setState({
    //                 weather: {
    //                     main: response.data.forecast[0].type,
    //                     description_low: response.data.forecast[0].low,
    //                     description_high: response.data.forecast[0].high,
    //                     temp: response.data.ganmao
    //                 }
    //             });
    //         })
    //         .catch((error) => {
    //             console.warn(error);
    //             alert('服务异常,正在紧急修复,请耐心等待')
    //         });
    // }

    handleTextChange(addressText) {
        this.setState({
            address: addressText
        });
    }

    render() {
        let backgroundImageValue = require('../../img/bg0.jpg');
        return (
            <View style={styles.transparentBackground}>
                <Image style={styles.bgImage} source={backgroundImageValue} />
                <View style={styles.headerTop}>
                    {/* <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/> */}
                    {/* <View style={styles.contentContainer}>
                            {(__ANDORID__)?this._renderAndroidMenuButton():this._renderIOSMenuButton()}
                            <View style={styles.cityContainer}>
                                <Text style={styles.title}>{weatherData === null ? '未知' : weatherData.basic.city}</Text>
                            </View>
                        </View> */}
                </View>
                <View style={styles.container}>
                    <ScrollView
                        style={styles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={weatherStore.loading}
                    //         onRefresh={this._refreshWeatherData}
                    //         tintColor={'white'}
                    //         titleColor={'white'} />}
                    >
                        <View style={{ marginLeft: 10 }}>
                            <WeatherHeader weather={this.props.weatherData} />
                            <WeatherCurrent weather={this.props.weatherData} />
                            <WeatherFuture weather={this.props.weatherData} />
                            <AirCondition weather={this.props.weatherData} />
                            <LifeSuggestion weather={this.props.weatherData} />
                            {/* <WeatherFooter /> */}
                        </View>
                    </ScrollView>
                </View>
                {/* <TouchableHighlight
                    onPress={() => this.fetchWeatherData(this.state.address)} >
                    <Text >确认</Text>
                </TouchableHighlight>
                {
                    this.state.weather !== null ?
                        <Forecast main={this.state.weather.main} description_low={this.state.weather.description_low} description_high={this.state.weather.description_high} temp={this.state.weather.temp} /> : null
                } */}
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        width: null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
    },
    transparentBackground: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    scrollViewContainer: {
        paddingLeft: 10,
        paddingRight: 10,

    },
    container: {
        position: 'absolute',//相对父元素进行绝对定位
        top: 80,
        bottom: 0
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    headerTop: {
        position: 'absolute',//相对父元素进行绝对定位
        top: 40,
        left: 20,
        bottom: 0,
        height: 50
    },

    title: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },

    cityContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 20,
        marginTop: -2
    }
});



function importStateToProps(storeState) {
    return {
        city: storeState.parkReducer.city,
        weatherData: storeState.weatherReducer.weatherData
    }
}

function importActionToProps(dispatch) {
    return {
        requestWeatherByName: (name) => {
            dispatch(requestWeatherByName_Send(dispatch, name))
        }
    }
}

export const WeatherScreen = connect(importStateToProps, importActionToProps)(Weather)
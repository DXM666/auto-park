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
import { connect } from 'react-redux';


import { requestWeatherByName_Send } from '../../action/weatheractions';
import { AirCondition } from './air_condition';
import { WeatherHeader } from './weather_header';
import { WeatherCurrent } from './weather_current';
import { WeatherFuture } from './weather_future';
import { LifeSuggestion } from './life_suggestion';


//天气模块
export class Weather extends Component {

    static navigationOptions = {
        title: 'Weather',
        headerStyle: {
            backgroundColor: "#dfffdf",
        },
        headerTitleStyle: {
            alignSelf: 'center'
        },
    };

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


    render() {
        let backgroundImageValue = require('../../img/bg0.jpg');
        return (
            <View style={styles.transparentBackground}>
                <Image style={styles.bgImage} source={backgroundImageValue} />
                <View style={styles.container}>
                    <ScrollView
                        style={styles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ marginLeft: 10 }}>
                            <WeatherHeader weather={this.props.weatherData} city={this.props.city} />
                            <WeatherCurrent weather={this.props.weatherData} />
                            <WeatherFuture weather={this.props.weatherData} />
                            <AirCondition weather={this.props.weatherData} />
                            <LifeSuggestion weather={this.props.weatherData} />
                            {/* <WeatherFooter /> */}
                        </View>
                    </ScrollView>
                </View>
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
        top: 0,
        bottom: 0
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
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
        city: storeState.weatherReducer.city,
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
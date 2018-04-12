/**
 * 天气界面的头部
 */

import React, { Component } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    StatusBar, 
    Dimensions 
} from 'react-native';

import { WeatherStyles } from '../../styles/index';

const { width, height } = Dimensions.get('window');

export class WeatherHeader extends Component {

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        /**
         * 返回为null，代表当前数据仍然在加载中
         * @type {null}
         */
        if (this.props.weather) {
            let weatherData = this.props.weather;
            return this._renderWeatherHeader(weatherData);
        } else {
            return this._renderWeatherLoading();
        }
    }

    _renderWeatherHeader = (weatherData) => {
        return (
            <View style={styles.contentContainer}>
                <Text style={styles.number}>{weatherData.now.tmp + '°'} </Text>
                <View style={styles.details}>
                    <Text style={WeatherStyles.smallNumber}>{weatherData.now.cond.txt}</Text>
                    <Text style={WeatherStyles.smallNumber}>{weatherData.now.wind.dir} {weatherData.now.wind.sc}级</Text>
                </View>
            </View>
        );
    }

    _renderWeatherLoading = () => {
        return (
            <View style={styles.contentContainer}>
                <Text style={styles.number}>0° </Text>
                <View style={styles.details}>
                    <Text style={WeatherStyles.smallNumber}>Loading</Text>
                    <Text style={WeatherStyles.smallNumber}>Loading</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({


    number: {
        fontSize: 80,
        color: '#ffffff'
    },
    contentContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

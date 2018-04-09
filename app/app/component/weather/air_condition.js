/**
 * 显示空气质量的组件
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    ScrollView,
    RefreshControl,
    DrawerLayoutAndroid,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

import { Divider } from "../../common/divider";
import { WeatherStyles } from '../../styles/index';
import { AirQualityItem } from './air_quality_item';



export class AirCondition extends Component {

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    //处理游标的指示颜色
    _handleIndicatorColor = (value) => {
        if (value <= 50) {
            return airColors[0];
        } else if (50 < value && value < 100) {
            return airColors[1];
        } else if (100 < value && value < 150) {
            return airColors[2];
        }
        else if (150 < value && value < 200) {
            return airColors[3];
        }
        else if (200 < value && value < 250) {
            return airColors[4];
        } else {
            return airColors[5];
        }
    };

    render() {
        console.log(this.props)
        let marginLeftValue = 50;
        // if (!this.props.weather.loading) {
        if (this.props.weather) {
            let weatherData = this.props.weather;
            marginLeftValue = weatherData.aqi.city.aqi;
        }
        let offset = marginLeftValue;
        if (offset > 330)
            offset = 330;

        return (
            <View style={styles.container}>
                <Text style={WeatherStyles.smallNumber}>空气质量</Text>
                <Divider />
                <View style={[styles.indicatorContainer]}>
                    <Text style={styles.text}>0</Text>
                    <Text style={styles.text}>50</Text>
                    <Text style={styles.text}>100</Text>
                    <Text style={styles.text}>150</Text>
                    <Text style={styles.text}>200</Text>
                    <Text style={styles.text}>250</Text>
                </View>

                <View style={styles.indicatorContainer}>
                    <View style={[styles.indicator, { backgroundColor: airColors[0] }]} />
                    <View style={[styles.indicator, { backgroundColor: airColors[1] }]} />
                    <View style={[styles.indicator, { backgroundColor: airColors[2] }]} />
                    <View style={[styles.indicator, { backgroundColor: airColors[3] }]} />
                    <View style={[styles.indicator, { backgroundColor: airColors[4] }]} />
                    <View style={[styles.indicator, { backgroundColor: airColors[5] }]} />
                </View>
                <View style={styles.currentIndicator}>
                    <Image source={require('../../img/water.png')} style={[styles.indicatorImage, { tintColor: this._handleIndicatorColor(marginLeftValue), marginLeft: (parseInt(offset) + 5) }]} />
                    <Text style={[styles.indicatorText, { marginLeft: (parseInt(offset) + 15) }]}>{marginLeftValue}</Text>

                </View>
                <View style={styles.detailColumnContainer}>
                    <View style={styles.detailRowContainer}>
                        <AirQualityItem index={0} aqi={this.props.weather} />
                        {/* <AirQualityItem index={1} aqiList={this.props.weather} />
                    </View>
                    <View style={styles.detailRowContainer}>
                        <AirQualityItem index={2} aqiList={this.props.weather} />
                        <AirQualityItem index={3} aqiList={this.props.weather} />
                    </View>
                    <View style={styles.detailRowContainer}>
                        <AirQualityItem index={4} aqiList={this.props.weather} />
                        <AirQualityItem index={5} aqiList={this.props.weather} /> */}
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },

    indicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10
    },

    indicator: {
        flex: 1,
        height: 10,
        width: 50
    },
    currentIndicator: {
        //height: 10
    },
    text: {
        fontSize: 15,
        color: 'white',
        flex: 1,
        backgroundColor: 'transparent'
    },
    indicatorImage: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    indicatorText: {
        position: 'absolute',
        fontSize: 13,
        color: 'white',
        backgroundColor: 'transparent',
        marginTop: 18
    },
    detailColumnContainer: {
        flexDirection: 'column',
        marginTop: 30
    },
    detailRowContainer: {
        flexDirection: 'row'
    }
})
// 控制质量指标的颜色
const airColors = ['#73BB4D', '#EBB541', '#FC9B56', '#F17751', '#A94057', '#7B1F3C'];

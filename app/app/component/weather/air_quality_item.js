/**
 * 显示天气质量信息的每一个信息的组件
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
    ImageBackground,
    ActivityIndicator
} from 'react-native';


import { Divider } from '../../common/divider';
import { AqiItem } from './model/aqi_item_info';


export class AirQualityItem extends Component {
    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.aqiList = [];
    }

    render() {
        if (this.props.aqi) {
            let aqi = this.props.aqi.aqi.city
            if (aqi.length !== 6) {
                return this._renderLoading();
            } else {
                this.aqiList.push(new AqiItem('CO', aqi.co, '一氧化碳', 'mg/m³'));
                this.aqiList.push(new AqiItem('NO2', aqi.no2, '二氧化氮', 'μg/m³'));
                this.aqiList.push(new AqiItem('O³', aqi.o3, '臭氧', 'μg/m³'));
                this.aqiList.push(new AqiItem('PM10', aqi.pm10, '可吸入颗粒物', 'μg/m²'));
                this.aqiList.push(new AqiItem('PM2.5', aqi.pm25, '可入肺颗粒', 'μg/m³'));
                this.aqiList.push(new AqiItem('PM10', aqi.so2, '二氧化硫', 'μg/m³'));
                return this._renderContent(aqi);
            }
        }
    }

    _renderContent = (aqiList) => {
        let index = this.props.index;
        //console.log("空气指数的值为" + JSON.stringify(aqiList[index]));
        return (
            <View style={styles.container}>
                <View style={styles.columnItem}>
                    <Text style={styles.textTop}>{aqiList[index].eng_name}</Text>
                    <Text style={styles.textTop}>{aqiList[index].value}</Text>
                </View>
                <View style={styles.columnItem}>
                    <Text style={styles.textBottom}>{aqiList[index].chn_name}</Text>
                    <Text style={styles.textBottom}>{aqiList[index].unit}</Text>
                </View>
                <Divider marginLeftValue={10} marginRightValue={10} marginTopValue={5} backgroundColorValue={'rgba(255,255,255,0.1)'} />
            </View>
        )
    }


    //输出正在加载的界面
    _renderLoading = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    columnItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    textTop: {
        fontSize: 15,
        color: 'white'
    },
    textBottom: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12
    },
});
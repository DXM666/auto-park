/**
 *  显示当天24小时天气的自定义组件
 */

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';

import Divider from '../../common/divider';
import { WeatherStyles } from '../../styles/index';
import dateUtil from '../../common/util'
import Config from "../../common/config";

/**
 * 当获取到了当日24小时天气的时候需要进行刷新视图
 */

export class WeatherCurrent extends Component {
    render() {
        let hourlyDataSource;
        if (this.props.weather) {
            hourlyDataSource = this.props.weather.hourly_forecast;
            return this._renderContent(hourlyDataSource);
        } else {
            return this._renderLoadingView();
        }
    }

    _renderContent = (dataSource) => {
        let myDate = new Date();
        return (
            <View >
                <Text style={WeatherStyles.smallNumber}>{myDate.getHours()} 时更新</Text>
                <Divider />
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    data={dataSource}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    horizontal={true}
                    style={styles.currentWeatherFlatList}
                />
            </View>
        )
    };
    _renderItem = ({ item }) => {
        let iconUrl = Config.iconApi + Object(item.cond).code + '.png';
        return (
            <View style={styles.futureItem}>
                <View style={styles.textContainer}>
                    <Text style={styles.date}>{dateUtil.getHoursAndMinsByDate(item.date)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Image style={WeatherStyles.weatherIcon} source={{ uri: iconUrl }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.temperature}>{item.tmp}°</Text>
                </View>
            </View>
        );
    };

    _renderLoadingItem = () => {
        return (
            <View style={styles.futureItem}>
                <View style={styles.textContainer}>
                    <Text style={styles.date}>00:00</Text>
                </View>
                <View style={styles.textContainer}>
                    <Image style={WeatherStyles.weatherIcon} source={require('../../img/na.png')} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.temperature}>0°</Text>
                </View>
            </View>
        );
    };

    _renderLoadingView = () => {
        return (
            <View >
                <Text style={WeatherStyles.smallNumber}>正在更新……</Text>
                <Divider />
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }, { key: 'i' }, { key: 'h' }, { key: 'm' }, { key: 'n' }]}
                    extraData={this.state}
                    renderItem={this._renderLoadingItem}
                    horizontal={true}
                    style={styles.currentWeatherFlatList}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    futureItem: {
        flex: 1,
        marginRight: 30

    },
    currentWeatherFlatList: {
        padding: 10
    },
    textContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 10
    },
    temperature: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 10,
        justifyContent: 'center'
    }
});


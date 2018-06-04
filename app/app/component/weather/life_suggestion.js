/**
 * 生活质量建议
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

import { WeatherStyles } from '../../styles/index';
import { SuggestionItem } from './suggestion_item';
import Divider from "../../common/divider";

export class LifeSuggestion extends Component {

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={WeatherStyles.smallNumber}>气象指数</Text>
                <Divider />
                <SuggestionItem index={0} weather={this.props.weather} />
                <SuggestionItem index={1} weather={this.props.weather} />
                <SuggestionItem index={2} weather={this.props.weather} />
                <SuggestionItem index={3} weather={this.props.weather} />
                <SuggestionItem index={4} weather={this.props.weather} />
                <SuggestionItem index={5} weather={this.props.weather} />
                <SuggestionItem index={6} weather={this.props.weather} />
            </View>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 20
    },
    text: {
        fontSize: 15,
        color: 'white',
        flex: 1,
        backgroundColor: 'transparent'
    },

}
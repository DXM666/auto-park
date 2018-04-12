/**
 * 生活质量建议的每一项的item
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
import Icon from 'react-native-vector-icons/Ionicons';

import Divider from "../../common/divider";
import { SuggestionInfo } from './model/suggestion_info';


export class SuggestionItem extends Component {

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.lifeList = [];
    }

    render() {
        if (this.props.weather) {
            let suggestion = this.props.weather.suggestion;
            this.lifeList.push(new SuggestionInfo('舒适指数', Object(suggestion.comf).brf, Object(suggestion.comf).txt));
            this.lifeList.push(new SuggestionInfo('洗车指数', Object(suggestion.cw).brf, Object(suggestion.cw).txt));
            this.lifeList.push(new SuggestionInfo('穿衣指数', Object(suggestion.drsg).brf, Object(suggestion.drsg).txt));
            this.lifeList.push(new SuggestionInfo('感冒指数', Object(suggestion.flu).brf, Object(suggestion.flu).txt));
            this.lifeList.push(new SuggestionInfo('运动指数', Object(suggestion.sport).brf, Object(suggestion.sport).txt));
            this.lifeList.push(new SuggestionInfo('旅游指数', Object(suggestion.trav).brf, Object(suggestion.trav).txt));
            this.lifeList.push(new SuggestionInfo('紫外线指数', Object(suggestion.uv).brf, Object(suggestion.uv).txt));
            return this._renderContent();
        } else {
            return this._renderLoadingView()
        }
    }


    _renderContent = () => {
        let index = this.props.index;
        let marginLeftValue = 0;
        if (index === 4) {
            marginLeftValue = 10;
        }
        return (
            <View style={[styles.container]}>
                <View style={styles.itemIcon}>
                    <Icon name={suggestionItemIcon[index]} size={40} color={'#ffffff'} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>{this.lifeList[index].type}:{this.lifeList[index].brf}</Text>
                    <Text style={[styles.text, styles.textBottom]}>{this.lifeList[index].txt}</Text>
                </View>
                <Divider marginLeftValue={20} marginRightValue={20} marginTopValue={5} />
            </View>
        )
    };

    _renderLoadingView = () => {

        return (
            <View style={styles.container}>
                <View style={styles.itemIcon}>
                    <Icon name={'ios-ionitron-outline'} size={40} color={'#ffffff'} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>感冒指数:易发</Text>
                    <Text style={[styles.text, styles.textBottom]}>感冒容易发生，少去人群密集的场所有利于降低感冒的几率。</Text>
                </View>
                <Divider marginLeftValue={20} marginRightValue={20} marginTopValue={5} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 15
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    text: {
        flex: 1,
        marginLeft: 20,
        marginTop: 5,
        color: 'white',
        fontSize: 15
    },
    textBottom: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13
    },
    itemIcon: {
        height: 45,
        width: 45,
        justifyContent: 'flex-start'
    }
});

const suggestionItemIcon = ['ios-ionitron-outline', 'ios-car-outline', 'ios-body-outline', 'ios-thermometer-outline', 'ios-bicycle-outline', 'ios-boat-outline', 'ios-partly-sunny-outline'];

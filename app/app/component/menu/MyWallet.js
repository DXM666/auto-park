/*
 * 我的钱包
 */

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableNativeFeedback,
    TouchableHighlight,
    Image,
    Alert,
    Linking,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons'
import Divider from '../../common/divider'

export class Wallet extends Component {
    static navigationOptions = {
        title: '我的钱包',
        headerStyle: {
            backgroundColor: '#4db6ac',
            marginTop: 20,
            elevation: 0
        },
        headerTintColor: 'white'
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#00897b"
                    barStyle="light-content"
                />
                {this._renderAndroidColumn()}
            </View>
        )
    }

    _renderAndroidColumn = () => {
        return (
            <ScrollView>
                <View style={[styles.itemContainer, { marginTop: 50 }]}>
                    <Text style={styles.text}>钱包余额</Text>
                    <View style={{ marginRight: 20, flexDirection: 'row' }}>
                        <Text style={{ paddingRight: 10 }}>{100.00 - this.props.purse}元</Text>
                        <Icon name='ios-arrow-forward-outline' color={'rgb(54,57,66)'} size={15}
                            style={{ backgroundColor: 'transparent', }} />
                    </View>
                </View>
                <Divider dividerHeight={1} marginLeftValue={20} marginRightValuel={20} />
                <View style={[styles.itemContainer]}>
                    <Text style={styles.text}>优惠券</Text>
                    <View style={{ marginRight: 20, flexDirection: 'row' }}>
                        <Text style={{ paddingRight: 10 }}>0张</Text>
                        <Icon name='ios-arrow-forward-outline' color={'rgb(54,57,66)'} size={15}
                            style={{ backgroundColor: 'transparent' }} />
                    </View>
                </View>
                <Divider dividerHeight={1} marginLeftValue={20} marginRightValuel={20} />
                <View style={[styles.itemContainer]}>
                    <Text style={styles.text}>红包</Text>
                    <View style={{ marginRight: 20, flexDirection: 'row' }}>
                        <Text style={{ paddingRight: 10 }}>5.20元</Text>
                        <Icon name='ios-arrow-forward-outline' color={'rgb(54,57,66)'} size={15}
                            style={{ backgroundColor: 'transparent' }} />
                    </View>
                </View>
            </ScrollView>
        )
            ;

    };

}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        height: 53,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginLeft: 20,
        fontSize: 15
    },
});

function importStateToProps(storeState) {
    console.log(storeState)
    return {
        purse: storeState.weatherReducer.purse
    }
}


export const MyWallet = connect(importStateToProps)(Wallet)
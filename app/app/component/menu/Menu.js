/*
 * 菜单页
 */

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
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';

import Divider from '../../common/divider';
import Icon from 'react-native-vector-icons/Ionicons';
import { closeMenu } from '../../action/parkactions';




export class SideMenu extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                // 需显示的图片列表
                                let media = [{ photo: 'http://avatar.csdn.net/2/1/1/1_shiquanqq.jpg', }]
                                const { navigate } = this.props.navigation
                                navigate('PhotoBrowserScene', { media: media })
                            }}
                        style={styles.avatar}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'http://avatar.csdn.net/2/1/1/1_shiquanqq.jpg' }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Georgia' }}>DXM</Text>
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.closeMenu(false)
                        }
                    }
                    style={{ flexDirection: 'row' }}
                >
                    <Icon name='ios-home' color={'black'} size={25} style={{ padding: 20, paddingTop: 65 }} />
                    <Text style={{ fontSize: 25, padding: 20, paddingTop: 60 }}>AutoPark</Text>
                </TouchableOpacity>
                <Divider dividerHeight={1} />
                <TouchableOpacity
                    onPress={
                        () => {
                            navigate('MyWallet')
                        }
                    }
                    style={{ flexDirection: 'row' }}
                >
                    <Icon name='ios-card' color={'black'} size={25} style={{ padding: 20, paddingTop: 25 }} />
                    <Text style={{ fontSize: 25, padding: 20 }}>我的钱包</Text>
                </TouchableOpacity>
                <Divider dividerHeight={1} />
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.parkname ?
                                navigate('ParkInfo',
                                    {
                                        parkname: this.props.parkname,
                                        park1: this.props.park1,
                                        park2: this.props.park2,
                                        time: this.props.time,
                                        reserve: true,  //预约成功后车位无法点击
                                        park: true,    //预约成功后显示车锁开关
                                        lock: true,    //车锁开关
                                    })
                                :
                                alert('您现在还没有订单，快去预约车位吧^-^')
                        }
                    }
                    style={{ flexDirection: 'row' }}
                >
                    <Icon name='ios-nuclear' color={'black'} size={25} style={{ padding: 20, paddingTop: 25 }} />
                    <Text style={{ fontSize: 25, padding: 20 }}>我的订单</Text>
                </TouchableOpacity>
                <Divider dividerHeight={1} />
                <TouchableOpacity
                    onPress={
                        () =>
                            Communications.email(
                                ['846373685@qq.com'],
                                null,
                                null,
                                'My Subject',
                                'My body text'
                            )}
                    style={{ flexDirection: 'row' }}
                >
                    <Icon name='ios-paper-plane' color={'black'} size={25} style={{ padding: 20, paddingTop: 25 }} />
                    <Text style={{ fontSize: 25, padding: 20 }}>问题反馈</Text>
                </TouchableOpacity>
                <Divider dividerHeight={1} />
                <TouchableOpacity
                    onPress={
                        () => {
                            navigate('AboutScreen')
                        }
                    }
                    style={{ flexDirection: 'row' }}
                >
                    <Icon name='ios-cog' color={'black'} size={25} style={{ padding: 20, paddingTop: 25 }} />
                    <Text style={{ fontSize: 25, padding: 20 }}>关于</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 24,
        flex: 1,
    },
    item: {
        fontSize: 16,
        fontWeight: '300',
        paddingTop: 10,
        alignContent: 'center'
    },
});

function importStateToProps(storeState) {
    return {
        parkname: storeState.weatherReducer.parkname,
        park1: storeState.weatherReducer.park1,
        park2: storeState.weatherReducer.park2,
        time: storeState.weatherReducer.time,
    }
}

function importActionToProps(dispatch) {
    return {
        closeMenu: (data) => { dispatch(closeMenu(data)) }
    }
}

export const Menu = connect(importStateToProps, importActionToProps)(SideMenu)
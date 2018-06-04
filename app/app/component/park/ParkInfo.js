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
    ScrollView,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Divider from '../../common/divider';
import { connect } from 'react-redux';
import { orderInfo } from '../../action/parkactions';


export class ParkInfoScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.state.params.parkname}`,
        headerStyle: {
            backgroundColor: "#02df82",
        },
        headerBackTitle: 'hello',
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
            paddingTop: 10
        },
        headerRight: <View />,
        headerLeft: <TouchableOpacity
            activeOpacity={0.9}
            onPress={
                () => {
                    navigation.navigate('HomePage')
                }
            }
        >
            <Icon name='ios-arrow-back-outline' color={'white'} size={30} style={{ paddingLeft: 20, paddingTop: 10 }} />
        </TouchableOpacity>,
    });

    constructor(props) {
        super(props);
        this.state = {
            time: '',
            setTime: '',
            reserve: false,  //预约成功后车位无法点击
            park: false,    //预约成功后显示车锁开关
            lock: false,    //车锁开关
            choosePark11: false,    //预约成功后更换状态
            choosePark13: false,
            choosePark22: false,
            choosePark31: false,
            choosePark33: false
        }
    }

    setTime = (time) => {
        console.log(time)
        setInterval(
            () => {
                var reserveHour
                if (new Date().getMinutes() >= 30) {
                    reserveHour = new Date().getHours() + 1
                } else {
                    reserveHour = new Date().getHours()
                }
                this.setState({
                    setTime: time - reserveHour
                })
            }, 50000
        )
    }
    render() {
        const { params } = this.props.navigation.state;
        if (params.time) {
            this.setTime(params.time)
        }
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../img/reserve-logo.png')} />
                    <Text style={{ paddingRight: 10 }}>:已预约</Text>
                    <Image source={require('../../img/out-logo.png')} />
                    <Text style={{ paddingRight: 10 }}>:可选</Text>
                    <Image source={require('../../img/on-logo.png')} />
                    <Text style={{ paddingRight: 10 }}>:被占用</Text>
                </View>
                <Divider dividerHeight={1} backgroundColorValue={'green'} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        disabled={this.state.reserve || params.reserve ? 'true' : ''}
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    park: true,
                                                    reserve: true,
                                                    choosePark11: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        {this.state.choosePark11 || params.park1 ?
                            <Image source={require('../../img/reserve.png')} /> :
                            <Image source={require('../../img/out.png')} />
                        }
                    </TouchableOpacity>
                    <Image source={require('../../img/on.png')} />
                    <TouchableOpacity
                        disabled={this.state.reserve || params.reserve ? 'true' : ''}
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    park: true,
                                                    reserve: true,
                                                    choosePark13: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        {this.state.choosePark13 || params.park2 ?
                            <Image source={require('../../img/reserve.png')} /> :
                            <Image source={require('../../img/out.png')} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../img/on.png')} />
                    <TouchableOpacity
                        disabled={this.state.reserve || params.reserve ? 'true' : ''}
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    park: true,
                                                    reserve: true,
                                                    choosePark22: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        {this.state.choosePark22 || params.park3 ?
                            <Image source={require('../../img/reserve.png')} /> :
                            <Image source={require('../../img/out.png')} />
                        }
                    </TouchableOpacity>
                    <Image source={require('../../img/on.png')} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        disabled={this.state.reserve || params.reserve ? 'true' : ''}
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    park: true,
                                                    reserve: true,
                                                    choosePark31: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        {this.state.choosePark31 || params.park4 ?
                            <Image source={require('../../img/reserve.png')} /> :
                            <Image source={require('../../img/out.png')} />
                        }
                    </TouchableOpacity>
                    <Image source={require('../../img/on.png')} />
                    <TouchableOpacity
                        disabled={this.state.reserve || params.reserve ? 'true' : ''}
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    park: true,
                                                    reserve: true,
                                                    choosePark33: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        {this.state.choosePark33 || params.park5 ?
                            <Image source={require('../../img/reserve.png')} /> :
                            <Image source={require('../../img/out.png')} />
                        }
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>4.5元/时</Text>
                {
                    this.state.park || params.park ?
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text>车锁开关</Text>
                            <Switch
                                onValueChange={
                                    (value) => {
                                        value ?
                                            Alert.alert('', '是否开启车锁，若开启车锁将进行计费',
                                                [
                                                    {
                                                        text: '是', onPress: () => {
                                                            ToastAndroid.show('开启成功，开始计费！', ToastAndroid.SHORT)
                                                            var reserveHour
                                                            if (new Date().getMinutes() >= 30) {
                                                                reserveHour = new Date().getHours() + 1
                                                            } else {
                                                                reserveHour = new Date().getHours()
                                                            }
                                                            this.setState({
                                                                lock: value,
                                                                time: reserveHour
                                                            })
                                                            this.props.orderInfo(this.props.navigation.state.params.parkname, this.state.choosePark11, this.state.choosePark13, this.state.choosePark22, this.state.choosePark31, this.state.choosePark33, reserveHour)
                                                            this.setTime(this.state.time)
                                                            fetch('http://120.79.200.81:5000/add', {
                                                                method: 'GET',
                                                            })
                                                                .then((res) => {
                                                                    return res.text()
                                                                })
                                                                .then((res) => {
                                                                    console.log(res)
                                                                })

                                                        }
                                                    },
                                                    { text: '否' }
                                                ]
                                            )
                                            :
                                            Alert.alert('', '是否关闭车锁，关闭车锁将结束计费，请尽快驶离车位',
                                                [
                                                    {
                                                        text: '是', onPress: () => {
                                                            ToastAndroid.show('关闭成功，本次消费' + `${this.state.setTime * 4.5}` + '元', ToastAndroid.SHORT)
                                                            this.setState({ lock: value })
                                                            fetch('http://120.79.200.81:5000/delete', {
                                                                method: 'GET',
                                                            })
                                                                .then((res) => {
                                                                    return res.text()
                                                                })
                                                                .then((res) => {
                                                                    console.log(res)
                                                                })
                                                        }
                                                    },
                                                    { text: '否' }
                                                ]
                                            )
                                    }
                                }
                                // style={{ marginBottom: 10, marginTop: 10 }}
                                value={this.state.lock || params.lock} />
                            {
                                this.state.time || params.time ?
                                    <Text>已停车{this.state.setTime ? this.state.setTime : 0}时</Text>
                                    : null
                            }

                        </View>
                        : null
                }
            </View>
        );
    }
}

function importStateToProps(storeState) {
    return {}
}

function importActionToProps(dispatch) {
    return {
        orderInfo: (parkname, park1, park2, park3, park4, park5, time) => {
            dispatch(orderInfo(parkname, park1, park2, park3, park4, park5, time))
        }
    }
}

export const ParkInfo = connect(importStateToProps, importActionToProps)(ParkInfoScreen)
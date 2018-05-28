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



export class ParkInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            park: false,
            lock: false
        }
    }

    confirm = () => {

    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    time: Date.now,
                                                    park: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        <Image source={require('../../img/on.png')} />
                    </TouchableOpacity>
                    <Image source={require('../../img/out.png')} />
                    <TouchableOpacity
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    time: Date.now,
                                                    park: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        <Image source={require('../../img/on.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../img/out.png')} />
                    <TouchableOpacity
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    time: Date.now,
                                                    park: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        <Image source={require('../../img/on.png')} />
                    </TouchableOpacity>
                    <Image source={require('../../img/out.png')} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    time: Date.now,
                                                    park: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        <Image source={require('../../img/on.png')} />
                    </TouchableOpacity>
                    <Image source={require('../../img/out.png')} />
                    <TouchableOpacity
                        onPress={
                            () => {
                                Alert.alert('', '是否选择车位',
                                    [
                                        {
                                            text: '是', onPress: () => {
                                                ToastAndroid.show('预约成功！', ToastAndroid.SHORT)
                                                this.setState({
                                                    time: Date.now,
                                                    park: true
                                                })
                                            }
                                        },
                                        { text: '否' }
                                    ]
                                )
                            }
                        }
                    >
                        <Image source={require('../../img/on.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>4.5元/时</Text>
                {
                    this.state.park ?
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <Text>车锁开关</Text>
                            <Switch
                                onValueChange={
                                    (value) => {
                                        this.setState({ lock: value }),
                                            value ? fetch('http://120.79.200.81:5000/add', {
                                                method: 'GET',
                                                // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                                                // body: JSON.stringify({ content: 'appAon$' })  // 这里是请求对象
                                            })
                                                .then((res) => {
                                                    return res.text()
                                                })
                                                .then((res) => {
                                                    console.log(res)
                                                }) :
                                                fetch('http://120.79.200.81:5000/delete', {
                                                    method: 'GET',
                                                    // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                                                    // body: JSON.stringify({ content: 'appAon$' })  // 这里是请求对象
                                                })
                                                    .then((res) => {
                                                        return res.text()
                                                    })
                                                    .then((res) => {
                                                        console.log(res)
                                                    })
                                    }
                                }
                                // style={{ marginBottom: 10, marginTop: 10 }}
                                value={this.state.lock} />
                        </View> : null
                }
            </View>
        );
    }
}

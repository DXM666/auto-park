/*
 * 关于界面
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, ScrollView, TouchableNativeFeedback, TouchableHighlight, Image, Alert, Linking, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Divider from '../../common/divider'

export class AboutScreen extends Component {
    static navigationOptions = {
        title: '关于',
        headerStyle: {
            backgroundColor: '#4db6ac',
            marginTop:  20,
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

    _onPressOpenSource = () => {
        Alert.alert(
            '开源协议',
            '1. react-china-location: https://github.com/JasonBoy/react-china-location\n' +
            '\n2. mobx-react: https://github.com/mobxjs/mobx-react\n' +
            '\n3. react-native-picker: https://github.com/beefe/react-native-picker\n' +
            '\n4. react-native-drawer-layout: https://github.com/react-native-community/react-native-drawer-layout\n' +
            '\n5. react-native-storage: https://github.com/sunnylqm/react-native-storage\n' +
            '\n6. react-native-swipeout: https://github.com/dancormier/react-native-swipeout\n' +
            '\n7. react-native-vector-icons: https://github.com/oblador/react-native-vector-icons\n' +
            '\n8. react-navigation: https://github.com/react-community/react-navigation\n',
            [
                { text: '确定' },
            ],
            { cancelable: false }
        )
    };

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
                <View style={styles.aboutHeader}>
                    <Image style={styles.aboutHeaderImage} source={require('../../img/park.png')} />
                    <Text style={styles.aboutHeaderText}>AutoPark</Text>
                </View>
                <TouchableNativeFeedback onPress={() => {
                    Linking.openURL('market://details?id=com.reactnativeweather').catch(err => console.error('An error occurred', err));
                }}>
                    <View style={[styles.itemContainer, { marginTop: 50 }]}>
                        <Text style={styles.text}>给个好评</Text>
                        <Icon name='ios-arrow-forward-outline' color={'rgb(54,57,66)'} size={15}
                            style={{ backgroundColor: 'transparent', marginRight: 20 }} />
                    </View>
                </TouchableNativeFeedback>
                <Divider dividerHeight={1} marginLeftValue={20} marginRightValuel={20} />
                <TouchableNativeFeedback onPress={this._onPressOpenSource}>
                    <View style={[styles.itemContainer]}>
                        <Text style={styles.text}>开源协议</Text>
                        <Icon name='ios-arrow-forward-outline' color={'rgb(54,57,66)'} size={15}
                            style={{ backgroundColor: 'transparent', marginRight: 20 }} />
                    </View>
                </TouchableNativeFeedback>
                <Divider dividerHeight={1} marginLeftValue={20} marginRightValuel={20} />
                <TouchableNativeFeedback onPress={() => {
                    Linking.openURL('https://github.com/ihewro/React-Native-Weather').catch(err => console.error('An error occurred', err));
                }}>
                    <View style={[styles.itemContainer]}>
                        <Text style={styles.text}>Github 代码</Text>
                        <Icon name='ios-arrow-forward-outline' color={'rgb(54,57,66)'} size={15}
                            style={{ backgroundColor: 'transparent', marginRight: 20 }} />
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        )
            ;

    };

}

const styles = StyleSheet.create({
    aboutHeader: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50

    },
    aboutHeaderImage: {
        width: 100,
        height: 100
    },
    aboutHeaderText: {
        marginTop: 10,
        color: '#58666e'
    },
    itemContainer: {
        flexDirection: 'row',
        height: 53,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    itemRight: {
        marginRight: 20
    },
    text: {
        textAlign: 'center',
        marginLeft: 20,
        fontSize: 15
    },
    aboutHeaderSmallText: {
        marginTop: 30,
        color: '#58666e'
    }
});

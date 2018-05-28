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

import Divider from '../../common/divider'



export class Menu extends Component {
    render() {
        console.log(this.props)
        const { navigate } = this.props.navigation;
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={require('../../img/naga.jpg')} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Georgia' }}>DXM</Text>
                <TouchableOpacity
                    onPress={
                        () => {
                            alert('是否选择车位')
                        }
                    }
                >
                    <Text style={{ fontSize: 25 }}>我的订单</Text>
                </TouchableOpacity>
                <Divider dividerHeight={1} />
                <TouchableOpacity
                    onPress={
                        () => {
                            navigate('AboutScreen')
                        }
                    }
                >
                    <Text style={{ fontSize: 25 }}>关于</Text>
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
        width: 48,
        height: 48,
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
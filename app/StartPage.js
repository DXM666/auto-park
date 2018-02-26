import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { StackNavigator } from "react-navigation";

export class StartPage extends Component {
    static navigationOptions = {
        header: false
    };
    componentDidMount() {
        const { replace } = this.props.navigation;
        setTimeout(
            () => {
                replace('HomePage')
            }, 2000
        )
    }
    render() {
        return (
            <View>
                <Image source={require('./img/timg.jpg')} />
            </View>
        )
    }
}
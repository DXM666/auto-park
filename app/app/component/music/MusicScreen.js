import React, {
    Component,
    PropTypes
} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    AppRegistry,
    TouchableHighlight
} from 'react-native';

import {TWebView} from '../../common/twebview'

export class MusicScreen extends Component {
    render() {
        //单独的页面，专门处理音乐相关操作
        //var cmapUri = "http://127.0.0.1:63342/toiletApp/toilet/html/nearby.html";
        var cmapUri = "http://music.163.com";
        return (
            <View style={styles.container}>
                <TWebView url={cmapUri}/>
            </View>
        );
    }
}

//样式表
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
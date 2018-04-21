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
        //var cmapUri = "http://uri.amap.com/navigation?from=116.478346,39.997361,startpoint&to=116.3246,39.966577,endpoint&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0";
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
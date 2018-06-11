/*
 * 用户头像
 */

import PhotoBrowser from 'react-native-photo-browser';
import React, { Component } from 'react';

export class PhotoBrowserScene extends Component {
    static navigationOptions = {
       //1.隐藏导航头部
        header: null,
    };
    _goBack = () => {
       //2.点击返回关闭页面
        this.props.navigation.goBack()
    }
    render() {
        //3.获取传入的图片等信息
        const { params } = this.props.navigation.state;
        const media = params.media
        return (
            <PhotoBrowser
                onBack={this._goBack}
                mediaList={media}
                initialIndex={0}
                displayActionButton={true}
                displayTopBar={true}
            />
        );
    }
}

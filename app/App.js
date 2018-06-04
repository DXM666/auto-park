/**
 * @name Auto Park
 * @description
 * @author DXM
 */


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { ParkScreen } from "./app/component/park/ParkScreen";
import { StartPage } from "./app/component/StartPage";
import { ParkInfo } from "./app/component/park/ParkInfo";
import { AboutScreen } from './app/component/menu/AboutScreen';
import { WeatherScreen } from './app/component/weather/WeatherScreen';
import { PhotoBrowserScene } from './app/component/menu/PhotoBrowserScene';
import { MyWallet } from './app/component/menu/MyWallet';

//注册导航
export const AutoApp = StackNavigator({
  Home: {
    screen: StartPage    //载入界面
  },
  HomePage: {
    screen: ParkScreen    //首页
  },
  ParkInfo: {
    screen: ParkInfo    //停车场信息
  },
  AboutScreen: {
    screen: AboutScreen    //关于界面
  },
  WeatherScreen: {
    screen: WeatherScreen  //天气界面
  },
  PhotoBrowserScene: {
    screen: PhotoBrowserScene    //点击查看大图
  },
  MyWallet: {
    screen: MyWallet    //我的钱包
  }
})
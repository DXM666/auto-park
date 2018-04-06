import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Button
} from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import { connect } from 'react-redux';


import { Forecast } from './Forecast'
import { requestWeatherByName_Send } from '../../action/weatheractions'


//天气模块
export class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},
            address: ''
        }
    }

    componentDidMount() {
        this.props.requestWeatherByName(this.props.city)
    }

    // fetchWeatherData(address) {
    //     var url = "https://www.sojson.com/open/api/weather/json.shtml?city=" + address;
    //     fetch(url)
    //         .then(
    //         (response) =>
    //             response.json()
    //         )
    //         .then((response) => {
    //             console.log(response)
    //             this.setState({
    //                 weather: {
    //                     main: response.data.forecast[0].type,
    //                     description_low: response.data.forecast[0].low,
    //                     description_high: response.data.forecast[0].high,
    //                     temp: response.data.ganmao
    //                 }
    //             });
    //         })
    //         .catch((error) => {
    //             console.warn(error);
    //             alert('服务异常,正在紧急修复,请耐心等待')
    //         });
    // }

    handleTextChange(addressText) {
        this.setState({
            address: addressText
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} onChangeText={(text) => this.handleTextChange(text)} />
                <TouchableHighlight
                    onPress={() => this.fetchWeatherData(this.state.address)} >
                    <Text >确认</Text>
                </TouchableHighlight>
                {
                    this.state.weather !== null ?
                        <Forecast main={this.state.weather.main} description_low={this.state.weather.description_low} description_high={this.state.weather.description_high} temp={this.state.weather.temp} /> : null
                }
            </View>
        );
    }

}

//样式表
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        fontSize: 20,
        borderWidth: 3,
        height: 44,
    }
});

function importStateToProps(storeState) {
    return {
        city: storeState.weatherReducer.city
    }
}

function importActionToProps(dispatch) {
    return {
        requestWeatherByName: (name) => {
            dispatch(requestWeatherByName_Send(dispatch, name))
        }
    }
}

export const WeatherScreen = connect(importStateToProps, importActionToProps)(Weather)
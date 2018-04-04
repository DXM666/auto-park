import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

export class Forecast extends Component {
    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    {this.props.description_low}
                </Text>
                <Text style={styles.mainText}>
                    {this.props.description_high}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp}
        </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#374256'
    },
    mainText: {
        margin:10,
        fontSize: 16,
        textAlign: 'center',
        color: '#374256'
    }
})
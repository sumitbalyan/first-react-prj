import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Forecast extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>{this.props.main}</Text>
        <Text style={styles.mainText}>
          Current conditions: {this.props.description}
        </Text>
        <Text style={styles.mainText}>
        City: {this.props.name}
      </Text>
        <Text style={styles.bigText}>{this.props.temp}°F</Text>
        
      </View>
    );
  }
}

export default Forecast;
var styles = StyleSheet.create({
    container: {
        flex: 1
      },
    bigText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color: '#000000'
    },
    mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#000000'
    }
    })
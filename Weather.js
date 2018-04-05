if (__DEV__) {
  require('react-devtools');
}
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Alert
} from "react-native";
import Forecast from "./Forecast";
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: "",
      defaultImage:{uri: 'flowers'},
      forecast:null
    };
    this._handleTextChange = this._handleTextChange.bind(this);
  }

  _handleTextChange(event) {
    let inputValue = event.nativeEvent.text;
    this.setState(previousState => {
      return { zip: inputValue };
    });
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?zip=" +
        inputValue +
        ",in&appid=bc23ca5bba0b0ee8ab9280bddf87ac8f"
    )
      .then(response => response.json())
      .then(responseJSON => {
        if(responseJSON.cod=="404"){
          Alert.alert(responseJSON.message);
        }
        else{
          this.setState(previousState => {
            return {
              defaultImage:{uri: responseJSON.weather[0].main.toLowerCase()},
              forecast: {
                main: responseJSON.weather[0].main,
                description: responseJSON.weather[0].description,
                temp: responseJSON.main.temp,
                name:responseJSON.name
              }
            };
          });
        }
      })
      .catch(error => {
        Alert.alert(error.message);
        //console.warn(error);
      });
  }
  render() {
    var content = null;
    if (this.state.forecast !== null) {
    content = <Forecast
    main={this.state.forecast.main}
    description={this.state.forecast.description}
    temp={this.state.forecast.temp}
    name={this.state.forecast.name} />;
    }
    return (
      <ImageBackground
        //source={require("./flowers.png")}
        //source={require('drawable!flowers')}
        width={'100%'} height={'100%'} source={this.state.defaultImage }
        style={styles.backdrop}
      >
        <Text style={styles.welcome}>You input {this.state.zip}.</Text>
        {content}
        <TextInput
          style={styles.input}
          returnKeyType="go"
          keyboardType="numeric"
          maxLength= {6}
          onSubmitEditing={this._handleTextChange}
        />
      </ImageBackground>
    );
  }
}

export default Weather;
var baseFontSize = 16;
var styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#4D4D4D"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#000000"
  },
  input: {
    borderWidth: 2,
    backgroundColor: "#FFF9",
    width: "100%",
    color: "#000000"
  }
});

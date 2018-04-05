import React, { Component } from 'react'
import { Text, View } from 'react-native'

 export default class Blink extends Component {
    constructor(props){
        super(props);
        this.state={isShowing:true};
        setInterval(()=>{
            this.setState(previousState=>{
                return {isShowing:!previousState.isShowing}
            });
        },1000);
    }
  render() {
      let display=this.state.isShowing?this.props.text:'';
    return (
      <View>
        <Text> {display} </Text>
      </View>
    )
  }
}

import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Ball from './src/components/Ball.js'

export default class App extends React.Component {
  state = {
    position : new Animated.ValueXY(0,0)
  }
  componentWillMount(){
    const {position} = this.state
    Animated.spring(position,{toValue : {x: 60 , y: 100}})
    .start()
  }
  render() {
    const { position } = this.state;
    return (
      <Animated.View style = {position.getLayout()}>
        <View style = {styles.forEachView}  >
          <Ball/>
        </View>
        </Animated.View>  
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});

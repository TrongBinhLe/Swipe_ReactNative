import React, {Component} from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('screen').width;

class Deck extends Component{    

  constructor(props){
    super(props)
    const position = new Animated.ValueXY()
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderMove : (event, gesture) =>{
      position.setValue({x : gesture.dx, y : gesture.dy});
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease : (event, gesture) =>{
        this.resetPosition();
      },
      
    })
    
    this.state = {_panResponder, position}
  }

  resetPosition(){
    const {position} = this.state
    Animated.spring(position,{toValue : {x: 0, y: 0}}).start();
  }

  getCardStyle() {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5 , 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120 deg','0 deg','120 deg']
    });
    return {
      ...position.getLayout(),
      transform : [{ rotate }]
    }
  }

  renderCard = ()=> {
    const { _panResponder } = this.state
    return(
      this.props.data.map((item, index)=>{
        if(index === 0){
          return(
            <Animated.View
              key = {item.id}
              style = {this.getCardStyle()}
              {..._panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          )
        }
        return this.props.renderCard(item);
      })
    )
  }
  render() {
    const {_panResponder} = this.state
      return(
          <View>
              {this.renderCard()}
          </View>
      );
    }
}

export default Deck
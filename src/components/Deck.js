import React, {Component} from 'react';
import {View, Text, PanResponder, Animated} from 'react-native';

class Deck extends Component{    

  constructor(props){
    super(props)
    const position = new Animated.ValueXY()
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder : (event, gesture) => { true },
      onMoveShouldSetPanResponderCapture : (event, gesture) =>{
      position.setValue({x : gesture.dx, y : gesture.dy});
      },
      onPanResponderRelease : (event, gesture) =>{
        position.setValue({x: 0, y: 0})
      }
      
    })
    
    this.state = {_panResponder,position}
  }
  renderCard = ()=> {
    return(
      this.props.data.map((item)=>{
        return this.props.renderCard(item);
      })
    )
  }
  render() {
    const {_panResponder} = this.state
      return(
          <Animated.View
            style = {this.state.position.getLayout()}
            {..._panResponder.panHandlers}>
              {this.renderCard()}
          </Animated.View>
      );
    }
}

export default Deck
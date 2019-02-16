import React, {Component} from 'react';
import {
  View,
  PanResponder,
  Animated,
  Dimensions} from 'react-native';
import { Card, Button, Text} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = 0.65 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION  = 1000; 
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
        if(gesture.dx > SWIPE_THRESHOLD){
          this.forceSwipe('right');
        } else if(gesture.dx < - SWIPE_THRESHOLD){
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    })
    this.state = {_panResponder, position, index : 0}
  }
  

  forceSwipe(direction){
    const SCREEN_WIDTH = Dimensions.get('screen').width;
    const x = direction === 'right' ? SCREEN_WIDTH : - SCREEN_WIDTH;
    Animated.timing(this.state.position,{
      toValue : { x , y : 0},
      duration : SWIPE_OUT_DURATION
    }).start(()=>{this.onSwipeComplete()});
  }
  
  onSwipeComplete(){
    const { index } = this.state
    this.state.position.setValue({x: 0, y: 0})
    this.setState({index : index +1})
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
      transform : [{ rotate }],
    }
  }

  renderCard = ()=> {
    const { _panResponder,index } = this.state;
    const { data } = this.props;
    if(index>= data.length){
      return (   
        <View >
          {this.props.noCardToRender()}
        </View>
      )
    }
    return(
      this.props.data.map((item, i)=>{
        if(i < index) return null ;
        if(index === i){
          return(
            <Animated.View
              key = {item.id}
              style = {[this.getCardStyle(),styles.stylecard]}
              {..._panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          )
        }

      return( 
        <View 
          key = {item.id}
          style = {styles.stylecard}
        >
          {this.props.renderCard(item)}
        </View>
      );
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

const styles = {
  stylecard :{
    position: 'relative'
  }
}

export default Deck
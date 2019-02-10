import React from 'react';
import { StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import {Card,Image,CardProps,Button} from 'react-native-elements'
import Ball from './src/components/Ball.js';
import Deck from './src/components/Deck.js';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class App extends React.Component {

  state = {
    position : new Animated.ValueXY(0,0),
    
  }
  componentWillMount(){
    const {position} = this.state
    Animated.spring(position,{toValue : {x: 60 , y: 100}})
    .start()
  }
  
  renderCard = (item)=>{
    return(
      <Card key= {item.id}>
        <Image source = {{uri: item.uri}} style = {{width: 50, height: 50}}/>
        <Text>{item.text}</Text>
        <Button
          title = 'Please Press Me !!!'
          type = 'outline'
          onPress = {()=>console.log('Thanks you !!!')}
        />
      </Card>
    );
  }
  
  render() {
    const { position } = this.state;
    return (
      // <Animated.View style = {position.getLayout()}>
        <View >
          {/* <Ball/> */}
          <Deck
            renderCard = {this.renderCard}
            data = {DATA}
          />
        </View>
        // </Animated.View>  
      
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

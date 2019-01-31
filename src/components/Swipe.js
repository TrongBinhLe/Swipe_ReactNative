import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Swipe extends Component{    

  renderCard = ()=> {
    return(
      this.props.data.map((item)=>{
        return this.props.renderCard(item);
      })
    )
  }
  render() {
      return(
          <View>
              {this.renderCard()}
          </View>
      );
    }
}

export default Swipe
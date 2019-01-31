import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Ball extends Component {
    render(){
        return(
					<View style = {styles.ballStyles}>
						<Text>Ball</Text>
					</View>
        );
    }
}

styles = {
	ballStyles : {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: 'green',
    borderWidth: 50,
  },
  textStyles : {
  }
}
export default Ball;

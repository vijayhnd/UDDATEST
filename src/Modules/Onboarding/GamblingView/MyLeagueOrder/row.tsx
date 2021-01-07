import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';

const window = Dimensions.get('window');

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


var update = require('immutability-helper');
export default class Row extends Component {
  public _active;
  public _style;
  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }) 
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
        useNativeDriver:false
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,{height:'30%'}
      ]} >
        <Image source={data.icon} style={styles.image} />
        <Text style={styles.text}>{data.title}</Text>
        <Icon name="menu" size={20} color="grey" style={styles.icons} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        //paddingHorizontal: 30,
      },

      android: {
      //  paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '1%',
    // height: 50,
    flex: 1,
    marginTop: '2%',
    borderRadius: 4,
    borderColor: '#68bcbc',
    borderWidth: 1,
    


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
        marginLeft: 30,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginLeft: 30,
      },
    })
  },

  image: {
    width: 20,
    height: 20,
    marginLeft: '3%',
    marginRight: '5%',
    //borderRadius: 25,
  },

  text: {
    fontSize: hp(1.8),
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    width:'76%',
    textAlign:'left'
   
  },
  icons: {
    alignSelf: 'flex-end',
    paddingVertical:Platform.OS === 'ios' ?hp(2.9):0,
    // paddingVertical: hp(2.9),
  },
});
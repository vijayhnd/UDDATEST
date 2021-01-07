import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  Platform,
  Button,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-navigation';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class ReactNativeYouTubeExample extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    playerWidth: Dimensions.get('window').width,
  };

  _youTubeRef = React.createRef();

  render() {
    return (
      <View>
        <SafeAreaView forceInset={{ bottom: 'never' }}>
<View style={{height: 70,width:'100%',flexDirection:'row',justifyContent:'flex-start',alignSelf:'center',marginTop:10}}>
<Icons name="arrow-back" size={30} color="black" 
           onPress={() => this.props.navigation?.goBack(null)}
          />
</View>
     
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>{'<YouTube /> component for React Native.'}</Text> */}

        <YouTube
          ref={this._youTubeRef}
          // You must have an API Key for the player to load in Android
          apiKey="YOUR_API_KEY"
          // Un-comment one of videoId / videoIds / playlist.
          // You can also edit these props while Hot-Loading in development mode to see how
          // it affects the loaded native module
          videoId={this.props.navigation.state.params.params.video_id}//"9ZhkYyPxRjE"//"xuCn8ux2gbs"
          // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
          // playlistId={this.props.navigation.state.params.params.video_id}//"PLF797E961509B4EB5"
          play={this.state.isPlaying}
          loop={this.state.isLooping}
          fullscreen={this.state.fullscreen}
          controls={1}
          style={[
            { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) },
            styles.player,
          ]}
          // style={[
          //   { height: 400 },
          //   styles.player,
          // ]}
          onError={e => {
            this.setState({ error: e.error });
          }}
          onReady={e => {
            this.setState({ isReady: true });
          }}
          onChangeState={e => {
            this.setState({ status: e.state });
          }}
          onChangeQuality={e => {
            this.setState({ quality: e.quality });
          }}
          onChangeFullscreen={e => {
            this.setState({ fullscreen: e.isFullscreen });
          }}
          onProgress={e => {
            this.setState({ currentTime: e.currentTime });
          }}
        />

        {/* Playing / Looping */}
       
      </View>
      </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'white',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginTop:'20%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

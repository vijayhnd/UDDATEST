import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    $width : '$screenWidth',
    $indicatorColor: '$activityIndicatorColor',
    container: {
        
        justifyContent: 'center',
        position:'absolute',
        backgroundColor: '$popupBackgroundColor',
        alignItems: 'stretch',
        width: '$width',
        height: '$screenHeight'
      },
      horizontal: {
        flexDirection: 'column'
      }
});
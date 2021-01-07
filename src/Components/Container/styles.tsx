import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default EStyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'stretch',
        height: '$screenHeight',
        width: '$screenWidth',
        paddingTop: Platform.OS === 'ios' ? hp(4) : 0
    },
    headerContainer: {
        
    },
    subHeaderContainer: {
        
    },
    titleContainer: {
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1
    }
});
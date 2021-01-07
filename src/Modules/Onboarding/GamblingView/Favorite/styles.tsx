import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default EStyleSheet.create({
    // hrline:{
    //     borderBottomColor: '$backgroundColorHeader',
    //     borderBottomWidth: hp(.1),
    // },
    scrollContent: {
        width: screenWidth,
        height: '80%',
        paddingBottom: '20%',
        flex: 1
    },
    mainContents: {
        //backgroundColor: '#eeeeee',
        width: '100%',
        height: '100%'
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    ThirdContainer: {
        width: '98%',
        paddingHorizontal: '2%'
    },
    Input_Container: {
        width: '100%',
        marginTop: 8
    }, inputPadding: {
        alignContent: 'center', padding: 3,
    }
});
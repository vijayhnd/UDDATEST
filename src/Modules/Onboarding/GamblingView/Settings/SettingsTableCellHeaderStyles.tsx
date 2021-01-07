import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    mainContent:{
        flexDirection: 'row',
        paddingLeft: wp(5),
        paddingRight: wp(2),
        height: hp(7),
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    selectedBackgroundStyle:{
        backgroundColor: '#D5D5D5'
    },
    unselectedBackgroundStyle:{
        backgroundColor: 'white'
    },
    titleStyle:{
        flex:1,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.5),
        //backgroundColor: 'blue',
        paddingLeft: wp(2),
        alignSelf: 'center',
    },
    selectedTitleStyle:{
        color: '$appGreen'
    },
    unselectedTitleStyle:{
        color: 'black'
    },
    cellIcon:{
        justifyContent:'center',
        //backgroundColor: 'green',
    },
    nextIcon:{
        justifyContent:'center',
        paddingRight: wp(5),
        backgroundColor: 'transparent',
    }
})
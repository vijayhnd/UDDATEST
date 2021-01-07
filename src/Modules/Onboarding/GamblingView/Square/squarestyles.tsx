import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    customhead:{
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
      },
      customheadtext:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(2.6), 
        color: '#3a9797', 
        textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
    },
    customheadtext1:{ 
        fontFamily: 'Montserrat-Bold', 
        fontSize: hp(2), 
        color: '#d8480f', 
        textAlign: 'center', 
        marginTop: 7, 
        alignContent: 'center' 
    },
    placebutton:{ 
        backgroundColor: '#68bcbc',
        height: hp(10.5),
        width:'100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignContent: 'center',
        borderWidth: 1, 
        borderColor: 'white',
    },
    placebutton1:{ 
        backgroundColor: 'white',
        height: hp(10.5),
        width:'100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignContent: 'center',
        borderWidth: 1, 
        borderColor: '#68bcbc',
    },
    toptext:{
        width:'65%',
        padding:5,
        backgroundColor:'#68bcbc',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    dropdown:{
        fontFamily: 'Montserrat-Bold',
        width:'25%',
        padding:5,
        backgroundColor:'#888888',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    sidetext:{
        width:'10%',
        backgroundColor:'#68bcbc',
        padding:13,
        justifyContent:'center',
        alignContent:'center'
    },
    header1:{
        height:60,        
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'flex-end',
        borderRightWidth: 1,
        borderLeftColor: '#c6c6c6',
        borderRightColor: '#c6c6c6',
        borderBottomColor: '#c6c6c6',
        borderBottomWidth:1
    },
    header2:{
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'flex-end',
        borderRightWidth: 1,
        borderLeftColor: '#c6c6c6',
        borderRightColor: '#c6c6c6',
        borderBottomColor: '#c6c6c6',
        borderBottomWidth:1
    },
    table_title_info_container: {
        width: 20,
        height: 20,
        backgroundColor: '#c8ffff',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    table_title_info_text: {
        textAlign: 'center',
        marginRight: 5,
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
    },
    CloseView: {
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 0,
        paddingBottom: 0,
  
    },
    Text_Style: {
        color: '#505050',
        fontSize: hp(2.2),
        fontFamily: 'Montserrat-Bold'
    },
    flatlist_matchup_text_style: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.0),
        color: '#68bcbc',

    },
    quartertext:{
        fontSize: hp(2.2),
         color: '#373737',
          fontFamily: 'Montserrat-Bold',
          textAlign:'center'
    }
    //hearder2:{height:60,justifyContent:'flex-end',borderRightWidth: 1,borderLeftColor: '#c3c3c3',borderBottomWidth:1}
    
})
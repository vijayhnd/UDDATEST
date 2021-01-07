import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white' 
    },

    /* --------------------- Titles ---------------- */

    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#666666',
        paddingTop: hp(0.2),
        paddingBottom: hp(0.2),
        alignContent: 'center'
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.4),
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },


    /* --------------------- Game Header ---------------- */

    gameheader: {
        width: '100%',
        backgroundColor: '#f26522',
        height: 30,
        flexDirection: 'row',
        marginTop: 1,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,

    },
    gameheadertext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(2.0),
        paddingLeft: 2,
    },
    gamecounttext: {
        color: 'yellow',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.9),
    },

    /* --------------------- Game Date & Time ---------------- */

    gamedatetimecontainer: {
        backgroundColor: '#666666',
        flexDirection: 'row',
        paddingTop: hp(0.6),
        paddingBottom: hp(0.6),
        paddingLeft: 8,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    datetext: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
    },
    daytext: {
        color: '#666666',
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.5),
    },

    /* --------------------- Game List Main Container ---------------- */

    gamelistcontainer: {
        backgroundColor: 'green',
        height: 60,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },

    gamelistindexcontainer: {
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },

    indextext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6),
    },

    teamtitletext: {
        color: '#68bcbc',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.4),
        flexWrap:'wrap'
    },

    teamoddstext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.5),
    },

    team2titletext: {
        color: '#888888',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.3),
        flexWrap:'wrap'

    },

    team2oddstext: {
        color: '#888888',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.3),
        marginLeft: '4%'
    },

    teamtotaltext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.8),

    },
    gamelisttotaldollertext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.3),
        marginBottom: 5
    },
    gamelistteamcontainer: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '67%',
    },
    gamelistteam1container: {
        flexDirection: 'row',
        backgroundColor: '#68bcbc',
        height: '50%',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },

    gamelistmatchup: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '40%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        paddingLeft: 4,
    },
    gamelistamountbet: {
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '30%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    gamelistline: {
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gamelistmatchupteam2: {
        backgroundColor: '#EEEEEE',
        height: '100%',
        width: '40%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        paddingLeft: 4,
    },
    gamelistamountbetteam2: {
        backgroundColor: '#DDDDDD',
        height: '100%',
        width: '30%',
        borderRightColor: 'white',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gamelistlineteam2: {
        backgroundColor: '#DDDDDD',
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gamelistteam2container: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: '50%',
        width: '100%',
    },

    gamelisttotalcontainer: {
        backgroundColor: '#68bcbc',
        height: '100%',
        width: '25%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        flexDirection: 'row'
    },


    // --------------03-06-2019
    NameHeaderContainer: {
        backgroundColor: '$white',
        flexDirection: 'row',
        alignContent: 'center',
        padding: hp(1.5)

    },
    NameStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.3),
        color: '#68bcbc',
        alignSelf: 'flex-start',
    },

    // ---------------------- 03-06-2019 ---------------------
    OtherTextContainer: {
        flexShrink: 1,
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    OtherTextSubContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '70%',
        marginBottom:'10%',
    },
    UnderConstText: {
        color: '#68bcbc',
        fontSize: hp(3.2),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    DescText: {
        color: 'black',
        fontSize: hp(1.9),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    GotoDashboardText:{
        color: '#68bcbc',
        fontSize: hp(1.6),
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold',
        textDecorationLine: 'underline'
        
    },
      // ------------------------ 20-06-2019
      QuestionContainer:{
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: '50%',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingLeft:4,
    },
    Quetitletext: {
        color: '#333333',
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.2),
        textAlign:'center'
    },
    Proptitletext: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.0),
    },




    /*******************ashis css */
    DialogMain1: {
        backgroundColor: 'white',
       // height:hp(60)
    },
    CloseView: {
      alignItems: 'flex-end',
      width: 'auto',
      marginTop: 5,
      marginRight: 5,
      marginBottom: 0,
      paddingBottom: 0,

  },
  DialogHeaderMain: {
      justifyContent: "center",
      alignItems: "center",
    //   backgroundColor: 'white'
  },
  DialogHeaderText: {
      padding: 6,
      paddingTop: 0,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: hp(2.4),
      color: '#68bcbc',
  },
  DialogSubmain: {
      alignItems: "center",
    //   backgroundColor: "#DDDDDD",
      width: '100%'
  },
  resultcontainer1:{
    minHeight:"70%",
    width:wp(86),
   alignContent:'center',
//    backgroundColor:'$backgroundColorHeader',
   justifyContent:'center',
   alignItems:'center'
 },
 cardtext:{
  flexDirection:'column',
  borderWidth:1,
  backgroundColor:'white',
  borderColor:'$backgroundColorHeader',
  padding:10,
  width:wp(78),

},

// ashish add css
DialogHeaderMain1: {
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: 'white'
},

/// styles of pool dialog
headerviewdialog:{
    backgroundColor:'#68bcbc',
    height:hp(5),
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginBottom:10
},
datetimeicon:{ 
    width: '10%', 
    justifyContent: 'center', 
    alignItems: 'flex-end' 
},
customtextinputpool:{ 
    marginTop:5,
    width: '100%',   
    backgroundColor: '#eeeeee' ,
    borderColor: '#cfcfcf',
     borderWidth: 1,
      borderRadius: 3
},
customtextinputpool1:{ 
    marginTop:5,
    width: '100%',   
    backgroundColor: '#eeeeee' ,    
      borderRadius: 3
},
datetimetext:{              
    fontFamily: 'Montserrat-SemiBold',           
    fontSize: hp(1.6), 
    paddingLeft:10
},
settlepool:{
    color:'white',
    textAlign:'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp(2), 
},
imageclose:{
    justifyContent:'flex-end',
    position:'relative',
    paddingTop:20,
    backgroundColor:'black',
    paddingLeft:10
},

    timecontainer: {
        backgroundColor: '#DDDDDD',
        paddingTop: hp(0.6),
        paddingBottom: hp(0.6),
        paddingLeft: 8,
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    betclosetext:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.6), 
        color:'#666666'
    },
    daystext:{
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(1.6), 
        color:'#666666'
    },
    timetext:{
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6), 
        color:'#8d8d8d'
    },

});
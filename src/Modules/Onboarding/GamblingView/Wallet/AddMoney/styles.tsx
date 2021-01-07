import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ImageBackground } from 'react-native';

export default EStyleSheet.create({
    scrollContent: {
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        flex: 1
    },
    mainContent: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    scrollviewstyle: {
        backgroundColor: '#efeeee',
        width: '100%'
    },
    Withdraw_Main_Container: {
        width: '100%',
        height: '15%',
        backgroundColor: 'white',
        padding: 15,
        marginTop: 5
    },
    Text_Container: {
        flexDirection: 'row',
        height: 'auto',
        width: '100%'
    },
    text_style: {
        width: '90%',
        color: '#737373',
        fontSize: 16,
        justifyContent: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    texticon_style: {
        width: '10%',
        height: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
    line_style: {
        width: '100%',
        height: 1,
        backgroundColor: "#bfbfbf",
        marginTop: 5
    },
    payment_type_main_container: {
        paddingTop: 10,
        paddingBottom: 10
    },
    Payment_Image: {
        width: '48%',
        height: 40,
        borderWidth: 1,
        padding: 2,
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5

    },
  
    Venom_Image_Size: {
        width: '50%',
        height: '100%',
    },
    Square_Image_Size: {
        width: '50%',
        height: '100%'
    },
    ACH_Image_Size: {
        width: '70%',
        height: '90%'
    },
    payment_type:
    {
        fontSize: 14,
        color: '#909090',
        fontFamily: 'Montserrat-Bold',
        marginTop: 8,
        marginBottom: 4,
    },
    Main_Container_payment: {
        width: '100%',
        backgroundColor: '#efeeee',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,

    },
    Payment_Type_card:
    {
        width: '100%',
        height: 120,
        padding: 4,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 2
    },
    ACH_Main_Layout:
    {
        width: '98%',
        height: '50%',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 5
    },
    ach_image: {
        width: '30%',
        height: 45,
        alignItems: "flex-end",
        justifyContent: "center",
        alignContent: 'center'
    },
    ach_text: {
        width: '70%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    payment_details: {
        fontSize: 14,
        color: '#909090',
        marginTop: 8,
        marginBottom: 4,
        fontFamily: 'Montserrat-Bold'
    },
    card_detail: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    Payment_Detail_card:
    {
        width: '100%',
        height: 'auto',
        padding: 8,
        backgroundColor: 'white',
        marginTop: 2,
        elevation: 1,
    },
    Enter_Amount_Style: {
        width: '100%',
        height: 'auto',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 2,
        flexDirection: 'row',

    },

    Card_Image: {
        width: '15%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Card_No: {
        width: '57%',
        height: 'auto',
        alignItems: 'center',
        flexDirection: 'row'
    },
    Date: {
        width: '20%',
        height: 'auto',
        alignItems: 'flex-end',
        marginRight: 2,
        justifyContent: 'center',
    },
    Spinner: {
        width: '8%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    visa_image: {
        width: 25,
        height: 25
    },
    text_no: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 3

    },
    dot_one: {
        width: 50,
        height: 50,
        backgroundColor: '#000000',
        borderRadius: 10,
    },
    text_date: {
        fontSize: 12,
        color: '#666666'
    },
    spinner_image: {
        width: 25,
        height: 25
    },
    Main_Add_New_Container: {
        width: '100%',
        height: 20,
        alignItems: 'flex-end',
        marginTop: 10,
    },
    add_new_container: {
        width: '50%',
        height: 'auto',
    },
    text_add: {
        color: '#68bcbc',
        fontSize: 12,
        textDecorationLine: 'underline',
        textDecorationColor: '#68bcbc'
    },
    More_Card_Detail: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    Name_On_Card: {
        width: '49%',
        height: 'auto',
    },
    text_name_on_card: {
        fontSize: 12,
        color: '#000000',
        fontFamily: 'Montserrat-Bold'
    },
    text_name:{
        fontSize: 14,
        color: '#666666',
    },
    Billing_Addresss: {
        width: '49%',
        height: 'auto',    
    },
    Main_Button_Container:{
        width:'100%',
        height:'auto',
        marginTop:10,
        flexDirection:'row'
    },
    Button_Container:{
        width:80,
        height:30,
        backgroundColor:'#68bcbc',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    Button_Edit_Container:{
        width:50,
        height:30,
        backgroundColor:'#68bcbc',
        marginLeft:5,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    Add_Details_Container:{
        width:'100%',
        height:'auto',
        backgroundColor:'#dddddd',
        alignItems:'center',
        marginTop:10
    },
    Second_Container:{
        width:'90%',
        height:'auto',
        marginTop:10,
        marginBottom:10,
    },
    Card_View:{
        width:'100%',
        height:'auto',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 8,
    },
    Card_Image_Style:{
        width:50,
        height:30
    }
});






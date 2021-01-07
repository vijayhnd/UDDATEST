import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    scrollContent: {
        padding: 0,
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
        width:'100%'
    },
    Withdraw_Main_Container: {
        width: '100%',
        height: '15%',
        backgroundColor: 'white',
        padding: 15,
        marginTop:5
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
    Gpay_Image_Size: {
        width: '100%',
        height: '100%'
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
        height: 'auto',
        padding: 4,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 2
    },
    ACH_Main_Layout:
    {
        width: '98%',
        height: 50,
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 5,

    },
    ACH_Main_Layout2:
    {
        width: '98%',
        height: 50,
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 5,

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
        height: '30%',
        marginTop: 4,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 6
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
    direct_text_style: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },
    automated_text_style: {
        fontSize: 8,
        color: '#7a7a7a',
        fontFamily: 'Montserrat-Regular',
    },
    share_text_style:
    {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },
    make_text_style: {
        fontSize: 8,
        color: '#7a7a7a',
        fontFamily: 'Montserrat-Regular',
    },
    row_style: {
        flexDirection: 'row',
        width: '100%',
        padding: 2,
        marginTop: 4
    },
    make_a_donation_text: {
        color: '#acacac',
        fontSize: 10,
        width: '80%',
        fontFamily: 'Montserrat-Bold',
    },
    learn_more_text_style: {
        fontSize: 10,
        color: '#e2201d',
        justifyContent: 'flex-end',
        fontFamily: 'Montserrat-Bold'
    },
    spinner_style: {
        color: '#6c6c6c',
        fontFamily: 'Montserrat-Bold',
        width: '90%',
        height: 'auto',
        justifyContent: 'center'
    },
    more_icon_style: {
        width: '10%',
        height: 'auto',
        justifyContent: 'flex-end'
    },
    dollar_text_style: {
        color: '#686868',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'
    },
    money_text: {
        color: '#686868',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 4
    },
    button_style: {
        width: '100%',
        height: 35,
        backgroundColor: '#e2201d',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    send_money_text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    },
    cancel_text: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    line_view_style: {
        width: 50,
        height: 2,
        backgroundColor: '#eee2e2'
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
    DialogMain: {
        backgroundColor: 'white',
        margin: 10,
    },
    CloseView: {
        alignItems: 'flex-end',
        width: 'auto',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 0,
        paddingBottom: 0,
       
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
 



});






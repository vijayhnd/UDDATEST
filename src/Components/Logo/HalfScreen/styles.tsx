import {Dimensions, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const imageWidth = Dimensions.get('window').width - 40;

export default EStyleSheet.create({
    $largeContainerSize: imageWidth,
    $largeImageSize: imageWidth,
    $smallContainerSize: imageWidth,
    $smallImageSize: imageWidth,
    container: {
        alignItems: 'center',
        width: imageWidth
    },
    image: {
    },
    text: {
        fontWeight: '600',
        fontSize: 28,
        letterSpacing: -0.5,
        marginTop: 15,
        color : '$white'
    }
});
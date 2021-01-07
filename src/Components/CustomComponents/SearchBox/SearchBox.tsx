import React, { ReactNode, Component } from "react";
import styles from "./styles";
import INavigationProps from "../..";
import { TextInput, View, Keyboard } from "react-native";
import SearchIcon from '../../Icons/SearchIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ContainerProps extends INavigationProps {
    title? : string
}

export default class SearchBox extends Component<ContainerProps> {

    constructor(props: ContainerProps) {
        super(props);
    }

    render() { 
        return(
            <View style={styles.searchBoxMainContainer}> 
                <View style={styles.searchBoxContainer}>
                    <TextInput
                        
                        style={styles.inputTextStyle}
                        placeholder = {'SEARCH'}
                        placeholderTextColor = '#333333'
                        // onChangeText={(text) => this.setState({ text })}
                        
                    />
                </View>
                <View style={styles.searchIconContainer}>
                    <SearchIcon />
                </View>
            </View>
        );
    }
}
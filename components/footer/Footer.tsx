import React from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {User} from '../../assets/svgs/login/User';
import {Book} from '../../assets/svgs/footer/Book';
import {Calendar} from '../../assets/svgs/footer/Calendar';
import {Plus} from '../../assets/svgs/footer/Plus';
import {Home} from '../../assets/svgs/footer/Home';

export const Footer= () => {
    const navigation = useNavigation();

    const ProfileNavigator=()=>{
        navigation.navigate('Profile' as never);    
    }
    const test=()=>{

    }
    return(
        <View style={FooterStyles.container}>
            <TouchableOpacity  style={FooterStyles.button} hitSlop={8} onPress={()=>test()}><Home color="white" size={24} /></TouchableOpacity>
            {/* <TouchableOpacity  style={FooterStyles.button} hitSlop={8} onPress={()=>test()}><Book color="white" size={24} /></TouchableOpacity> */}
            <TouchableOpacity  style={FooterStyles.button} hitSlop={8} onPress={()=>test()}><Plus color="white" size={24} /></TouchableOpacity>
            {/* <TouchableOpacity  style={FooterStyles.button} hitSlop={8} onPress={()=>test()}><Calendar color="white" size={24} /></TouchableOpacity> */}
            <TouchableOpacity  style={FooterStyles.button} hitSlop={8} onPress={()=>ProfileNavigator()}><User color="white" size={24} /></TouchableOpacity>
        </View>
    );
}

const FooterStyles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '10%',
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#181616ff',
    },
    button: {
        display: 'flex',
        width: '15%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#181616ff',
    }
  
});
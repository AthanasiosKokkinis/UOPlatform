import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Navbar} from "../components/navigation/Navbar";
export const AboutScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.text}>
                {"This is the about Screen"}
            </Text>
            <Button onPress={() => {navigation.navigate("Login");}} title={'Login'} color={'#043454'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black',
    },
    title:{
        fontSize:24,
        color:'white',
        marginBottom:60,
    },
    text:{
        fontSize:16,
        height:"70%",
        color:'white'
    }
})
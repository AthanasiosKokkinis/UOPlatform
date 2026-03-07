import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>
                {"This is the HomeScreen"}
            </Text>
            <Button onPress={() => {navigation.navigate("Login");}} title={'Logout'} color={'#043454'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
import React from "react";

import {View, Text, StyleSheet} from "react-native";
import {LoginForm} from "../components/login-area/LoginForm";


export const LoginScreen = () =>
{
    return(
        <View style={styles.container}>
            {/* <Text>
                {"This is the LoginScreen"}
            </Text> */}
            <LoginForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
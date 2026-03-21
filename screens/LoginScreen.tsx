import React from "react";

import {View, Text, StyleSheet} from "react-native";
import {LoginForm} from "../components/login-area/LoginForm";
import {Hat} from '../assets/svgs/login/Hat';


export const LoginScreen = () =>
{
    return(
    
        <View  style={loginFormStyles.container}>
            <View style={loginFormStyles.Over}>
                <Hat color="yellow" size={30}/>
                <Text>{"Community"}</Text>
            </View>
            <View style={loginFormStyles.Middle}>
                <LoginForm />
            </View>
            <View style={loginFormStyles.Under}>
                <Text>{"Make acount"}</Text>
            </View>
       
        </View>

        
    );
}

const loginFormStyles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'red',
        rowGap:10
    },
    Over:{

        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        width: "50%",
        height: "20%",
        paddingHorizontal: 16,
        backgroundColor: "grey",
        rowGap: 30,
        paddingVertical: 5,
        borderRadius:20
    },
    Middle:{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        width: "80%",
        height: "30%",
        paddingHorizontal: 16,
        backgroundColor: "grey",
        rowGap: 30,
        paddingVertical: 5,
        borderRadius:20
    }
    ,
    Under:{
        display: "flex",
        flexDirection: "column",
        alignItems:"flex-start",
        justifyContent: "center",
        width: "50%",
        height: "10%",
        paddingHorizontal: 16,
        backgroundColor: "grey",
        rowGap: 30,
        paddingVertical: 20,
        borderRadius:20
    }
 
})
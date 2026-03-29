import React from "react";

import {View, Text, StyleSheet} from "react-native";
import {LoginForm} from "../components/login-area/LoginForm";
import {Hat} from '../assets/svgs/login/Hat';


export const LoginScreen = () =>
{
    return(
    
        <View  style={loginFormStyles.container}>
            <View style={loginFormStyles.Over}>
              <View style={{backgroundColor:'#ce951aff',borderRadius:10,width:"60%",height:"60%",justifyContent: 'center',alignItems:"center"}}><Hat /></View>
                <Text style={{color:'white',fontSize:25}}>{"Uoplatform"}</Text>
            </View>
            <View style={loginFormStyles.Middle}>
                <LoginForm />
            </View>
            <View style={loginFormStyles.Under}>
                <Text style={{color:'white'}}>{"Make an account"}</Text>
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
        backgroundColor:'#8e2436ff',
        rowGap:20
    },
    Over:{

        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        width: "50%",
        height: "20%",
        paddingHorizontal: 16,
        backgroundColor:'',
        rowGap: 30,
        paddingVertical: 5,
        borderRadius:20

    },
    Middle:{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        width: "90%",
        height: "40%",
        backgroundColor:'',
        paddingVertical: 5,
        borderRadius:20
    }
    ,
    Under:{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        width: "40%",
        height: "7%",
        paddingHorizontal: 16,
        backgroundColor:'',
        rowGap: 30,
        paddingVertical: 20,
        borderRadius:20,
        
    }
 
})
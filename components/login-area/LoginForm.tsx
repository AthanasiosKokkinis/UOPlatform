import React from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";


export const LoginForm = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const navigation = useNavigation();
    
    const CORRECT_USERNAME = "USERNAME";
    const CORRECT_PASSWORD = "PASSWORD";

    
    const handleLogin = () =>
    {
        if(username === CORRECT_USERNAME && password === CORRECT_PASSWORD)
        {
            navigation.navigate("Main");
        }
    }
    
    
    return(
        <View style={loginFormStyles.loginFormContainer}>
            <View style={loginFormStyles.loginFormTextInputContainer}>
                <Text style={{textAlign:"left", width: "100%"}}>
                    {"Username"}
                </Text>
                <TextInput style={loginFormStyles.userNameForm} placeholder="UserName" value={username} onChangeText={(value)=>setUsername(value)}/>
            </View>

            <View style={loginFormStyles.loginFormTextInputContainer}>
                <Text style={{textAlign:"left", width: "100%"}}>
                    {"Password"}
                </Text>
                <TextInput placeholder="Your Password" value={password} onChangeText={(v) => setPassword(v)} style={loginFormStyles.passwordField} autoCapitalize="none" spellCheck={false} secureTextEntry={true} />
            </View>

            <TouchableOpacity style={{backgroundColor: "green", paddingHorizontal: 10, paddingVertical: 5, borderColor: "black", borderWidth: 1}} onPress={()=>handleLogin()}>
                <Text style={{color: "white"}}>
                    {"PRESS ME"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const loginFormStyles = StyleSheet.create({
    loginFormContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems:"flex-start",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingHorizontal: 16,
        backgroundColor: "white",
        rowGap: 30,
        paddingVertical: 20,
    },
    loginFormTextInputContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        justifyContent: "center"
    },
    passwordField: {
        backgroundColor: "#ffffff",
        borderColor: '#000000',
        width: "100%",
        borderStyle: 'solid',
        borderWidth: 1
    },
    userNameForm:{
        backgroundColor:"white",
        width: "100%",
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1
        
    }
});
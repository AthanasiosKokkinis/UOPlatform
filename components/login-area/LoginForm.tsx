import React from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Eye} from '../../assets/svgs/login/Eye';
import {EyeClosed} from '../../assets/svgs/login/EyeClosed';
import {User} from '../../assets/svgs/login/User';
export const LoginForm = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [hidden,setHidden]=React.useState<boolean>(true);
    const navigation = useNavigation();
    
    const CORRECT_USERNAME = "USERNAME";
    const CORRECT_PASSWORD = "PASSWORD";

    
    const handleLogin = () =>
    {
        if(username === CORRECT_USERNAME && password === CORRECT_PASSWORD)
        {
            navigation.navigate('Post' as never);        
        }
    }
    const handleHidden=()=>{
        setHidden(!hidden);
    }
 
    return(
        <View style={loginFormStyles.loginFormContainer}>
            <View style={loginFormStyles.loginFormTextInputContainer}>
                <View style={{backgroundColor:  "#474242", height: "100%", display: "flex", flexDirection: "column"}}>
                    {/* <User color="rgb(0, 0, 0)" size={24}/> */}
                    <User color="red" size={24} />

                </View>
                {/* <Text style={{textAlign:"left", width: "10%",backgroundColor: "#474242", color: "white"}}>
                    {"Username"}
                </Text>  */}
                <TextInput style={loginFormStyles.userNameForm} placeholder="UserName" value={username} onChangeText={(value)=>setUsername(value)}/>
            </View>

            <View style={loginFormStyles.loginFormTextInputContainer}>
                {/* <Text style={{textAlign:"left", width: "100%",backgroundColor: "#474242",}}>
                    {"Password"}
                </Text> */}
                
                <TextInput placeholder="Your Password" value={password} onChangeText={(v) => setPassword(v)} style={loginFormStyles.passwordField} autoCapitalize="none" spellCheck={false} secureTextEntry={hidden} />
                
                <TouchableOpacity  hitSlop={8} onPress={()=>handleHidden()}>
                    {
                        hidden && (
                             <EyeClosed color="rgb(0, 0, 0)" size={24} />
                        )
                    }
                    {
                        !hidden && (
                            <Eye color="rgb(0, 0, 0)" size={24} />
                        )
                    }
                </TouchableOpacity>
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
        backgroundColor: "grey",
        rowGap: 30,
        paddingVertical: 5,
        borderRadius:20
    },
    loginFormTextInputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        justifyContent: "center",
        backgroundColor: "#474242",
        borderRadius:10


    },
    passwordField: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#474242",
        borderColor: '#474242',
        width: "80%",
        borderStyle: 'solid',
        
    },
    userNameForm:{
        backgroundColor:"#474242",
        width: "100%",
        borderStyle: 'solid',
        borderColor: '#474242',
        borderRadius:10
        
    }
});
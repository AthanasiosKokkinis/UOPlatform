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
                <View style={{backgroundColor:  "#474242", height: "80%", display: "flex", flexDirection: "column",marginLeft:'7%',marginRight:"5%"}}>
                    {/* <User color="rgb(0, 0, 0)" size={24}/> */}
                    <User color="black" />

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
                             <EyeClosed color="black" size={24} />
                        )
                    }
                    {
                        !hidden && (
                            <Eye color="black" size={24} />
                        )
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={loginFormStyles.ButtonForm} onPress={()=>handleLogin()}>
                <Text>
                    {"Enter"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const loginFormStyles = StyleSheet.create({
    loginFormContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingHorizontal: '2%',
        backgroundColor:"#331f04ff",
        rowGap:'5%',
        paddingVertical:'10%',
        borderRadius:10
    },
    loginFormTextInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "20%",
        backgroundColor: "#474242",
        borderRadius: 10,
        paddingHorizontal:'5%', 
        marginVertical: '1%',
        
    },
    passwordField: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#474242",
        width: "80%",
        borderStyle: 'solid',
        
    },
    userNameForm:{
        backgroundColor:"#474242",
        width: "90%",
        borderStyle: 'solid',
        borderColor: '#474242',
        borderRadius:10
        
    },
    ButtonForm:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#2b1d1dff",
        width: "30%",
        height:"30%",
        borderStyle: 'solid',
        borderColor: '#474242',
        borderRadius:10
        
    }
});
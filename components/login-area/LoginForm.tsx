import React from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Eye} from '../../assets/svgs/login/Eye';
import {EyeClosed} from '../../assets/svgs/login/EyeClosed';
import{Lock} from '../../assets/svgs/login/Lock';
import {User} from '../../assets/svgs/login/User';

import { useAuthStore } from "../../stores/authStore";

export const LoginForm = () => {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [hidden,setHidden]=React.useState<boolean>(true);
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    const [mode, setMode] = React.useState<"signIn" | "signUp">("signIn");
    const navigation = useNavigation<any>();

    const {user, loading, signIn, signUp} = useAuthStore();


    const handleLogin = async () =>
    {
        setErrorMsg("");
        try {
            if (mode === "signIn") {
                await signIn(username, password);
            } else {
                await signUp(username, password);
            }
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        } catch (err: any) {
            setErrorMsg(err?.message ?? "Authentication failed");
        }
    }
    const handleHidden=()=>{
        setHidden(!hidden);
    }
 
    return(
        <View style={loginFormStyles.loginFormContainer}>
            <Text style={{color:"white",fontSize:18, alignSelf:'flex-start',marginLeft:"6%"}}>Καλώς ήρθες!</Text>
            <Text style={{color:"#474242", alignSelf:'flex-start',paddingVertical:'1%',marginLeft:"6%"}}>Συνδέσου με τον λογαριασμό σου</Text>
            <View style={loginFormStyles.loginFormTextInputContainer}>              
                    <User color="white" size={18} />
                {/* <Text style={{textAlign:"left", width: "10%",backgroundColor: "#474242", color: "white"}}>
                    {"Username"}
                </Text>  */}
                <TextInput style={loginFormStyles.userNameForm} placeholderTextColor="white" placeholder="UserName" value={username} onChangeText={(value)=>setUsername(value)}/>
            </View>

            <View style={loginFormStyles.loginFormTextInputContainer}>
                {/* <Text style={{textAlign:"left", width: "100%",backgroundColor: "#474242",}}>
                    {"Password"}
                </Text> */}
                <Lock color="white" size={20} />
                <TextInput placeholderTextColor="white" placeholder="Your Password" value={password} onChangeText={(v) => setPassword(v)} style={loginFormStyles.passwordField} autoCapitalize="none" spellCheck={false} secureTextEntry={hidden} />
                
                <TouchableOpacity  hitSlop={8} onPress={()=>handleHidden()}>
                    {
                        hidden && (
                             <EyeClosed color="white" size={18}  />
                        )
                    }
                    {
                        !hidden && (
                            <Eye color="white" size={18}  />
                        )
                    }
                </TouchableOpacity>
            </View>

            {!!errorMsg && (
                <Text style={{color:'#ff8080', marginVertical:4}}>{errorMsg}</Text>
            )}

            <TouchableOpacity style={loginFormStyles.ButtonForm} onPress={()=>handleLogin()} disabled={loading}>
                <Text style={{color:'white'}}>
                    {loading ? "..." : mode === "signIn" ? "Σύνδεση" : "Εγγραφή"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode(mode === "signIn" ? "signUp" : "signIn")}>
                <Text style={{color:'#aaa', marginTop: 8}}>
                    {mode === "signIn" ? "Δεν έχεις λογαριασμό; Εγγραφή" : "Έχεις λογαριασμό; Σύνδεση"}
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
        backgroundColor:"#1a1818ff",
        rowGap:'2%',
        borderRadius:10
    },
    loginFormTextInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "15%",
        backgroundColor: "rgb(68, 61, 61)",
        borderRadius: 10,
        paddingHorizontal:'5%', 
        marginVertical: '1%',
        
    },
    passwordField: {
        display: "flex",
        flexDirection: "row",
        backgroundColor:"rgb(68, 61, 61)",
        width: "80%",
        borderStyle: 'solid',
        color:"white",
        
        
    },
    userNameForm:{
        backgroundColor:"rgb(68, 61, 61)",
        width: "90%",
        borderStyle: 'solid',
        borderColor: '#474242',
        borderRadius:10,
        color:"white"
        
    },
    ButtonForm:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#8e2436ff',
        width: "90%",
        height:"15%",
        borderStyle: 'solid',
        borderColor:'#8e2436ff',
        borderRadius:10
        
    }
});
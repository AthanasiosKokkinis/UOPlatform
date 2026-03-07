import React from "react";

import {View, Text, StyleSheet,TouchableOpacity} from "react-native";
import {Card} from "../components/Card";
import { useNavigation } from "@react-navigation/native";
interface CardProps {
    title: string;
    content?: string;
}

export const MainScreen=()=>{
    const navigation = useNavigation();
    const testCards: CardProps[] = [
        {title: "Title1", content: "Content1"},
        {title: "Title2"},
        {title: "Title3", content: "Content1"},
        {title: "Title4", content: "Content1"},
    ];
    const  MoveLogin= () =>
    {
      
            navigation.navigate("Home");
        
    }
    return(
        <View>
            { testCards.map((card: CardProps, index: number) => {
                return(<Card key={index} title={card.title} content={card.content}/>);
            }) }
            <TouchableOpacity onPress={MoveLogin}>
                <Text>{"Go to home"}</Text>
            </TouchableOpacity>
        </View>
    );
}
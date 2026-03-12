import React from "react";

import {View, Text, StyleSheet,TouchableOpacity} from "react-native";
import {Card} from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import {Post,PostProps} from "../components/Post";

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
    //I use the interface
    const ExamplePost:PostProps={
        poster:'Name',
        title:'Title',
        tag:'subject',
        time:'30min',
        text:'Bla bla  bla bla bla bla bla bla\nbla bla bla bla bla bla bla bla',
        }

    return(
        <View>
            { testCards.map((card: CardProps, index: number) => {
                return(<Card key={index} title={card.title} content={card.content}/>);
            }) }
            <TouchableOpacity onPress={MoveLogin}>
                <Text>{"Go to home"}</Text>
            </TouchableOpacity>
                        <Post {...ExamplePost}/>
        </View>
    );
}
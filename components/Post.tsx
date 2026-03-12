import {View, Text, StyleSheet} from "react-native";
import React from "react";
//interface
export interface PostProps{
    poster:string,
    title:string,
    tag?:string,
    time:string,
    text:string

}
export const Post = ({poster,title,tag,time,text}:PostProps) => {
    //i added state
    const [likes, setLikes] = React.useState<number>(0);
    const [replies, setReplies] = React.useState<number>(0);
    const [content, setContent] = React.useState<string>(text);
    return(
        <View style={styles.Post}>
            <View style={styles.Header}>
                <Text style={styles.Title}>{title}</Text>
                <Text style={styles.TitleOther}>{'#'+tag}</Text>
                <Text style={styles.TitleOther}>{poster}</Text>
                <Text style={styles.TitleOther}>{time}</Text>
            </View>

            <View>
                <Text style={styles.Content}>{content}</Text>
            </View>

            <View style={styles.Header}>
                <Text style={styles.FooterText}>{likes}</Text>
                <Text style={styles.FooterText}>{replies}</Text>
            </View>
            
        </View>
    )
}
//the style can be improved
const styles = StyleSheet.create({
    Post: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        height: '40%',
        margin: '5%',
        borderRadius: '5%',
        backgroundColor: '#291804ff'
    },
    Header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: '2%'
    },
    Title: {
        fontSize: 20,
        fontWeight: 500,
        margin:10,
        color: 'white',
    },
    TitleOther: {
        fontSize: 10,
        fontWeight: 200,
        margin: '2%',
        color: 'white'
    },
    Content: {
        fontSize: 14,
        justifyContent: 'flex-start',
        margin: '5%',
        color: 'white'
    },
    Footer:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: '2%',
    },
    FooterText:{
        fontSize: 15,
        fontWeight: 500,
        color: 'white',
        margin: '5%',
    }
})
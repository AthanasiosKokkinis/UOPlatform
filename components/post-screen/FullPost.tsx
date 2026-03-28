import { View, ScrollView, Text, StyleSheet ,TouchableOpacity} from "react-native";
import {useState} from "react";

import {Upvote} from "../../assets/svgs/ctas/Upvote";
import {Downvote} from "../../assets/svgs/ctas/Downvote";
import {Comment} from "../../assets/svgs/ctas/Comment";
import {Share} from "../../assets/svgs/ctas/Share";
interface FullPostProps {
    username: string;
    datePosted: string;
    title: string;
    content: {
        text?: string;
        images?: {uri:string}[];
        tags?: string[];
    };
    metas: {
        likes?: number;
        comments?: number;
    }
}

export const FullPost = ({username, datePosted, title, content, metas}:FullPostProps) =>
{

    const [likesCount, setLikesCount] = useState<number>(metas?.likes ?? 0);
    const [previousLikeInteraction, setPreviousLikeInteraction] = useState<"liked"|"disliked"|"neutral">("neutral");
    const [commentCount, setCommentCount] = useState<number>(metas?.comments ?? 0);
    
    const changeLikesCount = (change: -1 | 1) =>
    {
        setLikesCount(likesCount + change);
    }

    return(
    <View style={fullPostStyles.container}>
        <View style={{display: "flex",flexDirection: "row",alignItems:"center",justifyContent: "center",gap:5}}>
            <Text style={fullPostStyles.title}>{title}</Text>
            <View style={fullPostStyles.userMetaContainer}>
                <View style={fullPostStyles.userMetaPostLexicalsContainer}>
                    <Text>{username}</Text>
                    <Text>{datePosted}</Text>
                </View>
        </View>
        </View>
        <View>
            <Text style={fullPostStyles.content}>{content.text}</Text>
        </View>
        <View>
            <Text style={fullPostStyles.tags}>{content?.tags?.join(" ")}</Text>
        </View>
        <View style={fullPostStyles.userCTAsContainer}>
            <View style={fullPostStyles.postLikesContainer}>
                <TouchableOpacity  hitSlop={8} onPress={()=>changeLikesCount(1)}>
                    <Upvote color="black" size={24} />      
                </TouchableOpacity>
                <Text>{likesCount}</Text>
                <TouchableOpacity  hitSlop={8} onPress={()=>changeLikesCount(-1)}>
                    <Downvote color="black" size={24} />      
                </TouchableOpacity>

            </View>

             <TouchableOpacity  hitSlop={8} onPress={()=>changeLikesCount(-1)}>
                <Comment color="black" size={24} />      
            </TouchableOpacity>
            <TouchableOpacity  hitSlop={8} onPress={()=>changeLikesCount(-1)}>
                <Share color="black" size={24} />      
            </TouchableOpacity>
            
        </View>
    </View>);
}

const fullPostStyles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 5,
        backgroundColor:"#331f04ff",
        borderRadius:20
    },
    userMetaContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 2
    },
    userMetaProfileIconContainer: {},
    userMetaPostLexicalsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap:10
    },
    title: {
        color: "white",
        fontSize: 24
    },
    content: {
        color: "white",
        fontSize: 16
    },
    tags: {
        color: "white",
        fontSize: 11
    },
    userCTAsContainer: {
        display: "flex",
        flexDirection: "row",
        gap:20
    },
    postLikesContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 20,
        color: "white",
        gap:5
    },

    
})
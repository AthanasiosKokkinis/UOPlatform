import {View, Text, StyleSheet} from "react-native";

export const Card = ({title, content}: {title: string, content?: string}) => {
    return(
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            {content && (
                <Text style={styles.cardContent}>{content}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b0dbf7'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 500,
        color: '#043454'
    },
    cardContent: {
        fontSize: 14,
        color: '#3b4145'
    }
})
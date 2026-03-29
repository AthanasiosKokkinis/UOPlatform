import { View, Text, StyleSheet, Image } from "react-native";

export interface CommentProps {
  user: {
    username: string;
    avatar: {
      uri: string;
    };
  };
  content: {
    textContent: string;
    image?: {
      uri: string;
    };
  };
  commentMeta: {
    datePosted: string;
    likes: number;
    replies: number;
  };
}

export const Comment = ({ user, content, commentMeta }: CommentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={{ uri: user.avatar.uri }} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.metaText}>{commentMeta.datePosted}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.text}>{content.textContent}</Text>

        {content.image && (
          <Image source={{ uri: content.image.uri }} style={styles.commentImage} />
        )}
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Likes: {commentMeta.likes}</Text>
        <Text style={styles.footerText}>Replies: {commentMeta.replies}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#2a2a2a",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  username: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  metaText: {
    color: "#b0b0b0",
    fontSize: 12,
    marginTop: 2,
  },
  body: {
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  commentImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 10,
  },
  footerRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 10,
  },
  footerText: {
    color: "#b0b0b0",
    fontSize: 12,
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FullPost } from "../components/post-screen/FullPost";
import { Comment } from "../components/post-screen/Comment";
import { Send } from "../assets/svgs/ctas/Send";

interface FullPostProps {
  username: string;
  datePosted: string;
  title: string;
  content: {
    text?: string;
    images?: { uri: string }[];
    tags?: string[];
  };
  metas: {
    likes?: number;
    comments?: number;
  };
}

interface CommentItem {
  id: string;
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

export const PostScreen = () => {
  const [post, setPost] = useState<FullPostProps>({
    username: "Thanos Kokkinis",
    datePosted: "March 21st, 2026",
    title: "My first post",
    content: {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id massa sed est ultricies efficitur. Sed in dui vehicula, tristique ante vel, rutrum est. Sed aliquam elit vel risus hendrerit tincidunt. Phasellus sagittis sapien et sapien varius, vitae semper est faucibus. Cras luctus purus eu pretium vulputate.",
    },
    metas: {
      likes: 10,
      comments: 12,
    },
  });

  const [newComment, setNewComment] = useState("");

  const [comments, setComments] = useState<CommentItem[]>(
    Array.from({ length: 12 }, (_, index) => ({
      id: index.toString(),
      user: {
        username: `User ${index + 1}`,
        avatar: {
          uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        },
      },
      content: {
        textContent: `This is comment number ${index + 1}`,
      },
      commentMeta: {
        datePosted: "March 29th, 2026",
        likes: 0,
        replies: 0,
      },
    }))
  );

  const registerNewComment = () => {
    const trimmedComment = newComment.trim();

    if (!trimmedComment) return;

    const newCommentItem: CommentItem = {
      id: Date.now().toString(),
      user: {
        username: "Thanos Kokkinis",
        avatar: {
          uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        },
      },
      content: {
        textContent: trimmedComment,
      },
      commentMeta: {
        datePosted: "Just now",
        likes: 0,
        replies: 0,
      },
    };

    setComments((prev) => [newCommentItem, ...prev]);

    setPost((prev) => ({
      ...prev,
      metas: {
        ...prev.metas,
        comments: (prev.metas.comments ?? 0) + 1,
      },
    }));

    setNewComment("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Comment
              user={item.user}
              content={item.content}
              commentMeta={item.commentMeta}
            />
          )}
          ListHeaderComponent={
            <View>
              <Text style={styles.screenTitle}>This is the PostScreen</Text>
              <FullPost
                username={post.username}
                datePosted={post.datePosted}
                title={post.title}
                content={post.content}
                metas={post.metas}
              />
            </View>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.stickyInputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={newComment}
              placeholder="Write your comment here"
              placeholderTextColor="#cfcfcf"
              onChangeText={setNewComment}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            onPress={registerNewComment}
            style={styles.sendButton}
          >
            <Send color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 96,
  },
  screenTitle: {
    color: "#fff",
    marginBottom: 12,
  },
  separator: {
    height: 10,
  },
  stickyInputContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1c1c1c",
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#6c1c1c",
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  input: {
    color: "white",
    minHeight: 42,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#6c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },
});
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Post, PostProps } from "../components/Post";

export const MainScreen = () => {
  const navigation = useNavigation();

  const MoveLogin = () => {
    (navigation as any).navigate("Home");
  };

  const createPost = (id: number): PostProps => ({
    poster: `User ${id}`,
    title: `Post Title ${id}`,
    tag: "subject",
    time: `${id} min`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id massa sed est ultricies efficitur. Sed in dui vehicula, tristique ante vel, rutrum est.",
  });

  const [posts, setPosts] = useState<PostProps[]>(
    Array.from({ length: 10 }, (_, i) => createPost(i + 1))
  );

  const loadMore = () => {
    const currentLength = posts.length;

    const newPosts = Array.from({ length: 10 }, (_, i) =>
      createPost(currentLength + i + 1)
    );

    setPosts((prev) => [...prev, ...newPosts]);
  };

  const getExcerpt = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={posts}
      keyExtractor={(_, index) => index.toString()}
      
      renderItem={({ item }) => (
        <Post
          {...item}
          text={getExcerpt(item.text)}
        />
      )}

      ListHeaderComponent={
        <TouchableOpacity onPress={MoveLogin} style={styles.headerBtn}>
          <Text style={styles.headerText}>Go to home</Text>
        </TouchableOpacity>
      }

      onEndReached={loadMore}
      onEndReachedThreshold={0.5}

      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  contentContainer: {
    padding: 16,
    gap: 12,
  },
  headerBtn: {
    marginBottom: 10,
  },
  headerText: {
    color: "white",
  },
});
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Post, PostProps } from "../components/Post";
import SortBar from "../components/main-screen/SortBar"
import PostCard from "../components/PostCard"
import {COLORS} from "../components/colors";
import {Footer} from "../components/footer/Footer"
export const MainScreen = () => {
  const navigation = useNavigation();

  const MoveLogin = () => {
    (navigation as any).navigate("About");
  };

  const posts = [
      {
        channel: 'εξεταστική',
        author: 'Μαρία Κ.',
        authorYear: '22',
        timeAgo: '2ω',
        title: 'Ξέρει κανείς πότε βγαίνουν τα αποτελέσματα Σήματα & Συστήματα;',
        body: 'Γράψαμε πριν 10 μέρες και ακόμα τίποτα στο eclass. Κάποιος που πέρασε πέρυσι θυμάται πόσο καιρό πήρε;',
        votes: 42,
        comments: 18,
        tags: ['ΗΜΤΥ', 'Εξεταστική'],
      },
      {
        channel: 'campus-life',
        author: 'Δημήτρης Π.',
        authorYear: '21',
        timeAgo: '4ω',
        title:
          'Η καφετέρια στο κτίριο Β κάνει τον καλύτερο freddo στην Πάτρα, change my mind',
        imageUrl:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=300&fit=crop',
        votes: 156,
        comments: 67,
        tags: ['Φαγητό', 'Campus'],
      },
      {
        channel: 'σημειώσεις',
        author: 'Ελένη Σ.',
        authorYear: '23',
        timeAgo: '6ω',
        title:
          'Σημειώσεις Αλγόριθμοι & Πολυπλοκότητα — ολόκληρη η ύλη σε 40 σελίδες',
        body: 'Τις ετοίμασα για την εξεταστική. Αν θέλει κάποιος ας στείλει DM. Καλύπτουν Dijkstra, dynamic programming, NP-completeness κτλ.',
        votes: 312,
        comments: 89,
        tags: ['CEID', 'Σημειώσεις', 'Sharing'],
      },
      {
        channel: 'events',
        author: 'ESN Patras',
        timeAgo: '1μ',
        title: '🎉 Erasmus Welcome Party — Παρασκευή 8/3 στο Beau Rivage',
        imageUrl:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=300&fit=crop',
        votes: 89,
        comments: 34,
        tags: ['Event', 'Erasmus', 'Party'],
      },
      {
        channel: 'στέγαση',
        author: 'Κώστας Μ.',
        authorYear: '24',
        timeAgo: '3ω',
        title: 'Ψάχνω συγκάτοικο κοντά στο Πανεπιστήμιο — 180€/μήνα με έξοδα',
        body: 'Διαμέρισμα στο Ρίο, 2 δωμάτια, 10 λεπτά με ποδήλατο από το campus. Διαθέσιμο από Μάρτιο.',
        votes: 28,
        comments: 15,
        tags: ['Στέγαση', 'Ρίο'],
      },
      {
        channel: 'memes',
        author: 'MemeLordUP',
        timeAgo: '5ω',
        title:
          "Όταν ο καθηγητής λέει 'η ύλη είναι εύκολη' και μετά βλέπεις το θέμα",
        votes: 834,
        comments: 203,
        tags: ['Meme', 'Relatable'],
      },
    ];

  // const [posts, setPosts] = useState<PostProps[]>(
  //   Array.from({ length: 10 }, (_, i) => createPost(i + 1))
  // );

//   const loadMore = () => {
//     const currentLength = posts.length;

//     const newPosts = Array.from({ length: 10 }, (_, i) =>
//       createPost(currentLength + i + 1)
//     );

//     setPosts((prev) => [...prev, ...newPosts]);
//   };

  // const getExcerpt = (text: string, maxLength = 100) => {
  //   if (text.length <= maxLength) return text;
  //   return text.slice(0, maxLength) + "...";
  // };

  return (
    <View style={{ backgroundColor: COLORS.background, width: "100%", height:"100%" }}>
      <SortBar />
      <ScrollView>
{posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </ScrollView>
      
      {/* <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        
        renderItem={({ item, i }) => (
          // <Post
          //   {...item}
          //   text={getExcerpt(item.text)}
          // />
          <PostCard key={i} {...item} />
        )}

        ListHeaderComponent={
          <TouchableOpacity onPress={MoveLogin} style={styles.headerBtn}>
            <Text style={styles.headerText}>Go to home</Text>
          </TouchableOpacity>
        }
        ListFooterComponent={
          <View><Text>{"Footer"}</Text></View>
          
        }

        // onEndReached={loadMore}
        // onEndReachedThreshold={0.5}

        showsVerticalScrollIndicator={false}
      /> */}
      <Footer/>
    </View>
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
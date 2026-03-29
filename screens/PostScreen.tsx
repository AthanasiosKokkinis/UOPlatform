import React, { use } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { FullPost } from "../components/post-screen/FullPost";
import {Comment} from "../components/post-screen/Comment";

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

export const PostScreen = () => {

    const dummyPost: FullPostProps = {
        username: "Thanos Kokkinis",
        datePosted: "March 21st, 2026",
        title: "My first post", 
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id massa sed est ultricies efficitur. Sed in dui vehicula, tristique ante vel, rutrum est. Sed aliquam elit vel risus hendrerit tincidunt. Phasellus sagittis sapien et sapien varius, vitae semper est faucibus. Cras luctus purus eu pretium vulputate. Etiam interdum tortor nec diam placerat pellentesque. Mauris volutpat imperdiet felis. Suspendisse vitae justo leo. Donec at massa sollicitudin, molestie lectus in, ultrices ligula. Nullam iaculis massa sed ornare tempus. Sed imperdiet ex nec dignissim interdum. Donec semper bibendum consectetur. Maecenas non pretium felis. Morbi metus eros, placerat sit amet mauris sit amet, varius tincidunt nulla. Nulla nunc dui, tempor in ullamcorper at, congue a dui. Donec pulvinar pharetra augue eu placerat. Curabitur purus arcu, mattis eu elit quis, lobortis varius lorem. Aliquam egestas mi et luctus pharetra. Vestibulum lorem tellus, ullamcorper eu felis cursus, imperdiet condimentum tortor. Morbi eu diam lacus. Aliquam erat volutpat. Nunc eget metus eu metus tempor tempor ac vel orci. Curabitur malesuada mi vel massa maximus, non dictum sem blandit. Nunc euismod lobortis ipsum, id condimentum libero ornare vitae. Suspendisse convallis turpis nec mauris ultricies, id pretium nibh tristique. Maecenas blandit diam et mauris mollis efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget mollis dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus sodales arcu accumsan hendrerit condimentum. Pellentesque a sollicitudin neque. In congue risus ac lectus ullamcorper, sed euismod quam sollicitudin. Sed ipsum velit, varius sit amet dui non, malesuada rhoncus nibh. Sed sit amet tempus nulla. Nunc in magna ac massa posuere tristique ac id velit. Nam ultrices tincidunt arcu venenatis placerat. Quisque a odio quam. Nam id magna semper, porta arcu in, blandit mauris. Nullam gravida lectus vel urna finibus commodo. Etiam efficitur dapibus placerat. Nulla non felis sit amet lectus imperdiet convallis quis vitae felis. In iaculis porta ipsum ac euismod. Nunc quis augue tristique felis iaculis lacinia vitae sed augue. Suspendisse fringilla facilisis diam vel malesuada. Etiam quis ex odio. In vel felis vehicula, ullamcorper dui feugiat, malesuada magna. Etiam vitae scelerisque urna. Aliquam et leo nisi. In in diam tristique, vestibulum turpis a, sodales nisi. Fusce gravida cursus enim sed consequat. Aenean sit amet erat sollicitudin, pellentesque libero nec, viverra dui. Duis vel pharetra nisi. Mauris eu quam a purus maximus faucibus et id diam. Morbi luctus libero nec gravida maximus. Integer non tristique sem. Ut rhoncus ornare nibh id pellentesque. Ut vulputate et lacus laoreet sollicitudin. Nunc in massa sed ligula dapibus euismod. In at elit et elit imperdiet tincidunt. Morbi sed iaculis arcu. Phasellus sapien justo, finibus et auctor sed, auctor ac ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere elit id quam suscipit, eu porta magna maximus. Ut aliquam consequat risus, posuere sodales lorem imperdiet pellentesque. Aliquam luctus velit efficitur, aliquet nisi a, fermentum libero."
        },
        metas: {
            likes: 10,
            comments: 1
        }
    } 

    const navigation = useNavigation();


    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Pressable onPress={() => navigation.navigate('Profile' as never)}>
          <Text>Go to profile</Text>
        </Pressable>
        <Text>This is the PostScreen</Text>
        <FullPost
          username={dummyPost.username}
          datePosted={dummyPost.datePosted}
          title={dummyPost.title}
          content={dummyPost.content}
          metas={dummyPost.metas}
        />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a2a27',
  },
  contentContainer: {
    flexDirection: 'column',
    padding: 16,
  },
});
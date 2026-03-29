import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";

import { Upvote } from "../../assets/svgs/ctas/Upvote";
import { Downvote } from "../../assets/svgs/ctas/Downvote";
import { ChatBubble } from "../../assets/svgs/ctas/ChatBubble";
import { Share } from "../../assets/svgs/ctas/Share";
import { Bookmark } from "../../assets/svgs/ctas/Bookmark";

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

export const Tag = ({
  lexical,
  color,
}: {
  lexical: string;
  color: string;
}) => {
  return (
    <View style={{ borderRadius: 10, paddingHorizontal: 3, backgroundColor: color }}>
      <Text style={{ color: "white", textAlign: "center" }}>{lexical}</Text>
    </View>
  );
};

export const LikeSection = ({
  likesCount,
  setLikesCount,
  previousLikeInteraction,
  setPreviousLikeInteraction,
}: {
  likesCount: number;
  setLikesCount: (a: number) => void;
  previousLikeInteraction: "liked" | "disliked" | "neutral";
  setPreviousLikeInteraction: (b: "liked" | "disliked" | "neutral") => void;
}) => {
  const handleUpvote = () => {
    if (previousLikeInteraction === "neutral") {
      setLikesCount(likesCount + 1);
      setPreviousLikeInteraction("liked");
    } else if (previousLikeInteraction === "liked") {
      setLikesCount(likesCount - 1);
      setPreviousLikeInteraction("neutral");
    } else if (previousLikeInteraction === "disliked") {
      setLikesCount(likesCount + 2);
      setPreviousLikeInteraction("liked");
    }
  };

  const handleDownvote = () => {
    if (previousLikeInteraction === "neutral") {
      setLikesCount(likesCount - 1);
      setPreviousLikeInteraction("disliked");
    } else if (previousLikeInteraction === "disliked") {
      setLikesCount(likesCount + 1);
      setPreviousLikeInteraction("neutral");
    } else if (previousLikeInteraction === "liked") {
      setLikesCount(likesCount - 2);
      setPreviousLikeInteraction("disliked");
    }
  };

  return (
    <View style={fullPostStyles.pillButton}>
      <TouchableOpacity onPress={handleUpvote} hitSlop={8}>
        <Upvote color={previousLikeInteraction === "liked" ? "yellow" : "white"} />
      </TouchableOpacity>

      <Text style={fullPostStyles.pillText}>{likesCount}</Text>

      <TouchableOpacity onPress={handleDownvote} hitSlop={8}>
        <Downvote color={previousLikeInteraction === "disliked" ? "yellow" : "white"} />
      </TouchableOpacity>
    </View>
  );
};

export const CommentSection = ({ commentCount }: { commentCount: number }) => {
  return (
    <TouchableOpacity style={fullPostStyles.pillButton}>
      <ChatBubble color="white" />
      <Text style={fullPostStyles.pillText}>{commentCount}</Text>
    </TouchableOpacity>
  );
};

export const ShareSection = () => {
  return (
    <TouchableOpacity style={fullPostStyles.pillButton}>
      <Share color="white" />
    </TouchableOpacity>
  );
};

export const BookmarkButton = () => {
  return (
    <TouchableOpacity
      style={[fullPostStyles.pillButton, { marginLeft: "auto" }]}
    >
      <Bookmark color="white" />
    </TouchableOpacity>
  );
};

export const FullPost = ({
  username,
  datePosted,
  title,
  content,
  metas,
}: FullPostProps) => {
  const [likesCount, setLikesCount] = useState<number>(metas?.likes ?? 0);
  const [previousLikeInteraction, setPreviousLikeInteraction] = useState<
    "liked" | "disliked" | "neutral"
  >("neutral");
  const [commentCount] = useState<number>(metas?.comments ?? 0);

  return (
    <View style={fullPostStyles.container}>
      <View style={fullPostStyles.userMetaContainer}>
        <View style={fullPostStyles.userMetaPostLexicalsContainer}>
          <Text style={fullPostStyles.metaText}>{username}</Text>
          <Text style={fullPostStyles.metaText}>{datePosted}</Text>
        </View>
      </View>

      <View>
        <Text style={fullPostStyles.title}>{title}</Text>
      </View>

      <View>
        <Text style={fullPostStyles.content}>{content.text}</Text>
      </View>

      <View style={fullPostStyles.tagsRow}>
        {content?.tags?.map((tag, index) => {
          return <Tag lexical={tag} color="orange" key={index} />;
        })}
      </View>

      <View style={fullPostStyles.userCTAsContainer}>
        <LikeSection
          likesCount={likesCount}
          setLikesCount={setLikesCount}
          previousLikeInteraction={previousLikeInteraction}
          setPreviousLikeInteraction={setPreviousLikeInteraction}
        />
        <CommentSection commentCount={commentCount} />
        <ShareSection />
        <BookmarkButton />
      </View>
    </View>
  );
};

const fullPostStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 8,
  },
  userMetaContainer: {
    flexDirection: "row",
    columnGap: 2,
  },
  userMetaProfileIconContainer: {},
  userMetaPostLexicalsContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  metaText: {
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  content: {
    color: "white",
    fontSize: 16,
  },
  tags: {
    color: "white",
    fontSize: 11,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
  },
  userCTAsContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 6,
  },
  postLikesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgb(57, 45, 47)",
    gap: 8,
  },
  pillText: {
    color: "white",
    fontSize: 14,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './colors';

const VOTE_UP = '#22c55e';
const VOTE_DOWN = '#ef4444';

interface PostCardProps {
  channel: string;
  author: string;
  authorYear?: string;
  timeAgo: string;
  title: string;
  body?: string;
  imageUrl?: string;
  votes: number;
  comments: number;
  tags?: string[];
}

const PostCard = ({
  channel,
  author,
  authorYear,
  timeAgo,
  title,
  body,
  imageUrl,
  votes,
  comments,
  tags,
}: PostCardProps) => {
  const navigation = useNavigation();
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [currentVotes, setCurrentVotes] = useState(votes);

  const handleVote = (dir: 'up' | 'down') => {
    if (voteState === dir) {
      setVoteState(null);
      setCurrentVotes(votes);
    } else {
      setVoteState(dir);
      setCurrentVotes(dir === 'up' ? votes + 1 : votes - 1);
    }
  };

  const formatVotes = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.channelBadge}>
            <Text style={styles.channelBadgeText}>
              #{channel.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.channelName}>#{channel}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{author}</Text>
            {authorYear && (
              <Text style={styles.authorYear}>'{authorYear}</Text>
            )}
            <Text style={styles.metaText}>· {timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.metaText}>···</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Post' as never)}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        {body && (
          <Text style={styles.body} numberOfLines={3}>
            {body}
          </Text>
        )}
      </TouchableOpacity>

      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      {tags && tags.length > 0 && (
        <View style={styles.tagsRow}>
          {tags.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <View style={styles.voteContainer}>
          <TouchableOpacity
            onPress={() => handleVote('up')}
            style={styles.voteBtn}
          >
            <Text
              style={[
                styles.voteArrow,
                voteState === 'up' && { color: VOTE_UP },
              ]}
            >
              ▲
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.voteCount,
              voteState === 'up'
                ? { color: VOTE_UP }
                : voteState === 'down'
                ? { color: VOTE_DOWN }
                : { color: COLORS.foreground },
            ]}
          >
            {formatVotes(currentVotes)}
          </Text>
          <TouchableOpacity
            onPress={() => handleVote('down')}
            style={styles.voteBtn}
          >
            <Text
              style={[
                styles.voteArrow,
                voteState === 'down' && { color: VOTE_DOWN },
              ]}
            >
              ▼
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionIcon}>○</Text>
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionIcon}>⤴</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookmarkBtn}>
          <Text style={styles.actionIcon}>⊡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  channelBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(158, 46, 65, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelBadgeText: {
    color: COLORS.active,
    fontSize: 10,
    fontWeight: '700',
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  channelName: {
    color: COLORS.foreground,
    fontSize: 12,
    fontWeight: '600',
  },
  metaDot: {
    color: COLORS.mutedForeground,
    fontSize: 12,
  },
  metaText: {
    color: COLORS.mutedForeground,
    fontSize: 12,
  },
  authorYear: {
    color: COLORS.active,
    fontSize: 10,
    fontWeight: '500',
  },
  title: {
    color: COLORS.foreground,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4,
  },
  body: {
    color: COLORS.mutedForeground,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: COLORS.secondary,
  },
  image: {
    width: '100%',
    height: 192,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: 'rgba(158, 46, 65, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  tagText: {
    color: COLORS.active,
    fontSize: 11,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 999,
  },
  voteBtn: {
    padding: 6,
  },
  voteArrow: {
    color: COLORS.mutedForeground,
    fontSize: 14,
  },
  voteCount: {
    fontSize: 12,
    fontWeight: '700',
    minWidth: 28,
    textAlign: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.secondary,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionIcon: {
    color: COLORS.mutedForeground,
    fontSize: 14,
  },
  actionText: {
    color: COLORS.mutedForeground,
    fontSize: 12,
    fontWeight: '500',
  },
  bookmarkBtn: {
    marginLeft: 'auto',
  },
});

export default PostCard;

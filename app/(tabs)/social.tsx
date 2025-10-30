import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Post = {
  id: string;
  user: string;
  avatar: string;
  content: string;
  liked?: boolean;
};

const INITIAL_POSTS: Post[] = [
  { id: 'p1', user: '민수', avatar: 'https://i.pravatar.cc/150?img=12', content: '요즘 읽은 책 중에서 추천할 만한 건 뭐예요?', liked: false },
  { id: 'p2', user: '지혜', avatar: 'https://i.pravatar.cc/150?img=24', content: '최근에 "The Midnight Library" 읽었는데 정말 좋았어요.', liked: true },
  { id: 'p3', user: '준호', avatar: 'https://i.pravatar.cc/150?img=36', content: '비즈니스 책 추천 부탁드립니다.', liked: false },
  { id: 'p4', user: '수연', avatar: 'https://i.pravatar.cc/150?img=48', content: '어린이책 큐레이션 했어요, 피드백 환영합니다.', liked: false },
  { id: 'p5', user: '미나', avatar: 'https://i.pravatar.cc/150?img=55', content: '시가 가끔 위로가 되네요.', liked: false },
];

export default function SocialScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenW = Dimensions.get('window').width;
  const [posts, setPosts] = React.useState<Post[]>(INITIAL_POSTS);

  function toggleLike(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  }

  function renderItem({ item }: { item: Post }) {
    return (
      <View style={[styles.card, { backgroundColor: colors.card, width: screenW - 32 }]}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.contentWrap}>
          <Text style={[styles.user, { color: colors.cardText }]}>{item.user}</Text>
          <Text style={[styles.content, { color: colors.cardText }]}>{item.content}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => toggleLike(item.id)}
          style={[
            styles.actionBtn,
            item.liked
              ? { backgroundColor: colors.cardText, borderColor: colors.cardText }
              : { backgroundColor: 'transparent', borderColor: colors.cardText },
          ]}>
          <Text style={[styles.actionText, item.liked ? { color: '#fff' } : { color: colors.cardText }]}>좋아요</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>소셜 피드</Text>

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56 },
  header: { fontSize: 20, fontWeight: '700', paddingHorizontal: 16, marginBottom: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12, marginTop: 4 },
  contentWrap: { flex: 1 },
  user: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  content: { fontSize: 13, lineHeight: 18 },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: { fontWeight: '700' },
});
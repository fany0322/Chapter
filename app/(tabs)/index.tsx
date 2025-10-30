import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import React, { useState } from 'react'
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const RECOMMENDED = [
  { id: '1', title: '데미안', author: '헤르만 헤세', image: 'https://picsum.photos/200/300?random=1' },
  { id: '2', title: '인간 실격', author: '다자이 오사무', image: 'https://picsum.photos/200/300?random=2' },
  { id: '3', title: '젊은 베르테르', author: '괴테', image: 'https://picsum.photos/200/300?random=3' },
  { id: '4', title: '죄와 벌', author: '도스토예프스키', image: 'https://picsum.photos/200/300?random=4' },
  { id: '5', title: '달과 6펜스', author: '서머싯 몸', image: 'https://picsum.photos/200/300?random=5' },
]

const GOALS = [
  { id: '1', title: '변신 26~45p', author: '카프카' },
  { id: '2', title: '데미안 10~30p', author: '헤르만 헤세' },
  { id: '3', title: '죄와 벌 20~35p', author: '도스토예프스키' },
  { id: '4', title: '달과 6펜스 50~70p', author: '서머싯 몸' },
  { id: '5', title: '노인과 바다 10~20p', author: '헤밍웨이' },
  { id: '6', title: '위대한 개츠비 15~30p', author: '피츠제럴드' },
]

export default function ChapterScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const [calendarVisible, setCalendarVisible] = useState(false)
  const [bookModalVisible, setBookModalVisible] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)

  const openBookModal = (book: any) => {
    setSelectedBook(book)
    setBookModalVisible(true)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={[styles.title, { color: colors.text }]}>Chapter</Text>

        {/* 오늘의 추천 도서 */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>오늘의 추천 도서</Text>
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.bookListContainer, { paddingHorizontal: 20 }]}
        >
          {RECOMMENDED.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => openBookModal(item)}>
              <View style={styles.bookCard}>
                <View style={[styles.bookImageWrap, { backgroundColor: colors.card }]}>
                  <Image source={{ uri: item.image }} style={styles.bookImage} />
                </View>
                <View style={[styles.titleWrap, { backgroundColor: colors.card }]}>
                  <Text numberOfLines={2} style={[styles.bookTitle, { color: colors.cardText }]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 일일 연속 섹션 */}
        <TouchableOpacity
          onPress={() => setCalendarVisible(true)}
          activeOpacity={0.8}
          style={[styles.streakContainer, { backgroundColor: colors.tint }]}
        >
          <Text style={[styles.streakText, { color: colors.background }]}>일일 연속</Text>
          <Text style={[styles.streakCount, { color: colors.background }]}>7회 🔥</Text>
        </TouchableOpacity>

        {/* 여백 */}
        <View style={{ height: 20 }} />

        {/* 오늘의 목표 */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>오늘의 목표</Text>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.goalScrollArea}
        >
          {GOALS.map((goal) => (
            <View key={goal.id} style={[styles.goalCard, { backgroundColor: colors.tint }]}>
              <View style={[styles.goalImage, { backgroundColor: colors.card }]}>
                <Text style={[styles.goalImageText, { color: colors.cardText }]}>책이미지</Text>
              </View>
              <View>
                <Text style={[styles.goalTitle, { color: colors.cardText }]}>{goal.title}</Text>
                <Text style={[styles.goalAuthor, { color: colors.cardText }]}>{goal.author}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* 📅 달력 모달 */}
      <Modal visible={calendarVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>📅 연속 달성 기록</Text>
            <Text style={[styles.modalText, { color: colors.text }]}>시작일: 10월 24일</Text>
            <Text style={[styles.modalText, { color: colors.text }]}>끊긴 날짜: 10월 28일</Text>
            <Text style={[styles.modalText, { color: colors.text }]}>총 7일 연속 달성 🔥</Text>

            <Pressable
              style={[styles.closeButton, { backgroundColor: colors.tint }]}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={{ color: colors.background }}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* 📚 책 정보 모달 */}
      <Modal visible={bookModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
            {selectedBook && (
              <>
                <Image source={{ uri: selectedBook.image }} style={styles.modalBookImage} />
                <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedBook.title}</Text>
                <Text style={[styles.modalText, { color: colors.text }]}>
                  작가: {selectedBook.author}
                </Text>

                <View style={styles.modalButtonRow}>
                  <Pressable style={[styles.modalButton, { backgroundColor: colors.tint }]}>
                    <Text style={{ color: colors.background }}>도전하기</Text>
                  </Pressable>
                  <Pressable style={[styles.modalButton, { backgroundColor: colors.tint }]}>
                    <Text style={{ color: colors.background }}>저장</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={[styles.closeButton, { backgroundColor: colors.tint }]}
                  onPress={() => setBookModalVisible(false)}
                >
                  <Text style={{ color: colors.background }}>닫기</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28, fontWeight: '700', marginTop: 12, marginHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
  bookListContainer: { alignItems: 'center' },
  bookCard: { width: 120, marginRight: 16, alignItems: 'center' },
  bookImageWrap: { width: 120, height: 160, borderRadius: 8, marginBottom: 6, overflow: 'hidden' },
  bookImage: { width: '100%', height: '100%' },
  titleWrap: { width: '100%', borderRadius: 6, paddingVertical: 6, alignItems: 'center' },
  bookTitle: { fontSize: 13, textAlign: 'center' },
  streakContainer: { marginTop: 30, marginHorizontal: 20, borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  streakText: { fontSize: 16, fontWeight: '600' },
  streakCount: { fontSize: 26, fontWeight: '800', marginTop: 4 },
  goalScrollArea: { maxHeight: 350, marginHorizontal: 20, marginTop: 8 },
  goalCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 14, borderRadius: 16 },
  goalImage: { width: 50, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  goalImageText: { fontSize: 12 },
  goalTitle: { fontWeight: '700', fontSize: 15 },
  goalAuthor: { fontSize: 13 },
  bottomSpacer: { height: 80 },

  /** 모달 디자인 */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  modalText: { fontSize: 15, marginBottom: 6 },
  modalBookImage: { width: 140, height: 200, borderRadius: 8, marginBottom: 12 },
  modalButtonRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  modalButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  closeButton: { marginTop: 16, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 10 },
})

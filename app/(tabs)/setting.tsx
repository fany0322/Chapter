import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri ?? (result as any).uri;
      if (uri) setImageUri(uri);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Setting</Text>

      <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarWrap}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: colors.tint }]}>
            <Text style={styles.placeholderText}>사진 추가</Text>
          </View>
        )}
        <View style={[styles.avatarShadow, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { borderColor: colors.tint }]} onPress={pickImage}>
        <Text style={[styles.buttonText, { color: colors.tint }]}>사진 변경</Text>
      </TouchableOpacity>

      <Text style={[styles.note, { color: colors.secondaryText }]}>
        원하는 이미지를 선택하세요. 정사각형으로 자동 크롭됩니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 56, paddingHorizontal: 24 }, // 아래로 내림 적용
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
  avatarWrap: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#fff',
    resizeMode: 'cover',
    zIndex: 2,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  placeholderText: { color: '#fff', fontWeight: '700' },
  avatarShadow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
  note: { marginTop: 12, fontSize: 13, textAlign: 'center', maxWidth: 320 },
});
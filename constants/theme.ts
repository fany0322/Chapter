/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    background: '#121212', // 전체 배경
    text: '#FFFFFF',       // 기본 텍스트(어두운 배경 위 흰색)
    tint: '#FFFFFF',       // 기존 파란색을 흰색으로 변경(버튼/액센트)
    card: '#FFFFFF',       // 카드/컨테이너 배경은 흰색
    cardText: '#121212',   // 카드(흰색) 내부 텍스트는 어두운 색
    border: '#1e1e1e',
    secondaryText: '#cfcfcf',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    tint: '#FFFFFF',
    card: '#FFFFFF',
    cardText: '#121212',
    border: '#1e1e1e',
    secondaryText: '#cfcfcf',
  },
};
export default Colors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

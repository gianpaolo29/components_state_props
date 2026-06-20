import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const DIGIT_H = 96;
const DIGIT_W = 70;
const FONT_SIZE = 54;
const FADE_H = 22;
const BOX_BG = '#05050E';

function Reel({ digit, color }: { digit: string; color: string }) {
  const translateY = useRef(new Animated.Value(-parseInt(digit) * DIGIT_H)).current;
  const prev = useRef(digit);

  useEffect(() => {
    if (digit === prev.current) return;
    prev.current = digit;
    Animated.spring(translateY, {
      toValue: -parseInt(digit) * DIGIT_H,
      useNativeDriver: true,
      speed: 14,
      bounciness: 5,
    }).start();
  }, [digit]);

  return (
    <View style={styles.reelBox}>
      {/* glass shine on top edge */}
      <View style={styles.topShine} />

      {/* clipping window — only one digit tall */}
      <View style={styles.reelWindow}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {Array.from({ length: 10 }, (_, n) => (
            <View key={n} style={styles.cell}>
              <Text style={[styles.digit, { color }]}>{n}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      {/* slot shadow fades — suggest digit is inside a deep slot */}
      <View style={styles.fadeTop} pointerEvents="none" />
      <View style={styles.fadeBottom} pointerEvents="none" />
    </View>
  );
}

export default function SlotCounter({ count, color }: { count: number; color: string }) {
  const abs = String(Math.abs(count));
  const chars = abs.split('');

  return (
    <View style={styles.row}>
      {count < 0 && (
        <View style={[styles.reelBox, styles.signBox]}>
          <View style={styles.topShine} />
          <View style={styles.cell}>
            <Text style={[styles.digit, { color }]}>−</Text>
          </View>
        </View>
      )}
      {chars.map((d, i) => (
        <Reel key={`reel-${chars.length - i}`} digit={d} color={color} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },

  /* ── reel box ── */
  reelBox: {
    backgroundColor: BOX_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    overflow: 'hidden',
    // depth shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 10,
  },
  signBox: {
    width: DIGIT_W,
    height: DIGIT_H,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ── glass highlight on top edge ── */
  topShine: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    zIndex: 3,
  },

  /* ── clipping window ── */
  reelWindow: {
    width: DIGIT_W,
    height: DIGIT_H,
    overflow: 'hidden',
  },
  cell: {
    width: DIGIT_W,
    height: DIGIT_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digit: {
    fontSize: FONT_SIZE,
    fontWeight: '800',
    textAlign: 'center',
  },

  /* ── slot shadow fades ── */
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: FADE_H,
    backgroundColor: `rgba(5, 5, 14, 0.70)`,
    zIndex: 2,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FADE_H,
    backgroundColor: `rgba(5, 5, 14, 0.70)`,
    zIndex: 2,
  },
});

import { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  flex?: boolean;
};

export default function CounterButton({ label, color, onPress, flex }: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isLongPressing = useRef(false);
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.spring(scale, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 60,
      bounciness: 0,
    }).start();
  };

  const animateRelease = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const startLongPress = () => {
    isLongPressing.current = true;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
    intervalRef.current = setInterval(() => {
      onPress();
    }, 80);
  };

  const stopLongPress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    animateRelease();
  };

  const handlePress = () => {
    if (isLongPressing.current) {
      isLongPressing.current = false;
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      style={flex ? { flex: 1 } : undefined}
      onPress={handlePress}
      onLongPress={startLongPress}
      onPressIn={animatePress}
      onPressOut={stopLongPress}
      delayLongPress={300}
    >
      <Animated.View
        style={[styles.btn, { backgroundColor: color }, { transform: [{ scale }] }]}
      >
        <Text style={styles.btnText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

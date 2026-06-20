import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CounterDisplay from '@/components/CounterDisplay';

export default function HomeScreen() {
  const [count, setCount] = useState(100);

  const countColor = count > 0 ? '#34D399' : count < 0 ? '#F87171' : '#F1F5F9';
  const accentBorderColor = count > 0 ? '#34D399' : count < 0 ? '#F87171' : '#334155';

  return (
    <ScrollView contentContainerStyle={styles.screen}>

      <View style={styles.header}>
        <Text style={styles.eyebrow}>REACT NATIVE</Text>
        <Text style={styles.heading}>Counter</Text>
        <Text style={styles.subheading}>Parent · index.tsx</Text>
      </View>

      <View style={[styles.stateBox, { borderLeftColor: accentBorderColor }]}>
        <Text style={styles.stateLabel}>LIVE STATE</Text>
        <Text style={[styles.stateValue, { color: countColor }]}>{count}</Text>
      </View>

      <CounterDisplay
        count={count}
        onAdd={() => setCount(prev => prev + 1)}
        onMinus={() => setCount(prev => prev - 1)}
        onReset={() => setCount(100)}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: '#060610',
    padding: 24,
    paddingTop: 72,
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6D28D9',
    letterSpacing: 3,
    marginBottom: 8,
  },
  heading: {
    fontSize: 44,
    fontWeight: '800',
    color: '#F1F5F9',
    letterSpacing: -1.5,
  },
  subheading: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginTop: 6,
    letterSpacing: 0.3,
  },
  stateBox: {
    backgroundColor: '#0C0C18',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  stateLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 2.5,
    marginBottom: 8,
  },
  stateValue: {
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -2,
  },
});

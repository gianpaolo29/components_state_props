import { View, Text, StyleSheet } from 'react-native';
import CounterButton from '@/components/CounterButton';
import SlotCounter from '@/components/SlotCounter';

type Props = {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
};

export default function CounterDisplay({ count, onAdd, onMinus, onReset }: Props) {
  const countColor = count > 0 ? '#34D399' : count < 0 ? '#F87171' : '#F1F5F9';

  return (
    <View style={styles.card}>
      <View style={styles.topHighlight} />

      <Text style={styles.cardLabel}>Child · CounterDisplay</Text>

      <SlotCounter count={count} color={countColor} />

      <View style={styles.divider} />

      <View style={styles.btnRow}>
        <CounterButton label="+" color="#6D28D9" onPress={onAdd} flex />
        <CounterButton label="−" color="#9D174D" onPress={onMinus} flex />
      </View>

      <CounterButton label="Reset" color="#1E293B" onPress={onReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0C0C18',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    gap: 16,
    overflow: 'hidden',
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 32,
    right: 32,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 2.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
});

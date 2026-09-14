import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Plus, X, Trash2 } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { addExpense, deleteExpense } from '../../store/budgetSlice';
import { ProgressBar } from '../common/ProgressBar';
import { GradientButton } from '../common/GradientButton';
import { colors, theme } from '../../theme/colors';

type ExpenseCategory = 'Flights' | 'Accommodation' | 'Food & Drink' | 'Transport' | 'Activities' | 'Other';

export const BudgetTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalBudget, currency, expenses } = useAppSelector((state) => state.budget);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseCategory>('Food & Drink');

  // Compute category totals
  const categoryConfig: { name: ExpenseCategory; color: string }[] = [
    { name: 'Flights', color: '#00E5FF' },
    { name: 'Accommodation', color: '#00D2B4' },
    { name: 'Food & Drink', color: '#8B5CF6' },
    { name: 'Transport', color: '#FF3B69' },
  ];

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const percentageUsed = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const handleAddExpense = () => {
    const amountNum = parseFloat(newAmount);
    if (newTitle.trim() && !isNaN(amountNum) && amountNum > 0) {
      dispatch(
        addExpense({
          title: newTitle.trim(),
          category: newCategory,
          amount: amountNum,
        })
      );
      setNewTitle('');
      setNewAmount('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top 2 Metric Cards */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>BUDGET</Text>
          <Text style={styles.metricValue}>
            {currency}{totalBudget.toLocaleString()}
          </Text>
          <Text style={styles.metricSub}>total</Text>
        </View>

        <View style={[styles.metricCard, styles.spentCard]}>
          <Text style={styles.metricLabel}>SPENT</Text>
          <Text style={[styles.metricValue, styles.spentValue]}>
            {currency}{totalSpent.toLocaleString()}
          </Text>
          <Text style={[styles.metricSub, styles.spentSub]}>
            {percentageUsed}% used
          </Text>
        </View>
      </View>

      {/* Main Total Spending Progress Bar */}
      <View style={styles.progressSection}>
        <ProgressBar progress={totalSpent / totalBudget} height={8} />
      </View>

      {/* Category Breakdown Rows */}
      <View style={styles.breakdownList}>
        {categoryConfig.map((cat) => {
          const catExpenses = expenses.filter((e) => e.category === cat.name);
          const catAmount = catExpenses.reduce((sum, e) => sum + e.amount, 0);
          const catProgress = totalBudget > 0 ? catAmount / totalBudget : 0;

          return (
            <View key={cat.name} style={styles.categoryRow}>
              <View style={styles.catLeft}>
                <View style={[styles.dot, { backgroundColor: cat.color }]} />
                <Text style={styles.catName}>{cat.name}</Text>
              </View>

              <View style={styles.catBarWrapper}>
                <ProgressBar
                  progress={catProgress * 2.5}
                  height={5}
                  useGradient={false}
                  color={cat.color}
                />
              </View>

              <Text style={styles.catAmountText}>
                {currency}{catAmount}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Recent Expense History */}
      <View style={styles.historySection}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>EXPENSE LOG</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.addText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.expensesContainer}>
          {expenses.map((item) => (
            <View key={item.id} style={styles.expenseItem}>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseMeta}>
                  {item.category} • {item.date}
                </Text>
              </View>
              <View style={styles.expenseRight}>
                <Text style={styles.expenseAmount}>
                  -{currency}{item.amount}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(deleteExpense(item.id))}
                  style={{ padding: 4 }}
                >
                  <Trash2 size={14} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Add Expense Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Add Trip Expense</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Expense title (e.g. Bullet train ticket, Gion dinner)"
              placeholderTextColor={colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />

            <TextInput
              placeholder="Amount in USD (e.g. 45)"
              placeholderTextColor={colors.textMuted}
              value={newAmount}
              onChangeText={setNewAmount}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>CATEGORY</Text>
            <View style={styles.catPillsGrid}>
              {categoryConfig.map((c) => (
                <TouchableOpacity
                  key={c.name}
                  onPress={() => setNewCategory(c.name)}
                  style={[
                    styles.catPill,
                    newCategory === c.name && styles.catPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.catPillText,
                      newCategory === c.name && styles.catPillTextActive,
                    ]}
                  >
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <GradientButton
              title="Record Expense"
              onPress={handleAddExpense}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: 2,
  },
  spentCard: {
    borderColor: 'rgba(0, 210, 180, 0.3)',
    backgroundColor: 'rgba(0, 210, 180, 0.05)',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  metricValue: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  spentValue: {
    color: colors.primaryTeal,
  },
  metricSub: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  spentSub: {
    color: colors.primaryTeal,
  },
  progressSection: {
    marginBottom: theme.spacing.xl,
  },
  breakdownList: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: 16,
    marginBottom: theme.spacing.xl,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 120,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  catName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  catBarWrapper: {
    flex: 1,
    marginHorizontal: 12,
  },
  catAmountText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    width: 50,
    textAlign: 'right',
  },
  historySection: {
    gap: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  addText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  expensesContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  expenseInfo: {
    flex: 1,
    gap: 2,
  },
  expenseTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  expenseMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  expenseRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expenseAmount: {
    color: colors.accentRose,
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    color: colors.text,
    fontSize: 15,
    marginBottom: 12,
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  catPillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  catPillActive: {
    backgroundColor: colors.primary,
  },
  catPillText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  catPillTextActive: {
    color: '#070B11',
    fontWeight: '700',
  },
});

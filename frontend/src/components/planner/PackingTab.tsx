import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Check, Trash2, Plus, X } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { togglePacked, addItem, deleteItem } from '../../store/packingSlice';
import { ProgressBar } from '../common/ProgressBar';
import { GradientButton } from '../common/GradientButton';
import { PackingCategory } from '../../types';
import { colors, theme } from '../../theme/colors';

export const PackingTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.packing.items);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PackingCategory>('GEAR');

  const packedCount = items.filter((i) => i.isPacked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? packedCount / totalCount : 0;

  const categories: PackingCategory[] = [
    'DOCUMENTS',
    'TECH',
    'GEAR',
    'HEALTH',
    'FINANCE',
    'CLOTHING',
  ];

  const handleAddItem = () => {
    if (newTitle.trim()) {
      dispatch(addItem({ title: newTitle.trim(), category: newCategory }));
      setNewTitle('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressCount}>
            {packedCount}/{totalCount} packed
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
        <ProgressBar progress={progress} height={7} />
      </View>

      {/* Category Groups */}
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat);
        if (catItems.length === 0) return null;

        return (
          <View key={cat} style={styles.categorySection}>
            <Text style={styles.categoryHeader}>{cat}</Text>

            <View style={styles.itemsList}>
              {catItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => dispatch(togglePacked(item.id))}
                  style={styles.itemRow}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.isPacked && styles.checkboxActive,
                    ]}
                  >
                    {item.isPacked && <Check size={14} color="#070B11" strokeWidth={3} />}
                  </View>

                  <Text
                    style={[
                      styles.itemText,
                      item.isPacked && styles.itemTextPacked,
                    ]}
                  >
                    {item.title}
                  </Text>

                  {item.isCustom && (
                    <TouchableOpacity
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      onPress={() => dispatch(deleteItem(item.id))}
                      style={styles.deleteBtn}
                    >
                      <Trash2 size={15} color={colors.textMuted} />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}

      {/* Add Item Trigger Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={styles.addItemBtn}
      >
        <Plus size={18} color={colors.primary} />
        <Text style={styles.addItemText}>Add custom item</Text>
      </TouchableOpacity>

      {/* Add Item Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Packing Item</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="e.g. Travel pillow, Drone battery..."
              placeholderTextColor={colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>CATEGORY</Text>
            <View style={styles.categoryPillsRow}>
              {categories.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setNewCategory(c)}
                  style={[
                    styles.catPill,
                    newCategory === c && styles.catPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.catPillText,
                      newCategory === c && styles.catPillTextActive,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <GradientButton
              title="Add to Packing List"
              onPress={handleAddItem}
              style={{ marginTop: 16 }}
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
  progressCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressCount: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  progressPercentage: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  categorySection: {
    marginBottom: theme.spacing.xl,
  },
  categoryHeader: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: theme.spacing.md,
  },
  itemsList: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  itemText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  itemTextPacked: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    padding: 4,
  },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 14,
    marginTop: 8,
  },
  addItemText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
  modalTitle: {
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
    marginBottom: 16,
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  categoryPillsRow: {
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

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { mockProducts, getStockStatus } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function StockAlertModal({ isOpen, onClose }: Props) {
  const { alertProducts, setEditingProductId } = useApp();

  const outOfStockCount = alertProducts.filter(
    (p) => getStockStatus(p.availableQtyCss, p.availableQtyPcs) === 'OUT_OF_STOCK'
  ).length;

  const lowStockCount = alertProducts.filter(
    (p) => getStockStatus(p.availableQtyCss, p.availableQtyPcs) === 'LOW_STOCK'
  ).length;

  if (!isOpen) return null;

  return (
    <>
      <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.alertIcon}>⚠️</Text>
                <View>
                  <Text style={styles.title}>Stock Alert</Text>
                  <Text style={styles.subtitle}>{alertProducts.length} SKU(s) need attention</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summary}>
              {outOfStockCount > 0 && (
                <View style={styles.summaryItem}>
                  <Text style={styles.outOfStockText}>{outOfStockCount}</Text>
                  <Text style={styles.summaryLabel}>Out of Stock</Text>
                </View>
              )}
              {lowStockCount > 0 && (
                <View style={styles.summaryItem}>
                  <Text style={styles.lowStockText}>{lowStockCount}</Text>
                  <Text style={styles.summaryLabel}>Low Stock</Text>
                </View>
              )}
            </View>

            <ScrollView style={styles.productsList}>
              {alertProducts.map((product) => {
                const stockStatus = getStockStatus(product.availableQtyCss, product.availableQtyPcs);
                const badgeColor = stockStatus === 'OUT_OF_STOCK' ? '#ef4444' : '#f59e0b';

                return (
                  <View key={product.id} style={styles.productItem}>
                    <View style={styles.productContent}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productMeta}>
                        Brand: {product.name.split('-')[0]} | Cases: {product.availableQtyCss}, Pieces: {product.availableQtyPcs}
                      </Text>
                      <View style={[styles.statusBadge, { backgroundColor: badgeColor + '20', borderColor: badgeColor }]}>
                        <Text style={[styles.statusText, { color: badgeColor }]}>
                          {stockStatus === 'OUT_OF_STOCK' ? 'Out of Stock' : 'Low Stock'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.productEditButton}
                      onPress={() => setEditingProductId(product.id)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.warning}>
              <Text style={styles.warningText}>
                Please update the stock and price up to the date properly.
              </Text>
            </View>

            <TouchableOpacity style={styles.okButton} onPress={onClose}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    fontSize: 20,
    color: '#999',
    padding: 8,
  },
  summary: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  summaryItem: {
    marginRight: 24,
  },
  outOfStockText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  lowStockText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  productsList: {
    maxHeight: 300,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  productContent: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  productMeta: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  productEditButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  warning: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 12,
    color: '#92400e',
    lineHeight: 16,
  },
  okButton: {
    backgroundColor: '#3b82f6',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

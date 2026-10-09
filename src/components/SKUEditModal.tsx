import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { mockProducts, getStockStatus } from '../data/mockData';
import { useNotifications } from '../context/NotificationContext';

interface Props {
  productId: string;
  onClose: () => void;
}

export default function SKUEditModal({ productId, onClose }: Props) {
  const product = mockProducts.find((p) => p.id === productId);
  const { addNotification } = useNotifications();

  const [showPricingModal, setShowPricingModal] = useState(false);
  const [mrp, setMrp] = useState(product?.mrp.toString() || '');
  const [sellingPrice, setSellingPrice] = useState(product?.sellingPrice.toString() || '');
  const [upc, setUpc] = useState('20');
  const [availableQtyCss, setAvailableQtyCss] = useState(product?.availableQtyCss.toString() || '');
  const [availableQtyPcs, setAvailableQtyPcs] = useState(product?.availableQtyPcs.toString() || '');

  if (!product) return null;

  const handleApplyPricing = () => {
    const currentStockStatus = getStockStatus(product.availableQtyCss, product.availableQtyPcs);

    product.mrp = parseFloat(mrp) || 0;
    product.sellingPrice = parseFloat(sellingPrice) || 0;
    product.availableQtyCss = parseInt(availableQtyCss, 10) || 0;
    product.availableQtyPcs = parseInt(availableQtyPcs, 10) || 0;

    const newStockStatus = getStockStatus(product.availableQtyCss, product.availableQtyPcs);

    if (newStockStatus !== currentStockStatus) {
      if (newStockStatus === 'NORMAL_STOCK') {
        addNotification({
          type: 'success',
          title: 'Stock Updated',
          message: `${product.name} stock updated. Cases: ${product.availableQtyCss}, Pieces: ${product.availableQtyPcs}. Stock is now at normal level.`,
          productId: product.id,
        });
      } else if (newStockStatus === 'OUT_OF_STOCK') {
        addNotification({
          type: 'error',
          title: 'Stock Alert',
          message: `${product.name} is now Out of Stock. Please update the stock and price.`,
          productId: product.id,
        });
      } else if (newStockStatus === 'LOW_STOCK') {
        addNotification({
          type: 'warning',
          title: 'Stock Alert',
          message: `${product.name} has reached low stock. Cases: ${product.availableQtyCss}, Pieces: ${product.availableQtyPcs}`,
          productId: product.id,
        });
      }
    } else {
      addNotification({
        type: 'success',
        title: 'Price Updated',
        message: `${product.name} price updated successfully.`,
        productId: product.id,
      });
    }

    setShowPricingModal(false);
  };

  return (
    <>
      <View style={styles.fullScreenOverlay}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backButton}>‹ Back</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.productTitle}>{product.name}</Text>

          {/* Variants Section */}
          <View style={styles.variantsContainer}>
            {product.variants.map((variant) => (
              <View
                key={variant.id}
                style={[
                  styles.variantCard,
                  variant.selected && styles.variantCardSelected,
                ]}
              >
                <View style={styles.variantCheck}>
                  {variant.selected && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.variantName,
                    variant.selected && styles.variantNameSelected,
                  ]}
                >
                  {variant.name}
                </Text>
                <Text
                  style={[
                    styles.variantMrp,
                    variant.selected && styles.variantMrpSelected,
                  ]}
                >
                  MRP {variant.mrp}
                </Text>
              </View>
            ))}
          </View>

          {/* Active Status */}
          <View style={styles.activeSection}>
            <View style={styles.checkbox}>
              <Text style={styles.checkboxChecked}>☑</Text>
            </View>
            <Text style={styles.activeText}>Active</Text>
          </View>

          {/* Product Image */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>🖼️</Text>
            </View>
          </View>

          {/* Price Options */}
          <View style={styles.priceOptionsSection}>
            <View style={styles.priceOptionsHeader}>
              <Text style={styles.priceOptionsTitle}>Price Options</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setShowPricingModal(true)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceLabel}>Maximum Retail Price</Text>
              <Text style={styles.priceValue}>₹{product.mrp}</Text>
            </View>
            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceLabel}>Selling Price</Text>
              <Text style={styles.priceValue}>₹{product.sellingPrice}</Text>
            </View>
            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceLabel}>UPC</Text>
              <Text style={styles.priceValue}>20</Text>
            </View>
            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceLabel}>Sale In Progress</Text>
              <Text style={styles.priceValue}>60</Text>
            </View>
            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceLabel}>Stock Available Css</Text>
              <Text style={styles.priceValue}>{product.availableQtyCss}</Text>
            </View>
            <View style={styles.priceDetailsRow}>
              <Text style={styles.priceLabel}>Stock Available Pcs</Text>
              <Text style={styles.priceValue}>{product.availableQtyPcs}</Text>
            </View>
          </View>

          {/* Packing Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Packing Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Minimum Order Quantity</Text>
              <Text style={styles.detailValue}>1</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Maximum Order Quantity</Text>
              <Text style={styles.detailValue}>999</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Inner Pack</Text>
              <Text style={styles.detailValue}>0</Text>
            </View>
          </View>

          {/* Tax Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tax Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tax Category</Text>
              <Text style={styles.detailValue}>Taxable supply</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tax Rate</Text>
              <Text style={styles.detailValue}>5</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Cess Rate</Text>
              <Text style={styles.detailValue}>0</Text>
            </View>
          </View>

          <View style={styles.spacing} />
        </ScrollView>
      </View>

      {/* Pricing Details Modal */}
      {showPricingModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.pricingModal}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>Add Pricing Details</Text>
              <TouchableOpacity onPress={() => setShowPricingModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pricingInputGroup}>
              <Text style={styles.pricingLabel}>MRP</Text>
              <TextInput
                style={styles.pricingInput}
                keyboardType="numeric"
                value={mrp}
                onChangeText={setMrp}
                placeholder="103"
              />
            </View>

            <View style={styles.pricingInputGroup}>
              <Text style={styles.pricingLabel}>Selling Price</Text>
              <TextInput
                style={styles.pricingInput}
                keyboardType="numeric"
                value={sellingPrice}
                onChangeText={setSellingPrice}
                placeholder="86"
              />
            </View>

            <View style={styles.pricingInputGroup}>
              <Text style={styles.pricingLabel}>UPC</Text>
              <TextInput
                style={styles.pricingInput}
                keyboardType="numeric"
                value={upc}
                onChangeText={setUpc}
                placeholder="20"
              />
            </View>

            <View style={styles.pricingInputGroup}>
              <Text style={styles.pricingLabel}>Available Stock Qty Css</Text>
              <TextInput
                style={styles.pricingInput}
                keyboardType="numeric"
                value={availableQtyCss}
                onChangeText={setAvailableQtyCss}
                placeholder="0"
              />
            </View>

            <View style={styles.pricingInputGroup}>
              <Text style={styles.pricingLabel}>Available Stock Qty Pcs</Text>
              <TextInput
                style={styles.pricingInput}
                keyboardType="numeric"
                value={availableQtyPcs}
                onChangeText={setAvailableQtyPcs}
                placeholder="0"
              />
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyPricing}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 600,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  variantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  variantCard: {
    width: '32%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  variantCardSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  variantCheck: {
    marginBottom: 4,
  },
  checkMark: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
  },
  variantName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  variantNameSelected: {
    color: '#fff',
  },
  variantMrp: {
    fontSize: 10,
    color: '#666',
  },
  variantMrpSelected: {
    color: '#fff',
  },
  activeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxChecked: {
    fontSize: 16,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  imagePlaceholderText: {
    fontSize: 40,
  },
  priceOptionsSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  priceOptionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceOptionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  editButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  priceDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  spacing: {
    height: 32,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 601,
  },
  pricingModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    fontSize: 20,
    color: '#999',
  },
  pricingInputGroup: {
    marginBottom: 16,
  },
  pricingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  pricingInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#fff',
  },
  applyButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

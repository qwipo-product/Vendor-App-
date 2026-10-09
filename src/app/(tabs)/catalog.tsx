import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockProducts, getStockStatus, getStockPriority } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function CatalogScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { setEditingProductId } = useApp();
  const { edit } = useLocalSearchParams<{ edit?: string }>();

  // If a push notification opened a fresh tab at /catalog?edit=<id>
  // (no existing window was focusable), open that product's edit view.
  useEffect(() => {
    if (edit) {
      setEditingProductId(edit);
    }
  }, [edit, setEditingProductId]);

  const filteredProducts = mockProducts
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const priorityA = getStockPriority(getStockStatus(a.availableQtyCss, a.availableQtyPcs));
      const priorityB = getStockPriority(getStockStatus(b.availableQtyCss, b.availableQtyPcs));
      return priorityA - priorityB;
    });

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
  };

  const renderProduct = ({ item }: { item: (typeof mockProducts)[0] }) => {
    const stockStatus = getStockStatus(item.availableQtyCss, item.availableQtyPcs);
    const stockColor = {
      OUT_OF_STOCK: '#ef4444',
      LOW_STOCK: '#f59e0b',
      NORMAL_STOCK: '#10b981',
    }[stockStatus];

    return (
      <View style={styles.productCard}>
        <View style={styles.productHeader}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>MRP</Text>
            <Text style={styles.value}>{item.mrp}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Selling Price</Text>
            <Text style={styles.value}>{item.sellingPrice}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Available Qty Css</Text>
            <Text style={styles.value}>{item.availableQtyCss}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Available Qty Pcs</Text>
            <Text style={styles.value}>{item.availableQtyPcs}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, { color: stockColor }]}>{stockStatus}</Text>
          </View>
        </View>

        <View style={styles.variantContainer}>
          {item.variants.map((variant) => (
            <View
              key={variant.id}
              style={[
                styles.variantBadge,
                variant.selected && styles.variantBadgeSelected,
              ]}
            >
              <Text
                style={[
                  styles.variantText,
                  variant.selected && styles.variantTextSelected,
                ]}
              >
                {variant.selected ? '✓ ' : ''}{variant.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Q</Text>
          </View>
          <Text style={styles.logoName}>SGBL</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add SKU</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Brand</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={styles.productsList}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#fff',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  editButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  variantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  variantBadge: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  variantBadgeSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  variantText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  variantTextSelected: {
    color: '#fff',
  },
});

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { mockOrders } from '../../data/mockData';

export default function OrdersScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Q</Text>
        </View>
        <Text style={styles.logoName}>SGBL</Text>
      </View>

      <View style={styles.dateSection}>
        <Text style={styles.dateText}>24th Sep 2026, Thursday</Text>
      </View>

      {mockOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.tripIcon}>🚚</Text>
            <View style={styles.orderInfo}>
              <Text style={styles.tripNumber}>{order.tripNumber} - {order.tripType}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Trip Number</Text>
              <Text style={styles.value}>{order.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Trip Date</Text>
              <Text style={styles.value}>{order.tripDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Driver Name</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile Number</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Field Agent</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile Number</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>OTP Number</Text>
              <Text style={styles.value}>{order.otpNumber}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  dateSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  orderCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  orderInfo: {
    flex: 1,
  },
  tripNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  viewButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../context/AppContext';

export default function AccountScreen() {
  const router = useRouter();
  const { setIsLoggedIn } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Q</Text>
        </View>
        <Text style={styles.logoName}>Qwipo</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
          <View>
            <Text style={styles.shopName}>SGBL</Text>
            <Text style={styles.shopId}>7702002017</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏪</Text>
          <Text style={styles.menuText}>Shop Details</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  shopId: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#999',
    marginLeft: 'auto',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  linkItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  linkText: {
    fontSize: 14,
    color: '#000',
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
  },
});

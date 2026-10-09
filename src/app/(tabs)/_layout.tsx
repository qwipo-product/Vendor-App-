import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../../context/AppContext';
import StockAlertModal from '../../components/StockAlertModal';
import SKUEditModal from '../../components/SKUEditModal';

function TabBarIcon(props: { name: string; focused: boolean }) {
  const icons: { [key: string]: string } = {
    orders: '🏠',
    catalog: '📦',
    deliveries: '🚚',
    account: '👤',
  };

  return (
    <Text style={[styles.tabIcon, props.focused && styles.tabIconFocused]}>{icons[props.name]}</Text>
  );
}

export default function TabsLayout() {
  const { showStockAlert, setShowStockAlert, editingProductId, setEditingProductId } = useApp();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#8B5CF6',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ focused }) => <TabBarIcon name="orders" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="deliveries"
          options={{
            title: 'Deliveries',
            tabBarIcon: ({ focused }) => <TabBarIcon name="deliveries" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="catalog"
          options={{
            title: 'Catalog',
            tabBarIcon: ({ focused }) => <TabBarIcon name="catalog" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'My Account',
            tabBarIcon: ({ focused }) => <TabBarIcon name="account" focused={focused} />,
          }}
        />
      </Tabs>

      <StockAlertModal isOpen={showStockAlert} onClose={() => setShowStockAlert(false)} />

      {editingProductId && (
        <SKUEditModal
          key={editingProductId}
          productId={editingProductId}
          onClose={() => setEditingProductId(null)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 8,
    paddingTop: 8,
    height: 80,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabIconFocused: {
    fontSize: 26,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

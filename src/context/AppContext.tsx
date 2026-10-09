import React, { createContext, useState, ReactNode, useCallback, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { mockProducts, getStockStatus, StockStatus } from '../data/mockData';
import { useNotifications } from './NotificationContext';
import { showPushNotification } from '../utils/pushNotifications';

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  showStockAlert: boolean;
  setShowStockAlert: (value: boolean) => void;
  alertProducts: typeof mockProducts;
  editingProductId: string | null;
  setEditingProductId: (productId: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [alertProducts, setAlertProducts] = useState<typeof mockProducts>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const prevLoginStateRef = useRef(false);
  const lastStockStatusRef = useRef<Record<string, StockStatus>>({});
  const { addNotification } = useNotifications();
  const router = useRouter();

  const navigateToEdit = useCallback((productId: string) => {
    setEditingProductId(productId);
    router.push('/catalog');
  }, [router]);

  // Listen for navigation requests coming from a clicked push notification
  useEffect(() => {
    if (Platform.OS !== 'web' || !('serviceWorker' in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'push-navigate' && event.data.productId) {
        navigateToEdit(event.data.productId);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
  }, [navigateToEdit]);

  // Check for stock alerts on login
  useEffect(() => {
    if (isLoggedIn && !prevLoginStateRef.current) {
      prevLoginStateRef.current = true;

      const productsNeedingAttention = mockProducts.filter(
        (product) =>
          product.status === 'Active' &&
          (getStockStatus(product.availableQtyCss, product.availableQtyPcs) === 'OUT_OF_STOCK' ||
            getStockStatus(product.availableQtyCss, product.availableQtyPcs) === 'LOW_STOCK')
      );

      if (productsNeedingAttention.length > 0) {
        setAlertProducts(productsNeedingAttention);
        setShowStockAlert(true);
      }

      // Initialize stock status for real-time monitoring
      mockProducts.forEach((product) => {
        lastStockStatusRef.current[product.id] = getStockStatus(product.availableQtyCss, product.availableQtyPcs);
      });
    } else if (!isLoggedIn && prevLoginStateRef.current) {
      prevLoginStateRef.current = false;
      setShowStockAlert(false);
      setAlertProducts([]);
    }
  }, [isLoggedIn]);

  // Real-time monitoring for stock changes (checks every second while logged in)
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      mockProducts.forEach((product) => {
        if (product.status !== 'Active') return;

        const previousStatus = lastStockStatusRef.current[product.id];
        const currentStatus = getStockStatus(product.availableQtyCss, product.availableQtyPcs);

        if (previousStatus !== undefined && previousStatus !== currentStatus) {
          if (currentStatus === 'OUT_OF_STOCK' && previousStatus !== 'OUT_OF_STOCK') {
            addNotification({
              type: 'error',
              title: 'Stock Alert',
              message: `${product.name} is now Out of Stock. Please update the stock and price.`,
              productId: product.id,
              action: {
                label: 'Update Stock',
                onPress: () => navigateToEdit(product.id),
              },
            });
            showPushNotification({
              title: 'Stock Alert',
              body: `${product.name} is now Out of Stock. Please update the stock and price.`,
              productId: product.id,
            });
          } else if (currentStatus === 'LOW_STOCK' && previousStatus === 'NORMAL_STOCK') {
            addNotification({
              type: 'warning',
              title: 'Stock Alert',
              message: `${product.name} has reached low stock. Cases: ${product.availableQtyCss}, Pieces: ${product.availableQtyPcs}`,
              productId: product.id,
              action: {
                label: 'Update Stock',
                onPress: () => navigateToEdit(product.id),
              },
            });
            showPushNotification({
              title: 'Stock Alert',
              body: `${product.name} has reached low stock. Cases: ${product.availableQtyCss}, Pieces: ${product.availableQtyPcs}`,
              productId: product.id,
            });
          }

          lastStockStatusRef.current[product.id] = currentStatus;
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isLoggedIn, addNotification, navigateToEdit]);

  // DEMO: simulate a background stock change 60 seconds after login,
  // so the real-time monitor above has something to detect and alert on.
  useEffect(() => {
    if (!isLoggedIn) return;

    const demoTimeout = setTimeout(() => {
      const demoProduct = mockProducts.find((p) => p.id === '12'); // Britannia Bournvita
      if (demoProduct) {
        demoProduct.availableQtyCss = 2;
        demoProduct.availableQtyPcs = 0;
      }
    }, 60000); // 60 seconds after login

    return () => clearTimeout(demoTimeout);
  }, [isLoggedIn]);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, showStockAlert, setShowStockAlert, alertProducts, editingProductId, setEditingProductId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

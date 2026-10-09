import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MySKUs from './pages/MySKUs';
import SKUDetails from './pages/SKUDetails';
import SKUEdit from './pages/SKUEdit';
import StockAlertModal from './components/StockAlertModal';
import { NotificationCenter, notificationStore } from './components/NotificationCenter';
import { mockSKUs, getStockStatus, StockStatus } from './data/mockData';
import { registerServiceWorker, requestNotificationPermission, showPushNotification } from './utils/pushNotifications';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const lastStockStatusRef = useRef<Record<string, StockStatus>>({});
  const prevLoginStateRef = useRef(false);

  // Listen for navigation requests coming from a clicked push notification
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'push-navigate' && event.data.path) {
        navigate(event.data.path);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
  }, [navigate]);

  // Check for alerts and show modal every time user logs in
  useEffect(() => {
    if (isLoggedIn && !prevLoginStateRef.current) {
      // Transition from logged out to logged in
      prevLoginStateRef.current = true;

      const hasOutOfStock = mockSKUs.some(
        sku => sku.status === 'Active' && getStockStatus(sku.stock.availableCases, sku.stock.availablePieces) === 'OUT_OF_STOCK'
      );
      const hasLowStock = mockSKUs.some(
        sku => sku.status === 'Active' && getStockStatus(sku.stock.availableCases, sku.stock.availablePieces) === 'LOW_STOCK'
      );

      // Always show modal if there are alerts
      if (hasOutOfStock || hasLowStock) {
        setShowStockAlert(true);
      }

      // Initialize stock status for monitoring
      mockSKUs.forEach(sku => {
        lastStockStatusRef.current[sku.id] = getStockStatus(sku.stock.availableCases, sku.stock.availablePieces);
      });
    } else if (!isLoggedIn && prevLoginStateRef.current) {
      // Transition from logged in to logged out
      prevLoginStateRef.current = false;
      setShowStockAlert(false);
    }
  }, [isLoggedIn]);

  // Real-time monitoring for stock changes
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      mockSKUs.forEach(sku => {
        if (sku.status !== 'Active') return;

        const previousStatus = lastStockStatusRef.current[sku.id];
        const currentStatus = getStockStatus(sku.stock.availableCases, sku.stock.availablePieces);

        // Only trigger alerts if status actually changed
        if (previousStatus !== undefined && previousStatus !== currentStatus) {
          if (currentStatus === 'OUT_OF_STOCK' && previousStatus !== 'OUT_OF_STOCK') {
            notificationStore.notify({
              type: 'error',
              title: 'Stock Alert',
              message: `${sku.productName} is now Out of Stock. Please update the stock and price.`,
              skuId: sku.id,
              navigationPath: `/sku/edit/${sku.id}`,
              action: {
                label: 'Update Stock',
                onClick: () => navigate(`/sku/edit/${sku.id}`)
              }
            });
            showPushNotification({
              title: 'Stock Alert',
              body: `${sku.productName} is now Out of Stock. Please update the stock and price.`,
              path: `/sku/edit/${sku.id}`,
              tag: `sku-${sku.id}`
            });
          } else if (currentStatus === 'LOW_STOCK' && previousStatus === 'NORMAL_STOCK') {
            notificationStore.notify({
              type: 'warning',
              title: 'Stock Alert',
              message: `${sku.productName} has reached low stock. Cases: ${sku.stock.availableCases}, Pieces: ${sku.stock.availablePieces}`,
              skuId: sku.id,
              navigationPath: `/sku/edit/${sku.id}`,
              action: {
                label: 'Update Stock',
                onClick: () => navigate(`/sku/edit/${sku.id}`)
              }
            });
            showPushNotification({
              title: 'Stock Alert',
              body: `${sku.productName} has reached low stock. Cases: ${sku.stock.availableCases}, Pieces: ${sku.stock.availablePieces}`,
              path: `/sku/edit/${sku.id}`,
              tag: `sku-${sku.id}`
            });
          }

          lastStockStatusRef.current[sku.id] = currentStatus;
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // DEMO: simulate a background stock change 60 seconds after login,
  // so the real-time monitor above has something to detect and alert on.
  useEffect(() => {
    if (!isLoggedIn) return;

    const demoTimeout = setTimeout(() => {
      const demoSku = mockSKUs.find(s => s.id === '6'); // Freedom Refined Sunflower Oil 1 Ltr Pouch
      if (demoSku) {
        demoSku.stock.availableCases = 0;
        demoSku.stock.availablePieces = 2;
        demoSku.stock.totalAvailablePieces = 2;
      }
    }, 60000); // 60 seconds after login

    return () => clearTimeout(demoTimeout);
  }, [isLoggedIn]);

  return (
    <>
      <NotificationCenter />
      <StockAlertModal
        isOpen={showStockAlert}
        onClose={() => setShowStockAlert(false)}
      />
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => {
            registerServiceWorker();
            requestNotificationPermission();
            setIsLoggedIn(true);
          }} />}
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/my-skus"
          element={isLoggedIn ? <MySKUs /> : <Navigate to="/login" />}
        />
        <Route
          path="/sku/edit/:id"
          element={isLoggedIn ? <SKUEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/sku/:id"
          element={isLoggedIn ? <SKUDetails /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

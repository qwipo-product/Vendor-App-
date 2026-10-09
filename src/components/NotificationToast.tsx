import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotifications();

  const typeColors = {
    success: { bg: '#d1fae5', border: '#10b981', text: '#047857' },
    error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
    warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  };

  // Rendered in its own native Modal so it always stacks above other
  // Modals (e.g. StockAlertModal), which otherwise portal above plain views.
  return (
    <Modal transparent visible={notifications.length > 0} animationType="none">
      <View style={styles.container} pointerEvents="box-none">
        {notifications.map((notification) => {
          const colors = typeColors[notification.type];
          return (
            <View
              key={notification.id}
              style={[
                styles.toast,
                {
                  backgroundColor: colors.bg,
                  borderLeftColor: colors.border,
                },
              ]}
            >
              <View>
                <Text style={[styles.title, { color: colors.text }]}>{notification.title}</Text>
                <Text style={[styles.message, { color: colors.text }]}>{notification.message}</Text>
                {notification.action && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.border }]}
                    onPress={() => {
                      notification.action?.onPress();
                      removeNotification(notification.id);
                    }}
                  >
                    <Text style={styles.actionButtonText}>{notification.action.label}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 100,
  },
  toast: {
    borderLeftWidth: 4,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    lineHeight: 16,
  },
  actionButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

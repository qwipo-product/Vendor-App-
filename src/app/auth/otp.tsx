import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../../context/AppContext';
import { registerServiceWorker, requestNotificationPermission } from '../../utils/pushNotifications';

export default function OTPScreen() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(23);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const { setIsLoggedIn } = useApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      handleVerify(newOtp);
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpArray: string[]) => {
    const otpCode = otpArray.join('');
    if (otpCode === '123456' || otpArray.length === 6) {
      registerServiceWorker();
      requestNotificationPermission();
      setIsLoggedIn(true);
      router.replace('/(tabs)/orders');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Q</Text>
          </View>
          <Text style={styles.logoName}>Qwipo</Text>
        </View>

        <Text style={styles.title}>Enter 6-digit OTP</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>

        <Text style={styles.timer}>{String(timeLeft).padStart(2, '0')}:{String(23 - timeLeft).padStart(2, '0')}</Text>

        <TouchableOpacity>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>

        <Text style={styles.mobileDisplay}>{mobile}</Text>
      </View>

      <Text style={styles.footer}>
        By proceeding, you are agreeing to Qwipo's{'\n'}
        <Text style={styles.link}>Terms & Conditions</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  otpInputFilled: {
    borderColor: '#8B5CF6',
    backgroundColor: '#f0f0f0',
  },
  timer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  resendLink: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  mobileDisplay: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  link: {
    fontWeight: '600',
    color: '#000',
  },
});

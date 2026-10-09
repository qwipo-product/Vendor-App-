import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (mobileNumber.trim().length >= 10) {
      router.push({
        pathname: '/auth/otp',
        params: { mobile: mobileNumber },
      });
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

        <Text style={styles.title}>Enter mobile number</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            maxLength={10}
          />
        </View>

        <Text style={styles.counter}>{mobileNumber.length}/10</Text>

        <TouchableOpacity
          style={[styles.button, !mobileNumber.trim() && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!mobileNumber.trim()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: '100%',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  counter: {
    fontSize: 12,
    color: '#999',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

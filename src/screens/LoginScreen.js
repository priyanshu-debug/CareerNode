import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CareerNode</Text>
      <Text style={styles.tagline}>Connecting Talent in Real-Time</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('SeekerDashboard')}>
        <Text style={styles.btnText}>I want a Job</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, {backgroundColor: '#2980b9'}]} 
        onPress={() => navigation.navigate('PostJob')}>
        <Text style={styles.btnText}>I want to Hire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50' },
  tagline: { fontSize: 16, color: '#7f8c8d', marginBottom: 40 },
  button: { backgroundColor: '#e67e22', width: '80%', padding: 15, borderRadius: 10, marginVertical: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }
});

export default LoginScreen;
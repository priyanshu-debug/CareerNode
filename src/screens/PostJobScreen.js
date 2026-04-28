import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PostJobScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [wage, setWage] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post a New Job</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Job Title (e.g. Delivery Boy)" 
        onChangeText={setTitle}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Daily Wage (e.g. 500)" 
        keyboardType="numeric"
        onChangeText={setWage}
      />
      <TextInput 
        style={[styles.input, {height: 100}]} 
        placeholder="Job Description" 
        multiline
      />

      <TouchableOpacity style={styles.postBtn}>
        <Text style={styles.btnText}>Broadcast Job</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{color: '#666', marginTop: 20}}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff', paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, fontSize: 16 },
  postBtn: { backgroundColor: '#27ae60', padding: 15, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});

export default PostJobScreen;
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Briefcase, IndianRupee, MapPin, AlignLeft } from 'lucide-react-native';

const PostJobScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    wage: '',
    location: '',
    description: ''
  });

  
  const API_URL = '192.168.2.118:5000/api/jobs';

  const handlePostJob = async () => {
    if (!formData.title || !formData.wage || !formData.location) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          wage: Number(formData.wage), 
          location: formData.location,
          description: formData.description
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Job Broadcasted to CareerNode!", [
          { text: "OK", onPress: () => navigation.navigate('SeekerDashboard') }
        ]);
      } else {
        Alert.alert("Backend Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Make sure your backend is running and IP is correct");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Create a Job Post</Text>
        <Text style={styles.subHeader}>Fill details to find workers near you</Text>
      </View>

      <View style={styles.form}>
        {/* Job Title */}
        <View style={styles.inputContainer}>
          <Briefcase size={20} color="#2c3e50" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Job Title (e.g. Delivery Boy)"
            value={formData.title}
            onChangeText={(val) => setFormData({...formData, title: val})}
          />
        </View>

        {/* Daily Wage */}
        <View style={styles.inputContainer}>
          <IndianRupee size={20} color="#2c3e50" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Daily Wage (₹)"
            keyboardType="numeric"
            value={formData.wage}
            onChangeText={(val) => setFormData({...formData, wage: val})}
          />
        </View>

        {/* Location */}
        <View style={styles.inputContainer}>
          <MapPin size={20} color="#2c3e50" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Location (e.g. Sector 62, Noida)"
            value={formData.location}
            onChangeText={(val) => setFormData({...formData, location: val})}
          />
        </View>

        {/* Description */}
        <View style={[styles.inputContainer, {alignItems: 'flex-start'}]}>
          <AlignLeft size={20} color="#2c3e50" style={[styles.icon, {marginTop: 12}]} />
          <TextInput 
            style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
            placeholder="Job Description (Optional)"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(val) => setFormData({...formData, description: val})}
          />
        </View>

        <TouchableOpacity 
          style={[styles.postBtn, loading && {backgroundColor: '#95a5a6'}]} 
          onPress={handlePostJob}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Broadcast to Workers</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  headerSection: { padding: 30, backgroundColor: '#2c3e50', paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subHeader: { color: '#bdc3c7', marginTop: 5 },
  form: { padding: 20 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 15, 
    paddingHorizontal: 15,
    elevation: 2 
  },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16 },
  postBtn: { 
    backgroundColor: '#e67e22', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 20, 
    shadowColor: '#e67e22',
    shadowOpacity: 0.4,
    elevation: 5
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
  cancelBtn: { marginTop: 15, alignItems: 'center' },
  cancelText: { color: '#7f8c8d', fontSize: 16 }
});

export default PostJobScreen;
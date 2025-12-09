import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SecurityScreen() {
  const router = useRouter();
  const [rememberPassword, setRememberPassword] = useState(false);
  const [touchId, setTouchId] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    alert('Password changed successfully');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.toggleSection}>
          <View style={styles.toggleItem}>
            <Text style={styles.toggleLabel}>Remember Password</Text>
            <Switch
              style={styles.switch}
              value={rememberPassword}
              onValueChange={setRememberPassword}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={rememberPassword ? '#059669' : '#f3f4f6'}
            />
          </View>

          <View style={styles.toggleItem}>
            <Text style={styles.toggleLabel}>Touch ID</Text>
            <Switch
              style={styles.switch}
              value={touchId}
              onValueChange={setTouchId}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={touchId ? '#059669' : '#f3f4f6'}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.passwordSection}>
          <Text style={styles.sectionTitle}>Change Password</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Nithm@123"
              placeholderTextColor="#d1d5db"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Nithm@123"
              placeholderTextColor="#d1d5db"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  toggleSection: {
    gap: 16,
    marginBottom: 24,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  passwordSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 13,
    color: '#000',
    backgroundColor: '#f9fafb',
  },
  submitButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [membershipId, setMembershipId] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyDOB } = useAuth();
  const router = useRouter();

  const handleVerify = async () => {
    if (!membershipId || !dob) {
      setError('Please enter membership ID and date of birth');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      setError('Please enter date of birth in YYYY-MM-DD format');
      return;
    }

    setLoading(true);
    setError('');

    const result = await verifyDOB(membershipId, dob);
    setLoading(false);

    if (result.success && result.userId) {
      router.push({
        pathname: '/reset-password',
        params: { userId: result.userId.toString() },
      });
    } else {
      setError(result.error || 'Verification failed. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/dc-banner.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your membership ID and date of birth to verify your identity
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Membership ID</Text>
          <TextInput
            style={styles.input}
            placeholder="MEM12345"
            placeholderTextColor="#d1d5db"
            value={membershipId}
            onChangeText={setMembershipId}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#d1d5db"
            value={dob}
            onChangeText={setDob}
            autoCapitalize="none"
          />
          <Text style={styles.helperText}>Format: YYYY-MM-DD (e.g., 1980-05-01)</Text>
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          disabled={loading}>
          <Text style={styles.verifyButtonText}>
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToLoginButton}
          onPress={() => router.back()}>
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingTop: 60,
    paddingLeft: 16,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logoImage: {
    width: '60%',
    height: 100,
  },
  formContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#d2d3d6ff',
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 18,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  helperText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  verifyButton: {
    backgroundColor: '#0f4c8b',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  verifyButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.7,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLoginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backToLoginText: {
    color: '#0f4c8b',
    fontSize: 14,
    fontWeight: '600',
  },
});

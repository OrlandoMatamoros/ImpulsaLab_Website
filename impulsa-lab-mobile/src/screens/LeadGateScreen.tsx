import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useDiagnosticStore } from '../store/diagnosticStore';
import { INDUSTRY_OPTIONS } from '../constants/industry-benchmarks';
import { EMPLOYEE_COUNT_OPTIONS } from '../constants/company-size';
import { LeadData, Industry } from '../types';
import { saveLeadDataLocally } from '../services/storage';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../i18n';
import { LanguageSelector } from '../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LeadGate'>;

// Custom Picker Component - OUTSIDE main component
const CustomPicker: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}> = ({ label, options, selectedValue, onValueChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.pickerButton}
      >
        <Text style={selectedValue ? styles.pickerText : styles.pickerPlaceholder}>
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#6b7280"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.pickerDropdown}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
                style={[
                  styles.pickerOption,
                  option.value === selectedValue && styles.pickerOptionSelected
                ]}
              >
                <Text
                  style={option.value === selectedValue ? styles.pickerOptionTextSelected : styles.pickerOptionText}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

// Input Field Component - OUTSIDE main component to prevent re-renders
const InputField: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  error?: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = React.memo(({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  icon,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputWrapper, error && styles.inputError]}>
      <Ionicons name={icon} size={20} color="#9ca3af" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
));

export const LeadGateScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const setLeadData = useDiagnosticStore(state => state.setLeadData);
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Translated industry options
  const translatedIndustryOptions = useMemo(() => {
    return INDUSTRY_OPTIONS.map(opt => ({
      value: opt.value,
      label: t.industries[opt.value as keyof typeof t.industries] || opt.label,
    }));
  }, [t, language]);

  // Translated employee options
  const translatedEmployeeOptions = useMemo(() => {
    return EMPLOYEE_COUNT_OPTIONS.map(opt => ({
      value: opt.value,
      label: t.employees[opt.value as keyof typeof t.employees] || opt.label,
    }));
  }, [t, language]);

  // Validation
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = t.leadGate.errors.nameRequired;
    if (!email.trim()) {
      newErrors.email = t.leadGate.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.leadGate.errors.emailInvalid;
    }
    if (!companyName.trim()) newErrors.companyName = t.leadGate.errors.companyRequired;
    if (!industry) newErrors.industry = t.leadGate.errors.industryRequired;
    if (!employeeCount) newErrors.employeeCount = t.leadGate.errors.employeesRequired;
    if (!zipCode.trim()) {
      newErrors.zipCode = t.leadGate.errors.zipCodeRequired;
    } else if (!/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = t.leadGate.errors.zipCodeInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, companyName, industry, employeeCount, zipCode, t]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const leadData: LeadData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        companyName: companyName.trim(),
        industry: industry as Industry,
        employeeCount: parseInt(employeeCount, 10),
        zipCode: zipCode.trim(),
      };

      setLeadData(leadData);
      await saveLeadDataLocally(leadData);
      navigation.navigate('DiagnosticWizard');
    } catch (error) {
      console.error('Error submitting lead:', error);
      Alert.alert(t.common.error, t.leadGate.saveError);
    } finally {
      setIsLoading(false);
    }
  }, [name, email, phone, companyName, industry, employeeCount, zipCode, validateForm, setLeadData, navigation, t]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Language Selector */}
          <View style={styles.languageSelectorContainer}>
            <LanguageSelector compact />
          </View>

          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="analytics" size={40} color="white" />
            </View>
            <Text style={styles.title}>{t.leadGate.title}</Text>
            <Text style={styles.subtitle}>{t.leadGate.subtitle}</Text>
          </View>

          {/* Dimension badges */}
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>💰 {t.leadGate.badges.finance}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⚙️ {t.leadGate.badges.operations}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>📣 {t.leadGate.badges.marketing}</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>{t.leadGate.formTitle}</Text>
          <Text style={styles.formSubtitle}>{t.leadGate.formSubtitle}</Text>

          <InputField
            label={t.leadGate.fields.name}
            value={name}
            onChangeText={setName}
            placeholder={t.leadGate.fields.namePlaceholder}
            autoCapitalize="words"
            error={errors.name}
            icon="person-outline"
          />

          <InputField
            label={t.leadGate.fields.email}
            value={email}
            onChangeText={setEmail}
            placeholder={t.leadGate.fields.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            icon="mail-outline"
          />

          <InputField
            label={t.leadGate.fields.phone}
            value={phone}
            onChangeText={setPhone}
            placeholder={t.leadGate.fields.phonePlaceholder}
            keyboardType="phone-pad"
            icon="call-outline"
          />

          <InputField
            label={t.leadGate.fields.company}
            value={companyName}
            onChangeText={setCompanyName}
            placeholder={t.leadGate.fields.companyPlaceholder}
            autoCapitalize="words"
            error={errors.companyName}
            icon="business-outline"
          />

          <CustomPicker
            label={t.leadGate.fields.industry}
            options={translatedIndustryOptions}
            selectedValue={industry}
            onValueChange={(value) => setIndustry(value as Industry)}
            placeholder={t.leadGate.fields.industryPlaceholder}
          />
          {errors.industry && <Text style={[styles.errorText, { marginTop: -12, marginBottom: 16 }]}>{errors.industry}</Text>}

          <CustomPicker
            label={t.leadGate.fields.employees}
            options={translatedEmployeeOptions}
            selectedValue={employeeCount}
            onValueChange={setEmployeeCount}
            placeholder={t.leadGate.fields.employeesPlaceholder}
          />
          {errors.employeeCount && <Text style={[styles.errorText, { marginTop: -12, marginBottom: 16 }]}>{errors.employeeCount}</Text>}

          <InputField
            label={t.leadGate.fields.zipCode}
            value={zipCode}
            onChangeText={setZipCode}
            placeholder={t.leadGate.fields.zipCodePlaceholder}
            keyboardType="numeric"
            error={errors.zipCode}
            icon="location-outline"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>{t.leadGate.submitButton}</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>

          {/* Privacy note */}
          <Text style={styles.privacyNote}>
            🔒 {t.leadGate.privacyNote}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  languageSelectorContainer: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 10,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  formTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formSubtitle: {
    color: '#6b7280',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    color: '#111827',
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  pickerButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    color: '#111827',
    fontSize: 16,
  },
  pickerPlaceholder: {
    color: '#9ca3af',
    fontSize: 16,
  },
  pickerDropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    marginTop: 8,
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  pickerOptionSelected: {
    backgroundColor: '#eff6ff',
  },
  pickerOptionText: {
    color: '#374151',
    fontSize: 16,
  },
  pickerOptionTextSelected: {
    color: '#2563eb',
    fontWeight: '500',
    fontSize: 16,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 8,
  },
  privacyNote: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LeadGateScreen;

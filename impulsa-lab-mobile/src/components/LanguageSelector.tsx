import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage, Language } from '../i18n';

interface LanguageSelectorProps {
  style?: object;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style, compact = false }) => {
  const { language, setLanguage, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: t.language.spanish, flag: '🇲🇽' },
    { code: 'en', label: t.language.english, flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(l => l.code === language);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setModalVisible(false);
  };

  if (compact) {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.compactButton, style]}
      >
        <Text style={styles.compactFlag}>{currentLanguage?.flag}</Text>
        <Ionicons name="chevron-down" size={14} color="#6b7280" />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t.language.title}</Text>
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleSelectLanguage(lang.code)}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.languageOptionSelected,
                  ]}
                >
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.languageLabel,
                      language === lang.code && styles.languageLabelSelected,
                    ]}
                  >
                    {lang.label}
                  </Text>
                  {language === lang.code && (
                    <Ionicons name="checkmark-circle" size={20} color="#2563eb" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t.language.title}</Text>
      <View style={styles.buttonsRow}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => setLanguage(lang.code)}
            style={[
              styles.languageButton,
              language === lang.code && styles.languageButtonSelected,
            ]}
          >
            <Text style={styles.buttonFlag}>{lang.flag}</Text>
            <Text
              style={[
                styles.buttonLabel,
                language === lang.code && styles.buttonLabelSelected,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  languageButtonSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  buttonFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  buttonLabelSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  // Compact styles
  compactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  compactFlag: {
    fontSize: 18,
    marginRight: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageOptionSelected: {
    backgroundColor: '#eff6ff',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageLabel: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  languageLabelSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default LanguageSelector;

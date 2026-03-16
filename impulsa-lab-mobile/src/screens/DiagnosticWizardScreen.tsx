// ============================================
// IMPULSA LAB - DIAGNOSTIC WIZARD SCREEN (Screen 2)
// ============================================

import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
  BackHandler,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useDiagnosticStore } from '../store/diagnosticStore';
import { ALL_QUESTIONS } from '../constants/questions';
import { Question, Answer } from '../types';
import {
  calculateDiagnosticResult,
  calculateProgress,
} from '../utils/scoring-engine';
import {
  saveDiagnosticProgress,
  saveResultLocally,
} from '../services/storage';
import { saveCompleteDiagnostic } from '../services/firebase';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DiagnosticWizard'>;

// Progress Bar Component
const AnimatedProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: progress,
      useNativeDriver: false,
      tension: 40,
      friction: 8,
    }).start();
  }, [progress, animatedWidth]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[styles.progressBarFill, { width: widthInterpolated }]}
      />
    </View>
  );
};

// Dimension Badge Component
const DimensionBadge: React.FC<{ dimension: string; isActive: boolean; label: string }> = ({
  dimension,
  isActive,
  label,
}) => {
  const getIcon = () => {
    switch (dimension) {
      case 'finance':
        return '💰';
      case 'operations':
        return '⚙️';
      case 'marketing':
        return '📣';
      default:
        return '📊';
    }
  };

  const getDimensionColor = () => {
    switch (dimension) {
      case 'finance':
        return '#10b981'; // green
      case 'operations':
        return '#8b5cf6'; // purple
      case 'marketing':
        return '#f59e0b'; // amber
      default:
        return '#3b82f6';
    }
  };

  const color = getDimensionColor();

  return (
    <View style={[styles.dimensionBadge, { backgroundColor: isActive ? `${color}20` : '#f3f4f6' }]}>
      <Text style={styles.dimensionIcon}>{getIcon()}</Text>
      <Text style={[styles.dimensionText, { color: isActive ? color : '#6b7280' }]}>
        {label}
      </Text>
    </View>
  );
};

// Question Card Component
const QuestionCard: React.FC<{
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string, points: number) => void;
  animatedValue: Animated.Value;
  questionNumber: number;
  totalQuestions: number;
  ofText: string;
  keyQuestionText: string;
  translatedText: string;
  translatedOptions: { [key: string]: string };
}> = ({ question, selectedOptionId, onSelectOption, animatedValue, questionNumber, totalQuestions, ofText, keyQuestionText, translatedText, translatedOptions }) => {
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  const getDimensionColor = () => {
    switch (question.dimension) {
      case 'finance':
        return '#10b981';
      case 'operations':
        return '#8b5cf6';
      case 'marketing':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
  };

  const dimensionColor = getDimensionColor();

  return (
    <Animated.View
      style={[
        styles.questionCard,
        {
          transform: [{ translateX }],
          opacity,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.questionScrollContent}
      >
        {/* Question Header with gradient effect */}
        <View style={[styles.questionHeader, { backgroundColor: `${dimensionColor}10` }]}>
          <View style={[styles.questionNumberBadge, { backgroundColor: dimensionColor }]}>
            <Text style={styles.questionNumberText}>{questionNumber}</Text>
          </View>
          <Text style={styles.questionOf}>{ofText} {totalQuestions}</Text>
        </View>

        {/* Question Text */}
        <View style={styles.questionTextContainer}>
          <Text style={styles.questionText}>{translatedText}</Text>
          {question.category === 'CRITICAL' && (
            <View style={styles.criticalBadge}>
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text style={styles.criticalText}>{keyQuestionText}</Text>
            </View>
          )}
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            const letters = ['a', 'b', 'c', 'd', 'e'];
            const letterKey = letters[index];
            const translatedLabel = translatedOptions[letterKey] || option.label;

            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => onSelectOption(option.id, option.points)}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected,
                  isSelected && { borderColor: dimensionColor },
                ]}
                activeOpacity={0.7}
              >
                {/* Letter indicator */}
                <View
                  style={[
                    styles.optionLetter,
                    isSelected && { backgroundColor: dimensionColor },
                  ]}
                >
                  <Text style={[styles.optionLetterText, isSelected && styles.optionLetterTextSelected]}>
                    {letterKey.toUpperCase()}
                  </Text>
                </View>

                {/* Option text */}
                <Text
                  style={[
                    styles.optionText,
                    isSelected && { color: dimensionColor, fontWeight: '600' },
                  ]}
                >
                  {translatedLabel}
                </Text>

                {/* Selection checkmark */}
                {isSelected && (
                  <View style={[styles.checkmarkContainer, { backgroundColor: dimensionColor }]}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

// Main Component
export const DiagnosticWizardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();

  // Store state
  const leadData = useDiagnosticStore(state => state.leadData);
  const answers = useDiagnosticStore(state => state.answers);
  const currentIndex = useDiagnosticStore(state => state.currentQuestionIndex);
  const addAnswer = useDiagnosticStore(state => state.addAnswer);
  const setCurrentQuestionIndex = useDiagnosticStore(state => state.setCurrentQuestionIndex);
  const setResult = useDiagnosticStore(state => state.setResult);
  const isLoading = useDiagnosticStore(state => state.isLoading);
  const setIsLoading = useDiagnosticStore(state => state.setIsLoading);

  // Animation refs
  const cardAnimation = useRef(new Animated.Value(1)).current;

  // Current question
  const currentQuestion = ALL_QUESTIONS[currentIndex];
  const totalQuestions = ALL_QUESTIONS.length;
  const progress = calculateProgress(currentIndex + 1, totalQuestions);

  // Get selected option for current question
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const selectedOptionId = currentAnswer?.optionId || null;

  // Get dimension label
  const getDimensionLabel = (dimension: string) => {
    return t.dimensions[dimension as keyof typeof t.dimensions] || dimension;
  };

  // Get translated question text and options
  const getTranslatedQuestion = (questionId: string) => {
    const questionTranslations = t.questions as Record<string, { text: string; options: Record<string, string> }>;
    const translated = questionTranslations[questionId];
    if (translated) {
      return translated;
    }
    // Fallback to original question
    const originalQuestion = ALL_QUESTIONS.find(q => q.id === questionId);
    return {
      text: originalQuestion?.text || '',
      options: {} as Record<string, string>,
    };
  };

  // Handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentIndex > 0) {
        handlePrevious();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [currentIndex]);

  // Auto-save progress
  useEffect(() => {
    if (leadData) {
      saveDiagnosticProgress(leadData, answers, currentIndex);
    }
  }, [answers, currentIndex, leadData]);

  // Animate card entrance
  const animateCardIn = useCallback(() => {
    cardAnimation.setValue(0);
    Animated.spring(cardAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [cardAnimation]);

  useEffect(() => {
    animateCardIn();
  }, [currentIndex, animateCardIn]);

  // Handle option selection
  const handleSelectOption = (optionId: string, points: number) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      optionId,
      points,
    };
    addAnswer(answer);
  };

  // Handle next question
  const handleNext = async () => {
    if (!selectedOptionId) {
      Alert.alert(t.wizard.selectionRequired, t.wizard.selectOptionMessage);
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentIndex + 1);
    } else {
      // Complete diagnostic
      await completeDiagnostic();
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentQuestionIndex(currentIndex - 1);
    }
  };

  // Complete diagnostic and calculate results
  const completeDiagnostic = async () => {
    if (!leadData) {
      Alert.alert(t.common.error, t.wizard.errorNoLead);
      return;
    }

    setIsLoading(true);

    try {
      // Calculate results
      const result = calculateDiagnosticResult(leadData, answers);

      // Save to Firebase (non-blocking)
      try {
        await saveCompleteDiagnostic(leadData, result);
      } catch (firebaseError) {
        console.warn('Firebase save failed, continuing with local storage:', firebaseError);
      }

      // Save locally
      await saveResultLocally(result);

      // Update store
      setResult(result);

      // Navigate to results
      navigation.replace('Results');
    } catch (error) {
      console.error('Error completing diagnostic:', error);
      Alert.alert(t.common.error, t.wizard.processingError);
    } finally {
      setIsLoading(false);
    }
  };

  // Exit confirmation
  const handleExit = () => {
    Alert.alert(
      t.wizard.exitTitle,
      t.wizard.exitMessage,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.wizard.exit,
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!currentQuestion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>{t.wizard.loadingQuestions}</Text>
      </View>
    );
  }

  const getDimensionColor = () => {
    switch (currentQuestion.dimension) {
      case 'finance':
        return '#10b981';
      case 'operations':
        return '#8b5cf6';
      case 'marketing':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
  };

  const dimensionColor = getDimensionColor();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Top bar */}
        <View style={styles.headerTopBar}>
          <TouchableOpacity onPress={handleExit} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>

          <DimensionBadge
            dimension={currentQuestion.dimension}
            isActive
            label={getDimensionLabel(currentQuestion.dimension)}
          />

          <Text style={styles.questionCounter}>
            {currentIndex + 1} / {totalQuestions}
          </Text>
        </View>

        {/* Progress bar */}
        <AnimatedProgressBar progress={progress} />

        {/* Progress text */}
        <Text style={styles.progressText}>{progress}% {t.wizard.completed}</Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCardWrapper}>
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
          animatedValue={cardAnimation}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          ofText={t.wizard.of}
          keyQuestionText={t.wizard.keyQuestion}
          translatedText={getTranslatedQuestion(currentQuestion.id).text}
          translatedOptions={getTranslatedQuestion(currentQuestion.id).options}
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <View style={styles.navigationButtons}>
          {/* Previous Button */}
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={handlePrevious}
              style={styles.previousButton}
            >
              <Ionicons name="arrow-back" size={20} color="#6b7280" />
              <Text style={styles.previousButtonText}>{t.common.previous}</Text>
            </TouchableOpacity>
          )}

          {/* Next/Finish Button */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={isLoading}
            style={[
              styles.nextButton,
              currentIndex === 0 && styles.nextButtonFull,
              selectedOptionId ? { backgroundColor: dimensionColor } : styles.nextButtonDisabled,
            ]}
          >
            {isLoading ? (
              <View style={styles.loadingButtonContent}>
                <ActivityIndicator color="white" size="small" />
                <Text style={styles.nextButtonText}>{t.wizard.processing}</Text>
              </View>
            ) : currentIndex === totalQuestions - 1 ? (
              <>
                <Text style={styles.nextButtonText}>{t.wizard.viewResults}</Text>
                <Ionicons name="analytics" size={20} color="white" />
              </>
            ) : (
              <>
                <Text style={styles.nextButtonText}>{t.common.next}</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 16,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 8,
    marginLeft: -8,
  },
  questionCounter: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 8,
  },
  dimensionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dimensionIcon: {
    marginRight: 4,
    fontSize: 14,
  },
  dimensionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  questionCardWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  questionCard: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionScrollContent: {
    paddingBottom: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  questionNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionOf: {
    marginLeft: 8,
    color: '#6b7280',
    fontSize: 14,
  },
  questionTextContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  criticalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  criticalText: {
    color: '#92400e',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#f0f9ff',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    color: '#6b7280',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionLetterTextSelected: {
    color: 'white',
  },
  optionText: {
    flex: 1,
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  navigationContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  previousButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  previousButtonText: {
    color: '#6b7280',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  loadingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default DiagnosticWizardScreen;

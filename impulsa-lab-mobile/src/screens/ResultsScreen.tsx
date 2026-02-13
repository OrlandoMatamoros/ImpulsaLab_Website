// ============================================
// IMPULSA LAB - RESULTS DASHBOARD SCREEN (Screen 3)
// ============================================

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Alert,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Polygon, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { useDiagnosticStore } from '../store/diagnosticStore';
import { getCompanySizeByEmployees } from '../constants/company-size';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../i18n';
import { LanguageSelector } from '../components';
import {
  generateAIRecommendations,
  getFallbackRecommendations,
  AIRecommendations,
} from '../services/gemini';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;

// Radar Chart Component
const RadarChart: React.FC<{
  scores: { finance: number; operations: number; marketing: number };
  industryScores: { finance: number; operations: number; marketing: number };
  dimensionLabels: string[];
  legendLabels: { yourScore: string; industryAverage: string };
}> = ({ scores, industryScores, dimensionLabels, legendLabels }) => {
  const size = SCREEN_WIDTH - 80;
  const center = size / 2;
  const maxRadius = size / 2 - 40;

  // Animation
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  // Convert scores to polygon points
  const getPolygonPoints = (scoreObj: typeof scores) => {
    const dimensions = ['finance', 'operations', 'marketing'] as const;
    const angleStep = (Math.PI * 2) / 3;
    const startAngle = -Math.PI / 2; // Start from top

    return dimensions
      .map((dim, i) => {
        const score = scoreObj[dim];
        const radius = (score / 100) * maxRadius;
        const angle = startAngle + i * angleStep;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Grid lines
  const gridLevels = [20, 40, 60, 80, 100];
  const angleStep = (Math.PI * 2) / 3;
  const startAngle = -Math.PI / 2;

  return (
    <View style={styles.radarChartContainer}>
      <Svg width={size} height={size}>
        {/* Grid circles */}
        {gridLevels.map(level => (
          <Circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {dimensionLabels.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const x2 = center + maxRadius * Math.cos(angle);
          const y2 = center + maxRadius * Math.sin(angle);
          return (
            <Line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="#d1d5db"
              strokeWidth={1}
            />
          );
        })}

        {/* Industry average polygon */}
        <Polygon
          points={getPolygonPoints(industryScores)}
          fill="rgba(249, 115, 22, 0.15)"
          stroke="#f97316"
          strokeWidth={2}
          strokeDasharray="5,5"
        />

        {/* User score polygon */}
        <Polygon
          points={getPolygonPoints(scores)}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth={3}
        />

        {/* Score dots */}
        {Object.entries(scores).map(([key, score], i) => {
          const angle = startAngle + i * angleStep;
          const radius = (score / 100) * maxRadius;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <G key={key}>
              <Circle cx={x} cy={y} r={6} fill="#3b82f6" />
              <Circle cx={x} cy={y} r={3} fill="white" />
            </G>
          );
        })}

        {/* Labels */}
        {dimensionLabels.map((label, i) => {
          const angle = startAngle + i * angleStep;
          const labelRadius = maxRadius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          const score = Object.values(scores)[i];

          return (
            <G key={label}>
              <SvgText
                x={x}
                y={y - 8}
                textAnchor="middle"
                fill="#374151"
                fontSize={12}
                fontWeight="bold"
              >
                {label}
              </SvgText>
              <SvgText
                x={x}
                y={y + 8}
                textAnchor="middle"
                fill="#3b82f6"
                fontSize={14}
                fontWeight="bold"
              >
                {score}
              </SvgText>
            </G>
          );
        })}
      </Svg>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.legendText}>{legendLabels.yourScore}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.legendColorDashed]} />
          <Text style={styles.legendText}>{legendLabels.industryAverage}</Text>
        </View>
      </View>
    </View>
  );
};

// Score Card Component
const ScoreCard: React.FC<{
  dimension: 'finance' | 'operations' | 'marketing';
  userScore: number;
  industryAverage: number;
  percentile: string;
  dimensionLabel: string;
  percentileLabel: string;
  vsIndustryText: string;
}> = ({ dimension, userScore, industryAverage, dimensionLabel, percentileLabel, vsIndustryText }) => {
  const difference = userScore - industryAverage;

  const getIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (dimension) {
      case 'finance':
        return 'wallet-outline';
      case 'operations':
        return 'cog-outline';
      case 'marketing':
        return 'megaphone-outline';
    }
  };

  const getDimensionColor = () => {
    switch (dimension) {
      case 'finance':
        return '#10b981';
      case 'operations':
        return '#8b5cf6';
      case 'marketing':
        return '#f59e0b';
    }
  };

  const getPercentileColor = () => {
    if (percentileLabel.includes('Excelente') || percentileLabel.includes('Excellent')) return '#22c55e';
    if (percentileLabel.includes('Bueno') || percentileLabel.includes('Good')) return '#3b82f6';
    if (percentileLabel.includes('Promedio') || percentileLabel.includes('Average')) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={styles.scoreCard}>
      <View style={styles.scoreCardContent}>
        <View style={styles.scoreCardLeft}>
          <View style={[styles.scoreCardIcon, { backgroundColor: `${getDimensionColor()}15` }]}>
            <Ionicons name={getIcon()} size={20} color={getDimensionColor()} />
          </View>
          <View style={styles.scoreCardInfo}>
            <Text style={styles.scoreCardLabel}>{dimensionLabel}</Text>
            <Text style={styles.scoreCardValue}>{userScore}</Text>
          </View>
        </View>

        <View style={styles.scoreCardRight}>
          <View style={[styles.percentileBadge, { backgroundColor: `${getPercentileColor()}15` }]}>
            <Text style={[styles.percentileText, { color: getPercentileColor() }]}>
              {percentileLabel}
            </Text>
          </View>
          <View style={styles.differenceContainer}>
            <Ionicons
              name={difference >= 0 ? 'arrow-up' : 'arrow-down'}
              size={14}
              color={difference >= 0 ? '#22c55e' : '#ef4444'}
            />
            <Text style={[styles.differenceText, { color: difference >= 0 ? '#22c55e' : '#ef4444' }]}>
              {Math.abs(difference)} {vsIndustryText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Main Component
export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const result = useDiagnosticStore(state => state.result);
  const answers = useDiagnosticStore(state => state.answers);
  const resetDiagnostic = useDiagnosticStore(state => state.resetDiagnostic);
  const { t, language } = useLanguage();

  // AI Recommendations state
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendations | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(true);

  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Fetch AI recommendations on mount
  useEffect(() => {
    const fetchAIRecommendations = async () => {
      if (!result) return;

      setIsLoadingAI(true);
      try {
        const aiRecs = await generateAIRecommendations(
          result.scores,
          result.leadData,
          answers,
          language
        );

        if (aiRecs) {
          setAiRecommendations(aiRecs);
        } else {
          // Use fallback if AI fails
          const fallback = getFallbackRecommendations(result.scores, language);
          setAiRecommendations(fallback);
        }
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        // Use fallback on error
        if (result) {
          const fallback = getFallbackRecommendations(result.scores, language);
          setAiRecommendations(fallback);
        }
      } finally {
        setIsLoadingAI(false);
      }
    };

    fetchAIRecommendations();
  }, [result, answers, language]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Helper functions
  const getIndustryLabel = (industry: string) => {
    return t.industries[industry as keyof typeof t.industries] || industry;
  };

  const getDimensionLabel = (dimension: string) => {
    return t.dimensions[dimension as keyof typeof t.dimensions] || dimension;
  };

  const getPercentileLabel = (percentile: string) => {
    const key = percentile.toLowerCase().replace(' ', '_') as keyof typeof t.percentile;
    return t.percentile[key] || percentile;
  };

  const getMaturityInfo = (level: string) => {
    const levelKey = level.toLowerCase() as keyof typeof t.maturity;
    const maturityData = t.maturity[levelKey];
    const colors: Record<string, string> = {
      expansion: '#22c55e',
      growth: '#3b82f6',
      survival: '#f59e0b',
    };
    return {
      label: maturityData?.label || level,
      description: maturityData?.description || '',
      color: colors[level.toLowerCase()] || '#6b7280',
    };
  };

  if (!result) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="analytics-outline" size={64} color="#d1d5db" />
        <Text style={styles.emptyText}>{t.results.noResults}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeadGate')}
          style={styles.emptyButton}
        >
          <Text style={styles.emptyButtonText}>{t.results.startDiagnostic}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { scores, maturityLevel, industryComparison, leadData } = result;
  const maturityInfo = getMaturityInfo(maturityLevel);
  const companySizeConfig = getCompanySizeByEmployees(leadData.employeeCount);

  // Industry average scores for radar
  const industryAverages = {
    finance: industryComparison.finance.industryAverage,
    operations: industryComparison.operations.industryAverage,
    marketing: industryComparison.marketing.industryAverage,
  };

  // Dimension labels for radar chart
  const dimensionLabels = [
    t.dimensions.finance,
    t.dimensions.operations,
    t.dimensions.marketing,
  ];

  // Generate PDF
  const generatePDF = async () => {
    try {
      // Build AI recommendations HTML if available
      const aiRecsHtml = aiRecommendations ? `
        <div class="primary-rec">
          <h3 style="color: #f59e0b;">★ ${t.results.aiRoadmap.primaryRecommendation}</h3>
          <h4>${aiRecommendations.primaryRecommendation.title}</h4>
          <p><strong>${t.results.aiRoadmap.why}</strong><br/>${aiRecommendations.primaryRecommendation.why}</p>
          <p><strong>${t.results.aiRoadmap.expectedImpact}:</strong> ${aiRecommendations.primaryRecommendation.impact}</p>
          <p><strong>${t.results.aiRoadmap.actionPlan}:</strong></p>
          <ul>
            ${aiRecommendations.primaryRecommendation.actions.map(a => `<li>${a}</li>`).join('')}
          </ul>
          <p><strong>${t.results.aiRoadmap.quickWin}:</strong> ${aiRecommendations.primaryRecommendation.quickWin}</p>
        </div>

        <h3 style="margin-top: 30px;">${t.results.aiRoadmap.roadmap90Days}</h3>
        ${aiRecommendations.roadmap90Days.map((phase, idx) => `
          <div class="phase" style="background: ${idx === 0 ? '#dbeafe' : idx === 1 ? '#fef3c7' : '#dcfce7'}; padding: 15px; margin: 10px 0; border-radius: 8px;">
            <strong>${phase.phase}: ${phase.focus}</strong>
            <ul>
              ${phase.keyActions.map(a => `<li>${a}</li>`).join('')}
            </ul>
            <p><em>${t.results.aiRoadmap.expectedOutcome}: ${phase.expectedOutcome}</em></p>
          </div>
        `).join('')}

        <h3 style="margin-top: 30px;">${t.results.aiRoadmap.byDimension}</h3>
        <div style="border-left: 4px solid #10b981; padding-left: 15px; margin: 10px 0;">
          <strong>${t.dimensions.finance}:</strong> ${aiRecommendations.secondaryRecommendations.finance.title}<br/>
          <span>${aiRecommendations.secondaryRecommendations.finance.action}</span>
        </div>
        <div style="border-left: 4px solid #8b5cf6; padding-left: 15px; margin: 10px 0;">
          <strong>${t.dimensions.operations}:</strong> ${aiRecommendations.secondaryRecommendations.operations.title}<br/>
          <span>${aiRecommendations.secondaryRecommendations.operations.action}</span>
        </div>
        <div style="border-left: 4px solid #f59e0b; padding-left: 15px; margin: 10px 0;">
          <strong>${t.dimensions.marketing}:</strong> ${aiRecommendations.secondaryRecommendations.marketing.title}<br/>
          <span>${aiRecommendations.secondaryRecommendations.marketing.action}</span>
        </div>

        <h3 style="margin-top: 30px;">${t.results.aiRoadmap.successMetrics}</h3>
        <ul>
          ${aiRecommendations.successMetrics.map(m => `<li>✓ ${m}</li>`).join('')}
        </ul>
      ` : `
        <div class="recommendations">
          <h3>${t.results.recommendations}</h3>
          ${companySizeConfig.recommendations.map(rec => `
            <div class="recommendation-item">✓ ${rec}</div>
          `).join('')}
        </div>
      `;

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { color: #1e40af; font-size: 24px; }
            .score-box { background: #f3f4f6; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .overall-score { font-size: 48px; color: #3b82f6; font-weight: bold; text-align: center; }
            .dimension { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .maturity { padding: 15px; border-radius: 10px; margin: 20px 0; }
            .recommendations { margin-top: 30px; }
            .recommendation-item { padding: 10px; margin: 5px 0; background: #fef3c7; border-radius: 5px; }
            .primary-rec { background: #fffbeb; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .phase { page-break-inside: avoid; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${t.leadGate.title}</h1>
            <p>Impulsa Lab</p>
          </div>

          <h2>${leadData.companyName}</h2>
          <p>${t.leadGate.fields.industry}: ${getIndustryLabel(leadData.industry)}</p>
          <p>${companySizeConfig.label}</p>

          <div class="score-box">
            <p style="text-align: center;">${t.results.overallScore}</p>
            <div class="overall-score">${scores.overall}</div>
            <p style="text-align: center; color: ${maturityInfo.color};">
              ${maturityInfo.label}
            </p>
          </div>

          <h3>${t.results.dimensionDetail}</h3>
          <div class="dimension">
            <span>${t.dimensions.finance}</span>
            <strong>${scores.finance}</strong>
          </div>
          <div class="dimension">
            <span>${t.dimensions.operations}</span>
            <strong>${scores.operations}</strong>
          </div>
          <div class="dimension">
            <span>${t.dimensions.marketing}</span>
            <strong>${scores.marketing}</strong>
          </div>

          ${aiRecsHtml}

          <p style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px;">
            ${new Date().toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US')}
          </p>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `${t.leadGate.title} - Impulsa Lab`,
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert(t.results.pdfGenerated, t.results.pdfSaved);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert(t.common.error, t.results.pdfError);
    }
  };

  // Share results
  const shareResults = async () => {
    try {
      const message = language === 'es'
        ? `🎯 Mi Diagnóstico Empresarial 3D - Impulsa Lab\n\n📊 Puntaje General: ${scores.overall}/100\n💰 Finanzas: ${scores.finance}\n⚙️ Operaciones: ${scores.operations}\n📣 Marketing: ${scores.marketing}\n\n🏆 Nivel: ${maturityInfo.label}\n\n¡Descubre el tuyo en Impulsa Lab!`
        : `🎯 My 3D Business Diagnostic - Impulsa Lab\n\n📊 Overall Score: ${scores.overall}/100\n💰 Finance: ${scores.finance}\n⚙️ Operations: ${scores.operations}\n📣 Marketing: ${scores.marketing}\n\n🏆 Level: ${maturityInfo.label}\n\nDiscover yours at Impulsa Lab!`;

      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Start new diagnostic
  const handleNewDiagnostic = () => {
    Alert.alert(
      t.results.newDiagnosticTitle,
      t.results.newDiagnosticMessage,
      [
        { text: t.common.cancel, style: 'cancel' },
        {
          text: t.results.startNew,
          onPress: () => {
            resetDiagnostic();
            navigation.replace('LeadGate');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerPlaceholder} />
            <LanguageSelector compact style={styles.languageSelectorHeader} />
          </View>
          <Text style={styles.headerSubtitle}>{t.results.completed}</Text>
          <Text style={styles.headerTitle}>{leadData.companyName}</Text>

          {/* Overall Score */}
          <View style={styles.overallScoreContainer}>
            <Text style={styles.overallScoreLabel}>{t.results.overallScore}</Text>
            <Text style={styles.overallScoreValue}>{scores.overall}</Text>
            <View style={styles.maturityBadge}>
              <View style={[styles.maturityDot, { backgroundColor: maturityInfo.color }]} />
              <Text style={styles.maturityText}>{maturityInfo.label}</Text>
            </View>
            <Text style={styles.maturityDescription}>{maturityInfo.description}</Text>
          </View>
        </View>

        {/* Radar Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.results.profileVsIndustry}</Text>
          <Text style={styles.sectionSubtitle}>
            {t.results.comparedWith} {getIndustryLabel(leadData.industry)}
          </Text>

          <View style={styles.chartCard}>
            <RadarChart
              scores={scores}
              industryScores={industryAverages}
              dimensionLabels={dimensionLabels}
              legendLabels={{
                yourScore: t.results.legend.yourScore,
                industryAverage: t.results.legend.industryAverage,
              }}
            />
          </View>
        </View>

        {/* Dimension Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.results.dimensionDetail}</Text>

          <ScoreCard
            dimension="finance"
            userScore={scores.finance}
            industryAverage={industryComparison.finance.industryAverage}
            percentile={industryComparison.finance.percentile}
            dimensionLabel={getDimensionLabel('finance')}
            percentileLabel={getPercentileLabel(industryComparison.finance.percentile)}
            vsIndustryText={t.results.vsIndustry}
          />
          <ScoreCard
            dimension="operations"
            userScore={scores.operations}
            industryAverage={industryComparison.operations.industryAverage}
            percentile={industryComparison.operations.percentile}
            dimensionLabel={getDimensionLabel('operations')}
            percentileLabel={getPercentileLabel(industryComparison.operations.percentile)}
            vsIndustryText={t.results.vsIndustry}
          />
          <ScoreCard
            dimension="marketing"
            userScore={scores.marketing}
            industryAverage={industryComparison.marketing.industryAverage}
            percentile={industryComparison.marketing.percentile}
            dimensionLabel={getDimensionLabel('marketing')}
            percentileLabel={getPercentileLabel(industryComparison.marketing.percentile)}
            vsIndustryText={t.results.vsIndustry}
          />
        </View>

        {/* AI Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.results.recommendations}</Text>

          {isLoadingAI ? (
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>{t.results.aiRoadmap.loadingAI}</Text>
            </View>
          ) : aiRecommendations ? (
            <>
              {/* Warning Message if present */}
              {aiRecommendations.warningMessage && (
                <View style={styles.warningCard}>
                  <View style={styles.warningHeader}>
                    <Ionicons name="warning-outline" size={24} color="#dc2626" />
                    <Text style={styles.warningTitle}>{t.results.aiRoadmap.warningTitle}</Text>
                  </View>
                  <Text style={styles.warningText}>{aiRecommendations.warningMessage}</Text>
                </View>
              )}

              {/* Primary Recommendation */}
              <View style={styles.primaryRecommendationCard}>
                <View style={styles.primaryHeader}>
                  <Ionicons name="star" size={24} color="#f59e0b" />
                  <Text style={styles.primaryTitle}>{t.results.aiRoadmap.primaryRecommendation}</Text>
                </View>
                <Text style={styles.primaryRecommendationTitle}>
                  {aiRecommendations.primaryRecommendation.title}
                </Text>

                <View style={styles.primarySection}>
                  <Text style={styles.primarySectionLabel}>{t.results.aiRoadmap.why}</Text>
                  <Text style={styles.primarySectionText}>
                    {aiRecommendations.primaryRecommendation.why}
                  </Text>
                </View>

                <View style={styles.primarySection}>
                  <Text style={styles.primarySectionLabel}>{t.results.aiRoadmap.expectedImpact}</Text>
                  <Text style={styles.primarySectionText}>
                    {aiRecommendations.primaryRecommendation.impact}
                  </Text>
                </View>

                <View style={styles.primarySection}>
                  <Text style={styles.primarySectionLabel}>{t.results.aiRoadmap.actionPlan}</Text>
                  {aiRecommendations.primaryRecommendation.actions.map((action, idx) => (
                    <View key={idx} style={styles.actionItem}>
                      <View style={styles.actionBullet} />
                      <Text style={styles.actionText}>{action}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.primarySection}>
                  <Text style={styles.primarySectionLabel}>{t.results.aiRoadmap.tools}</Text>
                  <View style={styles.toolsContainer}>
                    {aiRecommendations.primaryRecommendation.tools.map((tool, idx) => (
                      <View key={idx} style={styles.toolChip}>
                        <Text style={styles.toolChipText}>{tool}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.quickWinBox}>
                  <View style={styles.quickWinHeader}>
                    <Ionicons name="flash" size={18} color="#22c55e" />
                    <Text style={styles.quickWinLabel}>{t.results.aiRoadmap.quickWin}</Text>
                  </View>
                  <Text style={styles.quickWinText}>
                    {aiRecommendations.primaryRecommendation.quickWin}
                  </Text>
                </View>

                <View style={styles.timelineBox}>
                  <Ionicons name="time-outline" size={16} color="#6b7280" />
                  <Text style={styles.timelineText}>
                    {t.results.aiRoadmap.timeline}: {aiRecommendations.primaryRecommendation.timeline}
                  </Text>
                </View>
              </View>

              {/* 90 Day Roadmap */}
              <View style={styles.roadmapSection}>
                <Text style={styles.roadmapTitle}>{t.results.aiRoadmap.roadmap90Days}</Text>
                {aiRecommendations.roadmap90Days.map((phase, idx) => (
                  <View key={idx} style={styles.phaseCard}>
                    <View style={[styles.phaseHeader, { backgroundColor: idx === 0 ? '#dbeafe' : idx === 1 ? '#fef3c7' : '#dcfce7' }]}>
                      <Text style={styles.phaseLabel}>{phase.phase}</Text>
                    </View>
                    <View style={styles.phaseContent}>
                      <Text style={styles.phaseFocus}>{phase.focus}</Text>
                      <Text style={styles.phaseSubtitle}>{t.results.aiRoadmap.keyActions}:</Text>
                      {phase.keyActions.map((action, actionIdx) => (
                        <View key={actionIdx} style={styles.phaseActionItem}>
                          <Text style={styles.phaseActionBullet}>•</Text>
                          <Text style={styles.phaseActionText}>{action}</Text>
                        </View>
                      ))}
                      <View style={styles.phaseOutcome}>
                        <Text style={styles.phaseOutcomeLabel}>{t.results.aiRoadmap.expectedOutcome}:</Text>
                        <Text style={styles.phaseOutcomeText}>{phase.expectedOutcome}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Secondary Recommendations by Dimension */}
              <View style={styles.secondarySection}>
                <Text style={styles.secondaryTitle}>{t.results.aiRoadmap.byDimension}</Text>

                {/* Finance */}
                <View style={[styles.dimensionCard, { borderLeftColor: '#10b981' }]}>
                  <View style={styles.dimensionHeader}>
                    <Ionicons name="wallet-outline" size={20} color="#10b981" />
                    <Text style={styles.dimensionLabel}>{t.dimensions.finance}</Text>
                  </View>
                  <Text style={styles.dimensionTitle}>
                    {aiRecommendations.secondaryRecommendations.finance.title}
                  </Text>
                  <Text style={styles.dimensionAction}>
                    {aiRecommendations.secondaryRecommendations.finance.action}
                  </Text>
                  <Text style={styles.dimensionImpact}>
                    {aiRecommendations.secondaryRecommendations.finance.impact}
                  </Text>
                </View>

                {/* Operations */}
                <View style={[styles.dimensionCard, { borderLeftColor: '#8b5cf6' }]}>
                  <View style={styles.dimensionHeader}>
                    <Ionicons name="cog-outline" size={20} color="#8b5cf6" />
                    <Text style={styles.dimensionLabel}>{t.dimensions.operations}</Text>
                  </View>
                  <Text style={styles.dimensionTitle}>
                    {aiRecommendations.secondaryRecommendations.operations.title}
                  </Text>
                  <Text style={styles.dimensionAction}>
                    {aiRecommendations.secondaryRecommendations.operations.action}
                  </Text>
                  <Text style={styles.dimensionImpact}>
                    {aiRecommendations.secondaryRecommendations.operations.impact}
                  </Text>
                </View>

                {/* Marketing */}
                <View style={[styles.dimensionCard, { borderLeftColor: '#f59e0b' }]}>
                  <View style={styles.dimensionHeader}>
                    <Ionicons name="megaphone-outline" size={20} color="#f59e0b" />
                    <Text style={styles.dimensionLabel}>{t.dimensions.marketing}</Text>
                  </View>
                  <Text style={styles.dimensionTitle}>
                    {aiRecommendations.secondaryRecommendations.marketing.title}
                  </Text>
                  <Text style={styles.dimensionAction}>
                    {aiRecommendations.secondaryRecommendations.marketing.action}
                  </Text>
                  <Text style={styles.dimensionImpact}>
                    {aiRecommendations.secondaryRecommendations.marketing.impact}
                  </Text>
                </View>
              </View>

              {/* Success Metrics */}
              <View style={styles.metricsCard}>
                <Text style={styles.metricsTitle}>{t.results.aiRoadmap.successMetrics}</Text>
                {aiRecommendations.successMetrics.map((metric, idx) => (
                  <View key={idx} style={styles.metricItem}>
                    <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                    <Text style={styles.metricText}>{metric}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.recommendationsCard}>
              {companySizeConfig.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <View style={styles.recommendationNumber}>
                    <Text style={styles.recommendationNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity onPress={generatePDF} style={styles.primaryButton}>
            <Ionicons name="document-text-outline" size={20} color="white" />
            <Text style={styles.primaryButtonText}>{t.results.downloadPDF}</Text>
          </TouchableOpacity>

          <View style={styles.secondaryButtonsRow}>
            <TouchableOpacity onPress={shareResults} style={styles.secondaryButton}>
              <Ionicons name="share-social-outline" size={20} color="#6b7280" />
              <Text style={styles.secondaryButtonText}>{t.results.share}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNewDiagnostic} style={styles.secondaryButton}>
              <Ionicons name="refresh-outline" size={20} color="#6b7280" />
              <Text style={styles.secondaryButtonText}>{t.results.new}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 16,
    marginTop: 16,
  },
  emptyButton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerPlaceholder: {
    width: 60,
  },
  languageSelectorHeader: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontSize: 14,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  overallScoreContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
  },
  overallScoreLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  overallScoreValue: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
  },
  maturityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  maturityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  maturityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  maturityDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  radarChartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendColorDashed: {
    backgroundColor: 'rgba(249, 115, 22, 0.3)',
    borderWidth: 1,
    borderColor: '#f97316',
    borderStyle: 'dashed',
  },
  legendText: {
    color: '#6b7280',
    fontSize: 13,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scoreCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scoreCardIcon: {
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
  },
  scoreCardInfo: {
    flex: 1,
  },
  scoreCardLabel: {
    color: '#6b7280',
    fontSize: 13,
  },
  scoreCardValue: {
    color: '#111827',
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreCardRight: {
    alignItems: 'flex-end',
  },
  percentileBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentileText: {
    fontSize: 12,
    fontWeight: '600',
  },
  differenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  differenceText: {
    fontSize: 12,
    marginLeft: 4,
  },
  recommendationsCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationNumber: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  recommendationNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendationText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
  },
  // AI Recommendations Styles
  loadingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  loadingText: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 14,
  },
  warningCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningTitle: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  warningText: {
    color: '#7f1d1d',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryRecommendationCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryTitle: {
    color: '#f59e0b',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  primaryRecommendationTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  primarySection: {
    marginBottom: 16,
  },
  primarySectionLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  primarySectionText: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  actionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 7,
    marginRight: 10,
  },
  actionText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  toolChip: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  toolChipText: {
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '500',
  },
  quickWinBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  quickWinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickWinLabel: {
    color: '#15803d',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
  quickWinText: {
    color: '#166534',
    fontSize: 14,
    lineHeight: 20,
  },
  timelineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  timelineText: {
    color: '#6b7280',
    fontSize: 13,
    marginLeft: 6,
  },
  roadmapSection: {
    marginBottom: 16,
  },
  roadmapTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  phaseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  phaseHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  phaseLabel: {
    color: '#1f2937',
    fontWeight: 'bold',
    fontSize: 14,
  },
  phaseContent: {
    padding: 16,
  },
  phaseFocus: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  phaseSubtitle: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  phaseActionItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  phaseActionBullet: {
    color: '#9ca3af',
    marginRight: 8,
  },
  phaseActionText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
  },
  phaseOutcome: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  phaseOutcomeLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  phaseOutcomeText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '500',
  },
  secondarySection: {
    marginBottom: 16,
  },
  secondaryTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dimensionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  dimensionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dimensionLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginLeft: 8,
  },
  dimensionTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  dimensionAction: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 6,
  },
  dimensionImpact: {
    color: '#059669',
    fontSize: 13,
    fontStyle: 'italic',
  },
  metricsCard: {
    backgroundColor: '#fefce8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fef08a',
  },
  metricsTitle: {
    color: '#854d0e',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricText: {
    color: '#713f12',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ResultsScreen;

// ============================================
// IMPULSA LAB - RESULTS DASHBOARD SCREEN (Screen 3)
// ============================================

import React, { useRef, useEffect } from 'react';
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
import {
  getMaturityLevelInfo,
  getDimensionLabel,
  getPercentileInfo,
} from '../utils/scoring-engine';
import { getIndustryLabel } from '../constants/industry-benchmarks';
import { getCompanySizeByEmployees } from '../constants/company-size';
import { RootStackParamList } from '../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;

// Radar Chart Component
const RadarChart: React.FC<{
  scores: { finance: number; operations: number; marketing: number };
  industryScores: { finance: number; operations: number; marketing: number };
}> = ({ scores, industryScores }) => {
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
  const getPolygonPoints = (scoreObj: typeof scores, scale = 1) => {
    const dimensions = ['finance', 'operations', 'marketing'] as const;
    const angleStep = (Math.PI * 2) / 3;
    const startAngle = -Math.PI / 2; // Start from top

    return dimensions
      .map((dim, i) => {
        const score = scoreObj[dim] * scale;
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
  const dimensions = ['Finanzas', 'Operaciones', 'Marketing'];
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
        {dimensions.map((_, i) => {
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
        {dimensions.map((label, i) => {
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
          <Text style={styles.legendText}>Tu puntaje</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.legendColorDashed]} />
          <Text style={styles.legendText}>Promedio industria</Text>
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
}> = ({ dimension, userScore, industryAverage, percentile }) => {
  const percentileInfo = getPercentileInfo(percentile);
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

  return (
    <View style={styles.scoreCard}>
      <View style={styles.scoreCardContent}>
        <View style={styles.scoreCardLeft}>
          <View style={[styles.scoreCardIcon, { backgroundColor: `${getDimensionColor()}15` }]}>
            <Ionicons name={getIcon()} size={20} color={getDimensionColor()} />
          </View>
          <View style={styles.scoreCardInfo}>
            <Text style={styles.scoreCardLabel}>{getDimensionLabel(dimension)}</Text>
            <Text style={styles.scoreCardValue}>{userScore}</Text>
          </View>
        </View>

        <View style={styles.scoreCardRight}>
          <View style={[styles.percentileBadge, { backgroundColor: `${percentileInfo.color}15` }]}>
            <Text style={[styles.percentileText, { color: percentileInfo.color }]}>
              {percentileInfo.label}
            </Text>
          </View>
          <View style={styles.differenceContainer}>
            <Ionicons
              name={difference >= 0 ? 'arrow-up' : 'arrow-down'}
              size={14}
              color={difference >= 0 ? '#22c55e' : '#ef4444'}
            />
            <Text style={[styles.differenceText, { color: difference >= 0 ? '#22c55e' : '#ef4444' }]}>
              {Math.abs(difference)} vs industria
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
  const resetDiagnostic = useDiagnosticStore(state => state.resetDiagnostic);

  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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

  if (!result) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="analytics-outline" size={64} color="#d1d5db" />
        <Text style={styles.emptyText}>No hay resultados disponibles</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeadGate')}
          style={styles.emptyButton}
        >
          <Text style={styles.emptyButtonText}>Iniciar diagnóstico</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { scores, maturityLevel, industryComparison, leadData } = result;
  const maturityInfo = getMaturityLevelInfo(maturityLevel);
  const companySizeConfig = getCompanySizeByEmployees(leadData.employeeCount);

  // Industry average scores for radar
  const industryAverages = {
    finance: industryComparison.finance.industryAverage,
    operations: industryComparison.operations.industryAverage,
    marketing: industryComparison.marketing.industryAverage,
  };

  // Generate PDF
  const generatePDF = async () => {
    try {
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
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Diagnóstico Empresarial 3D</h1>
            <p>Impulsa Lab</p>
          </div>

          <h2>Empresa: ${leadData.companyName}</h2>
          <p>Industria: ${getIndustryLabel(leadData.industry)}</p>
          <p>Tamaño: ${companySizeConfig.label}</p>

          <div class="score-box">
            <p style="text-align: center;">Puntaje General</p>
            <div class="overall-score">${scores.overall}</div>
            <p style="text-align: center; color: ${maturityInfo.color};">
              Nivel: ${maturityInfo.label}
            </p>
          </div>

          <h3>Puntajes por Dimensión</h3>
          <div class="dimension">
            <span>💰 Finanzas</span>
            <strong>${scores.finance}</strong>
          </div>
          <div class="dimension">
            <span>⚙️ Operaciones</span>
            <strong>${scores.operations}</strong>
          </div>
          <div class="dimension">
            <span>📣 Marketing</span>
            <strong>${scores.marketing}</strong>
          </div>

          <div class="recommendations">
            <h3>Recomendaciones para ${companySizeConfig.label}</h3>
            ${companySizeConfig.recommendations.map(rec => `
              <div class="recommendation-item">✓ ${rec}</div>
            `).join('')}
          </div>

          <p style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px;">
            Generado el ${new Date().toLocaleDateString('es-MX')}
          </p>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Diagnóstico Impulsa Lab',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF Generado', 'El archivo se ha guardado correctamente.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  // Share results
  const shareResults = async () => {
    try {
      await Share.share({
        message: `🎯 Mi Diagnóstico Empresarial 3D - Impulsa Lab\n\n📊 Puntaje General: ${scores.overall}/100\n💰 Finanzas: ${scores.finance}\n⚙️ Operaciones: ${scores.operations}\n📣 Marketing: ${scores.marketing}\n\n🏆 Nivel: ${maturityInfo.label}\n\n¡Descubre el tuyo en Impulsa Lab!`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Start new diagnostic
  const handleNewDiagnostic = () => {
    Alert.alert(
      'Nuevo diagnóstico',
      '¿Deseas iniciar un nuevo diagnóstico? Se borrarán los resultados actuales.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar nuevo',
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
          <Text style={styles.headerSubtitle}>Diagnóstico completado</Text>
          <Text style={styles.headerTitle}>{leadData.companyName}</Text>

          {/* Overall Score */}
          <View style={styles.overallScoreContainer}>
            <Text style={styles.overallScoreLabel}>Puntaje General</Text>
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
          <Text style={styles.sectionTitle}>Tu perfil vs. Industria</Text>
          <Text style={styles.sectionSubtitle}>
            Comparado con {getIndustryLabel(leadData.industry)}
          </Text>

          <View style={styles.chartCard}>
            <RadarChart scores={scores} industryScores={industryAverages} />
          </View>
        </View>

        {/* Dimension Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalle por dimensión</Text>

          <ScoreCard
            dimension="finance"
            userScore={scores.finance}
            industryAverage={industryComparison.finance.industryAverage}
            percentile={industryComparison.finance.percentile}
          />
          <ScoreCard
            dimension="operations"
            userScore={scores.operations}
            industryAverage={industryComparison.operations.industryAverage}
            percentile={industryComparison.operations.percentile}
          />
          <ScoreCard
            dimension="marketing"
            userScore={scores.marketing}
            industryAverage={industryComparison.marketing.industryAverage}
            percentile={industryComparison.marketing.percentile}
          />
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>

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
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity onPress={generatePDF} style={styles.primaryButton}>
            <Ionicons name="document-text-outline" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Descargar Plan PDF</Text>
          </TouchableOpacity>

          <View style={styles.secondaryButtonsRow}>
            <TouchableOpacity onPress={shareResults} style={styles.secondaryButton}>
              <Ionicons name="share-social-outline" size={20} color="#6b7280" />
              <Text style={styles.secondaryButtonText}>Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNewDiagnostic} style={styles.secondaryButton}>
              <Ionicons name="refresh-outline" size={20} color="#6b7280" />
              <Text style={styles.secondaryButtonText}>Nuevo</Text>
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
    paddingTop: 64,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
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

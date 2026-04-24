'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useLanguage } from '@/contexts/LanguageContext';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Hook personalizado para detectar el tamaño de la ventana (incluido temporalmente aquí)
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return windowSize;
}

interface RadarChart3DProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  companyName?: string;
}

export function RadarChart3D({ scores, companyName }: RadarChart3DProps) {
  const { t } = useLanguage();
  const tp = t.radarChart3D;
  const { width } = useWindowSize();
  const displayName = companyName || tp.defaultCompany;
  
  // Determinar el tamaño del chart según el dispositivo
  const getChartSize = () => {
    if (width < 640) return 'mobile';      // < 640px
    if (width < 1024) return 'tablet';     // 640px - 1024px
    return 'desktop';                       // > 1024px
  };

  const chartSize = getChartSize();
  
  // Configuraciones responsivas
  const responsiveConfig = {
    mobile: {
      fontSize: {
        ticks: 9,
        pointLabels: 11,
        title: 14,
        tooltip: 11
      },
      pointRadius: 6,
      pointHoverRadius: 8,
      padding: 10,
      labelPadding: 8
    },
    tablet: {
      fontSize: {
        ticks: 10,
        pointLabels: 12,
        title: 14,
        tooltip: 12
      },
      pointRadius: 8,
      pointHoverRadius: 10,
      padding: 15,
      labelPadding: 12
    },
    desktop: {
      fontSize: {
        ticks: 11,
        pointLabels: 13,
        title: 14,
        tooltip: 12
      },
      pointRadius: 10,
      pointHoverRadius: 12,
      padding: 20,
      labelPadding: 15
    }
  };

  const config = responsiveConfig[chartSize];

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: chartSize === 'mobile' ? 1.2 : 1,
    layout: {
      padding: config.padding
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 1
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          circular: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: config.fontSize.ticks,
            weight: 'bold' as const
          },
          color: '#ffffff',
          backdropColor: 'transparent',
          display: chartSize !== 'mobile' // Ocultar ticks en móvil para más espacio
        },
        pointLabels: {
          font: {
            size: config.fontSize.pointLabels,
            weight: 'bold' as const
          },
          color: '#ffffff',
          padding: config.labelPadding,
          centerPointLabels: true
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleFont: {
          size: config.fontSize.tooltip
        },
        bodyFont: {
          size: config.fontSize.tooltip
        },
        padding: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.raw + '/100';
          }
        }
      }
    }
  };

  const data = {
    labels: chartSize === 'mobile'
      ? tp.labelsMobile
      : tp.labels,
    datasets: [
      {
        label: displayName,
        data: [scores.finance, scores.operations, scores.marketing],
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderColor: '#ffffff',
        borderWidth: chartSize === 'mobile' ? 2 : 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: ['#3b82f6', '#10b981', '#a855f7'],
        pointHoverBackgroundColor: ['#3b82f6', '#10b981', '#a855f7'],
        pointHoverBorderColor: '#ffffff',
        pointRadius: config.pointRadius,
        pointHoverRadius: config.pointHoverRadius,
        pointBorderWidth: chartSize === 'mobile' ? 2 : 3
      },
      // Zona de Expansión (70+)
      {
        label: tp.expansion,
        data: [70, 70, 70],
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0
      },
      // Zona de Supervivencia (40)
      {
        label: tp.supervivencia,
        data: [40, 40, 40],
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      {/* Gradiente de fondo con los colores de la imagen */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #a855f7 50%, #ec4899 75%, #ef4444 100%)'
        }}
      />
      
      {/* Overlay sutil para mejorar contraste */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Efecto de brillo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)'
        }}
      />
      
      {/* Indicador de tamaño actual (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {chartSize} ({width}px)
        </div>
      )}
      
      {/* Gráfico con contenedor responsive */}
      <div className="relative z-10 w-full h-full p-2 sm:p-4">
        <Radar options={options} data={data} />
      </div>
      
      {/* Leyenda móvil optimizada */}
      {chartSize === 'mobile' && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm rounded p-2">
          <div className="flex justify-around text-xs text-white">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>FIN: {scores.finance}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>OPS: {scores.operations}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>MKT: {scores.marketing}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
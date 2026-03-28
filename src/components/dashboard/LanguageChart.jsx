import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LanguageChart = ({ langMap }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !langMap || langMap.size === 0) return;
    
    const labels = Array.from(langMap.keys());
    const data = Array.from(langMap.values());
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#a855f7', '#ec489a', '#3b82f6', '#ef4444', '#10b981',
            '#f59e0b', '#6366f1', '#14b8a6', '#8b5cf6', '#d946ef',
            '#06b6d4', '#84cc16', '#f97316', '#6b7280', '#eab308'
          ],
          borderWidth: 0,
          hoverOffset: 10,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
              font: { size: 10, family: 'Inter' },
              padding: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 8,
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} repos (${percentage}%)`;
              }
            }
          }
        },
        cutout: '60%',
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [langMap]);

  useEffect(() => {
    const updateChartColors = () => {
      if (chartInstance.current) {
        const isDark = document.documentElement.classList.contains('dark');
        chartInstance.current.options.plugins.legend.labels.color = isDark ? '#e5e7eb' : '#374151';
        chartInstance.current.update();
      }
    };
    
    const observer = new MutationObserver(updateChartColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  if (!langMap || langMap.size === 0) {
    return null;
  }

  const totalRepos = Array.from(langMap.values()).reduce((a, b) => a + b, 0);
  const topLanguage = Array.from(langMap.entries()).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="glass-card p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-xl font-semibold">
          📊 Language Distribution
        </h3>
        {topLanguage && (
          <div className="text-xs sm:text-sm text-gray-500">
            Most used: <span className="font-semibold text-purple-600 dark:text-purple-400">{topLanguage[0]}</span> ({topLanguage[1]} repos)
          </div>
        )}
      </div>
      <div className="h-64 sm:h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
        Total languages: {langMap.size} | Total repos: {totalRepos}
      </div>
    </div>
  );
};

export default LanguageChart;
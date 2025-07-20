import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePitch } from '../contexts/PitchContext';

const { FiTrendingUp, FiTrendingDown, FiMinus, FiTarget, FiClock, FiBarChart } = FiIcons;

const PitchAnalytics = ({ pitch }) => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [keywordPerformance, setKeywordPerformance] = useState([]);
  const [timeRange, setTimeRange] = useState('4weeks');

  useEffect(() => {
    // Generate mock analytics data
    generateMockData();
  }, [pitch, timeRange]);

  const generateMockData = () => {
    const weeks = timeRange === '4weeks' ? 4 : timeRange === '8weeks' ? 8 : 12;
    const weeklyData = [];
    const keywordData = [];

    // Generate weekly performance data
    for (let i = weeks; i >= 1; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      
      const baseScore = 75 + Math.random() * 20;
      const trend = Math.random() > 0.5 ? 1 : -1;
      
      weeklyData.push({
        week: `Week ${weeks - i + 1}`,
        date: date.toISOString().split('T')[0],
        score: Math.round(baseScore + (trend * Math.random() * 10)),
        keywordsHit: Math.round(8 + Math.random() * 4),
        totalKeywords: pitch?.keywords?.length || 12,
        avgSpeechRate: Math.round(150 + Math.random() * 50),
        practiceTime: Math.round(5 + Math.random() * 10)
      });
    }

    // Generate keyword performance data
    if (pitch?.keywords) {
      pitch.keywords.forEach((keyword, index) => {
        const hitRate = 60 + Math.random() * 35;
        const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable';
        const impact = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
        
        keywordData.push({
          keyword,
          hitRate: Math.round(hitRate),
          trend,
          impact,
          timesUsed: Math.round(5 + Math.random() * 15),
          avgPosition: index + 1
        });
      });
    }

    setAnalyticsData(weeklyData);
    setKeywordPerformance(keywordData);
  };

  const getOverallTrend = () => {
    if (analyticsData.length < 2) return 'stable';
    
    const recent = analyticsData.slice(-2);
    const change = recent[1].score - recent[0].score;
    
    if (change > 5) return 'up';
    if (change < -5) return 'down';
    return 'stable';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return FiTrendingUp;
      case 'down': return FiTrendingDown;
      default: return FiMinus;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const overallTrend = getOverallTrend();
  const latestData = analyticsData[analyticsData.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Pitch Analytics</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="4weeks">Last 4 weeks</option>
          <option value="8weeks">Last 8 weeks</option>
          <option value="12weeks">Last 12 weeks</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold text-gray-800">{latestData?.score || 0}</p>
            </div>
            <div className={`p-2 rounded-lg ${overallTrend === 'up' ? 'bg-green-100' : overallTrend === 'down' ? 'bg-red-100' : 'bg-gray-100'}`}>
              <SafeIcon icon={getTrendIcon(overallTrend)} className={`text-xl ${getTrendColor(overallTrend)}`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Keywords Hit Rate</p>
              <p className="text-2xl font-bold text-gray-800">
                {latestData ? Math.round((latestData.keywordsHit / latestData.totalKeywords) * 100) : 0}%
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100">
              <SafeIcon icon={FiTarget} className="text-xl text-blue-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Speech Rate</p>
              <p className="text-2xl font-bold text-gray-800">{latestData?.avgSpeechRate || 0} WPM</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-100">
              <SafeIcon icon={FiBarChart} className="text-xl text-purple-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Practice Time</p>
              <p className="text-2xl font-bold text-gray-800">{latestData?.practiceTime || 0} min</p>
            </div>
            <div className="p-2 rounded-lg bg-orange-100">
              <SafeIcon icon={FiClock} className="text-xl text-orange-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Trend</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Keyword Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Keyword Performance</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 font-semibold text-gray-700">Keyword</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-700">Hit Rate</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-700">Trend</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-700">Impact</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-700">Usage</th>
              </tr>
            </thead>
            <tbody>
              {keywordPerformance.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{item.keyword}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.hitRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{item.hitRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <SafeIcon 
                      icon={getTrendIcon(item.trend)} 
                      className={`text-lg ${getTrendColor(item.trend)}`} 
                    />
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                      {item.impact}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.timesUsed}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 p-6 rounded-lg border border-blue-200"
      >
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Weekly Insights</h4>
        <div className="space-y-2 text-blue-700">
          <p>• Your overall performance has {overallTrend === 'up' ? 'improved' : overallTrend === 'down' ? 'declined' : 'remained stable'} this week</p>
          <p>• Keywords with high impact are driving better engagement</p>
          <p>• Consider focusing on keywords with declining trends</p>
          <p>• Your speech rate is {latestData?.avgSpeechRate > 180 ? 'slightly fast' : latestData?.avgSpeechRate < 120 ? 'slightly slow' : 'optimal'} for presentations</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PitchAnalytics;
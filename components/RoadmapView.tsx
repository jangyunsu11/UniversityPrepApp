import React, { useState, useEffect } from 'react';
import { generateAnnualRoadmap } from '../services/geminiService';
import { RoadmapItem, MONTHS } from '../types';
import { SparklesIcon, CheckCircleIcon } from './Icons';

const RoadmapView: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initial load
  useEffect(() => {
    // Only fetch if empty to avoid loop, in a real app we'd persist this
    if (roadmap.length === 0) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await generateAnnualRoadmap();
      setRoadmap(data);
    } catch (e) {
      setError('로드맵을 생성하는 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = (month: number) => {
    setRoadmap(prev => prev.map(item => 
      item.month === month ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            2026 AI 입시 로드맵
          </h2>
          <p className="text-slate-400 mt-2">
            AI 전공 진학을 위한 1년간의 체계적인 활동 계획입니다.
          </p>
        </div>
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all
            ${loading 
              ? 'bg-slate-700 text-slate-400 cursor-wait' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            }`}
        >
          {loading ? '생성 중...' : <><SparklesIcon className="w-4 h-4" /> AI 재설계</>}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {loading && roadmap.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>AI가 2026년 입시 전략을 분석하고 있습니다...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.sort((a, b) => a.month - b.month).map((item) => (
            <div 
              key={item.month}
              className={`relative p-6 rounded-xl border transition-all duration-300 group
                ${item.completed 
                  ? 'bg-slate-800/50 border-emerald-500/30' 
                  : 'bg-slate-800/30 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800'
                }`}
            >
              {/* March Special Highlight */}
              {item.month === 3 && (
                <div className="absolute -top-3 -right-3">
                   <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <span className={`text-sm font-bold px-3 py-1 rounded-full 
                  ${item.month === 3 ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-700 text-slate-300'}`}>
                  {MONTHS[item.month - 1]}
                </span>
                <button 
                  onClick={() => toggleComplete(item.month)}
                  className={`text-slate-500 hover:text-emerald-400 transition-colors ${item.completed ? 'text-emerald-500' : ''}`}
                >
                  <CheckCircleIcon className="w-6 h-6" />
                </button>
              </div>
              
              <h3 className={`text-xl font-semibold mb-2 ${item.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                {item.title}
              </h3>
              
              <div className="text-xs uppercase tracking-wider font-bold text-blue-400 mb-2">
                {item.focusArea}
              </div>

              <p className={`text-sm leading-relaxed ${item.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapView;
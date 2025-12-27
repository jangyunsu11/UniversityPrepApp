import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyResource } from '../types';
import { BookIcon, SparklesIcon } from './Icons';

const StudyView: React.FC = () => {
  const [resources, setResources] = useState<StudyResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState('Beginner');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateStudyPlan(level);
      setResources(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            AI 학습 센터
          </h2>
          <p className="text-slate-400 mt-2">
            현재 수준에 맞는 맞춤형 AI 학습 커리큘럼을 제공합니다.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-800 p-1 rounded-lg">
          {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                ${level === l 
                  ? 'bg-slate-700 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {resources.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-800/20 rounded-2xl border border-slate-800">
          <BookIcon className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">학습 플랜을 시작하세요</h3>
          <p className="text-slate-500 mb-6">선택한 레벨({level})에 맞는 학습 로드맵을 생성합니다.</p>
          <button 
            onClick={handleGenerate}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <SparklesIcon className="w-5 h-5" />
            플랜 생성하기
          </button>
        </div>
      )}

      {loading && (
        <div className="py-20 text-center text-slate-400 animate-pulse">
          맞춤형 학습 자료를 큐레이션 중입니다...
        </div>
      )}

      <div className="space-y-4">
        {resources.map((resource, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-6 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 p-6 rounded-xl transition-all">
            <div className="md:w-1/4 space-y-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
              <h3 className="text-xl font-bold text-white">{resource.topic}</h3>
            </div>
            
            <div className="md:w-3/4 space-y-4">
              <p className="text-slate-300 leading-relaxed">{resource.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Key Concepts</span>
                  <div className="flex flex-wrap gap-2">
                    {resource.keyConcepts.map(c => (
                      <span key={c} className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded">
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-emerald-900/30">
                  <span className="text-xs font-bold text-emerald-500 uppercase block mb-2">Recommended Project</span>
                  <p className="text-sm text-emerald-100">{resource.recommendedProject}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyView;
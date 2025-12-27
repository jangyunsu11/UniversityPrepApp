import React, { useState } from 'react';
import { generateInventionIdeas } from '../services/geminiService';
import { InventionIdea } from '../types';
import { LightbulbIcon, SparklesIcon } from './Icons';

const InventionView: React.FC = () => {
  const [ideas, setIdeas] = useState<InventionIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('');

  const handleGenerate = async () => {
    if (!context.trim()) {
      // Small shake animation or focus could go here, but prompt is required for good results
    }
    setLoading(true);
    try {
      const data = await generateInventionIdeas(context);
      setIdeas(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          3월 발명 대회 아이디어 랩
        </h2>
        <p className="text-slate-400">
          AI 기술을 활용한 창의적인 발명 아이디어를 생성합니다. 
          관심 분야나 해결하고 싶은 문제를 입력해보세요.
        </p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="예: 환경 보호, 시각 장애인 보조, 학교 생활 개선..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-w-[140px]
              ${loading 
                ? 'bg-slate-700 text-slate-400 cursor-wait' 
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'}`}
          >
            {loading ? <span className="animate-spin">⏳ 생성 중...</span> : <><SparklesIcon className="w-5 h-5" /> 아이디어 생성</>}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center md:text-left">
          * 100개의 아이디어를 생성하므로 시간이 조금 걸릴 수 있습니다.
        </p>
      </div>

      {ideas.length > 0 && (
        <div className="flex justify-end text-sm text-slate-400 font-medium animate-fade-in">
          총 <span className="text-purple-400 mx-1 font-bold">{ideas.length}</span> 개의 아이디어가 생성되었습니다.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea, index) => (
          <div key={index} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-colors flex flex-col h-full animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-500/20 p-2 rounded-lg text-purple-300">
                <LightbulbIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">{idea.title}</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Problem</span>
                <p className="text-sm text-slate-300 mt-1 line-clamp-3">{idea.problem}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Solution (AI)</span>
                <p className="text-sm text-slate-300 mt-1 line-clamp-3">{idea.solution}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Tech Stack</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {idea.techStack.map(tech => (
                    <span key={tech} className="text-xs bg-slate-900 text-blue-300 px-2 py-1 rounded border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <span className="text-xs font-bold text-emerald-400">실현 가능성: {idea.feasibility}</span>
            </div>
          </div>
        ))}
        {ideas.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
            위 입력창에 관심 분야를 입력하고 <br/>100개의 AI 발명 아이디어를 받아보세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default InventionView;
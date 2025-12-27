import React, { useState } from 'react';
import { AppView } from './types';
import RoadmapView from './components/RoadmapView';
import InventionView from './components/InventionView';
import StudyView from './components/StudyView';
import { BrainIcon, CalendarIcon, LightbulbIcon, BookIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ROADMAP);

  const renderContent = () => {
    switch (currentView) {
      case AppView.ROADMAP:
        return <RoadmapView />;
      case AppView.INVENTION:
        return <InventionView />;
      case AppView.STUDY:
        return <StudyView />;
      default:
        return <RoadmapView />;
    }
  };

  const NavItem = ({ view, icon, label }: { view: AppView; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-w-[80px]
        ${currentView === view 
          ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f172a] text-slate-200">
      {/* Sidebar / Mobile Tab Bar */}
      <nav className="fixed bottom-0 w-full md:relative md:w-24 md:h-screen bg-slate-900/80 backdrop-blur-lg border-t md:border-t-0 md:border-r border-slate-800 z-50">
        <div className="h-full flex md:flex-col justify-around md:justify-start items-center p-4 md:gap-8">
          <div className="hidden md:block mb-8 p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <BrainIcon className="w-8 h-8 text-white" />
          </div>
          
          <NavItem 
            view={AppView.ROADMAP} 
            icon={<CalendarIcon className="w-6 h-6" />} 
            label="2026 로드맵" 
          />
          <NavItem 
            view={AppView.INVENTION} 
            icon={<LightbulbIcon className="w-6 h-6" />} 
            label="3월 발명" 
          />
          <NavItem 
            view={AppView.STUDY} 
            icon={<BookIcon className="w-6 h-6" />} 
            label="AI 학습" 
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 mb-20 md:mb-0 overflow-y-auto max-h-screen">
        <header className="mb-8 md:hidden flex items-center gap-3">
           <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <BrainIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">AI UniPrep 2026</h1>
        </header>

        {renderContent()}
        
        <footer className="mt-16 text-center text-slate-600 text-sm">
          <p>© 2024 AI UniPrep Planner. Powered by Gemini 2.0 Flash.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
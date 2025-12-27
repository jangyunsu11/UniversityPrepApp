export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  INVENTION = 'INVENTION',
  STUDY = 'STUDY'
}

export interface RoadmapItem {
  month: number;
  title: string;
  description: string;
  focusArea: string; // e.g., "Coding", "Research", "Competition"
  completed: boolean;
}

export interface InventionIdea {
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  feasibility: string;
}

export interface StudyResource {
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  keyConcepts: string[];
  recommendedProject: string;
}

export const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월", 
  "7월", "8월", "9월", "10월", "11월", "12월"
];
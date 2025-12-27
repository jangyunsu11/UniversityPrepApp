import { GoogleGenAI, Type } from "@google/genai";
import { InventionIdea, RoadmapItem, StudyResource } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelName = 'gemini-3-flash-preview';

export const generateAnnualRoadmap = async (): Promise<RoadmapItem[]> => {
  const prompt = `
    You are an expert university admissions consultant for a Korean high school student aiming for a Computer Science/AI major.
    Create a detailed 12-month roadmap for the year 2026.
    
    Context:
    1. The student's main focus is Artificial Intelligence.
    2. March (3월) must focus on an "Invention Competition" (발명 대회).
    3. The goal is to build a strong portfolio (Student Record/Saeng-gi-bu).
    
    Generate a plan for each month (1-12).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              month: { type: Type.INTEGER },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              focusArea: { type: Type.STRING },
              completed: { type: Type.BOOLEAN },
            },
            required: ["month", "title", "description", "focusArea"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as RoadmapItem[];
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return [];
  }
};

export const generateInventionIdeas = async (context: string): Promise<InventionIdea[]> => {
  const prompt = `
    Generate a comprehensive list of exactly 100 innovative invention ideas for a high school invention competition happening in March.
    The ideas must utilize Artificial Intelligence (AI) but be feasible for a high school student to prototype.
    
    CRITICAL REQUIREMENTS:
    1. Generate exactly 100 items.
    2. Output language must be Korean (한국어).
    3. Keep 'problem' and 'solution' very concise (max 1 sentence each) to ensure the response fits within the token limit.
    
    Context from user: ${context || "General AI ideas"}
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              problem: { type: Type.STRING },
              solution: { type: Type.STRING },
              techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
              feasibility: { type: Type.STRING },
            },
            required: ["title", "problem", "solution", "techStack", "feasibility"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as InventionIdea[];
  } catch (error) {
    console.error("Error generating ideas:", error);
    return [];
  }
};

export const generateStudyPlan = async (level: string): Promise<StudyResource[]> => {
  const prompt = `
    Create a structured study list for a student learning AI for university admissions.
    Current Level: ${level}
    Provide 5 key study topics ranging from theoretical math to practical coding.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
              description: { type: Type.STRING },
              keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendedProject: { type: Type.STRING },
            },
            required: ["topic", "difficulty", "description", "keyConcepts", "recommendedProject"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as StudyResource[];
  } catch (error) {
    console.error("Error generating study plan:", error);
    return [];
  }
};
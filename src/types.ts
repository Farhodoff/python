/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Difficulty {
  BEGINNER = "Boshlang'ich",
  INTERMEDIATE = "O'rta",
  ADVANCED = "Mukammal",
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  content: string; // Markdown text
  codeExample: string;
  solution?: string;
  exercisePrompt?: string;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  iconName: string; // lucide icon name
  modules: Module[];
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  description: string;
  initialCode: string;
  solutionCode: string; // for reference or check
  testCases: { input: string; expectedOutput: string }[];
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  answer: string;
  codeExample?: string;
}

export interface ProjectSpec {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  features: string[];
  databaseSchema?: string;
  architectureGuide?: string;
  steps: string[];
  points: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  xp: number;
  streak: number;
  completedLessons: string[]; // lessonIds
  completedChallenges: string[]; // challengeIds
  completedQuizzes: string[]; // moduleIds or quizIds
  completedProjects: string[]; // projectIds
  skillsRadar: { [key: string]: number }; // e.g. Basics: 80, OOP: 30, Web: 10
  achievements: string[]; // achievementIds
  certificateEarned: boolean;
}

export interface LeaderboardEntry {
  uid: string;
  name: string;
  xp: number;
  avatar: string;
  rank: number;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

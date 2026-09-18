export type SubjectId =
  | 'mathematics'
  | 'english-language'
  | 'basic-science'
  | 'social-studies'
  | 'computer-studies'
  | 'civic-education'
  | 'agricultural-science'
  | 'home-economics'
  | 'custom';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type QuestionCount = 5 | 10 | 15 | 20;

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  description: string;
  badge: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderLight: string;
  sampleTopics: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface QuizConfig {
  subjectId: SubjectId;
  subjectName: string;
  topic: string;
  difficulty: DifficultyLevel;
  questionCount: QuestionCount;
}

export interface UserAnswerRecord {
  questionId: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'E';
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResult {
  id: string;
  subject: string;
  topic: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  date: string;
  answers: UserAnswerRecord[];
}

export interface PracticeHistoryItem {
  id: string;
  subject: string;
  topic: string;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
  date: string;
}

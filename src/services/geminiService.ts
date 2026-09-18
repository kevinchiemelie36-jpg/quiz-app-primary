import { QuizConfig, QuizQuestion } from '../types';
import { generateSmartFallbackQuestions } from '../data/fallbackQuizzes';

export async function generatePracticeTest(config: QuizConfig): Promise<QuizQuestion[]> {
  try {
    const res = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: config.subjectName,
        topic: config.topic,
        difficulty: config.difficulty,
        count: config.questionCount,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        return data.questions;
      }
    }
  } catch (err) {
    console.warn('Network or API issue, using local curriculum bank:', err);
  }

  // Graceful fallback to verified primary school questions
  return generateSmartFallbackQuestions(
    config.subjectName,
    config.topic,
    config.difficulty,
    config.questionCount
  );
}

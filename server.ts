import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Primary test generation endpoint
app.post("/api/generate-quiz", async (req, res) => {
  const { subject, topic, difficulty = "medium", count = 5 } = req.body;

  if (!subject || !topic) {
    return res.status(400).json({
      error: "Subject and topic are required.",
    });
  }

  const numQuestions = Math.min(Math.max(Number(count) || 5, 5), 20);
  const ai = getGeminiClient();

  if (!ai) {
    console.warn("GEMINI_API_KEY is not set. Returning educational fallback payload.");
    return res.json({
      success: true,
      source: "fallback",
      message: "Generated via Learnly primary school question bank",
      questions: null, // Client will run local high-fidelity generator
    });
  }

  try {
    const prompt = `You are a warm, encouraging, world-class primary-school teacher creating a practice test for primary school pupils.

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty} (Easy = confidence building & fundamental definitions; Medium = standard primary school test level; Hard = critical thinking & slight challenge)
Number of questions: ${numQuestions}

CRITICAL RULES:
1. Every question MUST have EXACTLY FIVE choices: A, B, C, D, and E. Never generate 4 choices, never 6.
2. The options must be plausible and distinct. Only ONE choice is correct.
3. Every question must be clear, engaging, and suitable for primary school students (ages 6 to 12).
4. For each question, provide:
   - question: The question text.
   - optionA: Text for choice A.
   - optionB: Text for choice B.
   - optionC: Text for choice C.
   - optionD: Text for choice D.
   - optionE: Text for choice E.
   - correctAnswer: Must be exactly one of "A", "B", "C", "D", or "E".
   - explanation: A clear, gentle, friendly 1-3 sentence explanation teaching the student WHY this answer is correct and how to solve it. Example: "3/4 of 8 is 6 because 8 ÷ 4 = 2, and 2 × 3 = 6."
5. No duplicate questions. No questions with multiple correct answers.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  optionA: { type: Type.STRING },
                  optionB: { type: Type.STRING },
                  optionC: { type: Type.STRING },
                  optionD: { type: Type.STRING },
                  optionE: { type: Type.STRING },
                  correctAnswer: {
                    type: Type.STRING,
                    description: 'One of "A", "B", "C", "D", or "E"',
                  },
                  explanation: { type: Type.STRING },
                },
                required: [
                  "question",
                  "optionA",
                  "optionB",
                  "optionC",
                  "optionD",
                  "optionE",
                  "correctAnswer",
                  "explanation",
                ],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    const rawQuestions = parsed.questions || [];

    // Format and sanitize into client QuizQuestion model
    const sanitized = rawQuestions.map((q: any, idx: number) => {
      let correct = String(q.correctAnswer || "A").trim().toUpperCase();
      if (!["A", "B", "C", "D", "E"].includes(correct)) {
        correct = "A";
      }

      return {
        id: `gemini-${Date.now()}-${idx + 1}`,
        question: q.question,
        options: {
          A: q.optionA || "Option A",
          B: q.optionB || "Option B",
          C: q.optionC || "Option C",
          D: q.optionD || "Option D",
          E: q.optionE || "Option E",
        },
        correctAnswer: correct as "A" | "B" | "C" | "D" | "E",
        explanation: q.explanation || "Great question! Keep practicing this topic.",
      };
    });

    if (sanitized.length === 0) {
      throw new Error("No questions were produced by the AI.");
    }

    return res.json({
      success: true,
      source: "gemini",
      questions: sanitized,
    });
  } catch (err: any) {
    console.error("Gemini quiz generation error:", err);
    // Return friendly response instructing client to leverage fallback bank
    return res.json({
      success: true,
      source: "fallback",
      message: "Using Learnly primary school test engine",
      questions: null,
    });
  }
});

// Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Learnly AI Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();

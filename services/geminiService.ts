
import { GoogleGenAI, Type } from "@google/genai";
import { Mission } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateEducationalMission(type: Mission['type'], subject?: string): Promise<Mission> {
  const isDaily = type === 'daily';
  const subjectContext = subject ? `z przedmiotu: ${subject}` : "";
  const questionsCount = isDaily ? 5 : 3;
  const difficulty = isDaily ? "nieco wyższym" : "średnim";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Wygeneruj misję edukacyjną dla dziecka w wieku 10-12 lat typu: ${type} ${subjectContext}. 
               Poziom trudności: ${difficulty}.
               Jeśli to quiz (lub daily), podaj ${questionsCount} pytań z opcjami odpowiedzi.
               Dla 'daily' wymieszaj pytania z logiki, nauki i ciekawostek o świecie.
               Jeśli to kreatywne pisanie lub offline, podaj instrukcję.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctIndex"]
            }
          },
          rewardMinutes: { type: Type.NUMBER }
        },
        required: ["title", "description", "rewardMinutes"]
      }
    }
  });

  const data = JSON.parse(response.text);
  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    type
  };
}

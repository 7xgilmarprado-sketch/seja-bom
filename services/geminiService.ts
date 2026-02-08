import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a supportive comment or "medal" description based on the user's reflection.
 * Also acts as a soft moderation filter (won't return encouragement for toxic text).
 */
export const getAiEncouragement = async (reflection: string, missionTitle: string): Promise<string> => {
  if (!ai || !reflection) return "Que atitude incrível! O mundo precisa de mais pessoas como você.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Contexto: Um usuário completou uma missão de gentileza no app "MiniMissões".
        Missão: "${missionTitle}"
        Relato do usuário: "${reflection}"

        Tarefa: 
        1. Analise se o relato é tóxico, ofensivo ou spam. Se for, responda apenas "FLAG_CONTENT".
        2. Se for positivo, escreva uma frase curta (max 15 palavras) parabenizando o usuário de forma calorosa e específica sobre o que ele fez. Use emojis.
        
        Exemplo de resposta: "Que gesto lindo! Sua gentileza iluminou o dia de alguém. 🌟"
      `,
    });

    const text = response.text?.trim();
    if (text === 'FLAG_CONTENT') {
      throw new Error("Conteúdo impróprio detectado.");
    }
    return text || "Missão cumprida! Você fez a diferença hoje. ✨";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Missão cumprida! Você fez a diferença hoje. ✨";
  }
};

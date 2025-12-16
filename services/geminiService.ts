
import { GoogleGenAI } from "@google/genai";

// Initialize the client once at the module level for efficiency.
// As per guidelines, we assume process.env.API_KEY is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (prompt: string, systemInstruction?: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Simplified to a plain string as per SDK guidelines for simple text prompts.
      contents: prompt,
      ...(systemInstruction && { config: { systemInstruction } }),
    });
    
    const text = response.text;
    if (text) {
      return text;
    }

    return "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, the AI Sherpa is having trouble connecting right now. Please try again.";
  }
};

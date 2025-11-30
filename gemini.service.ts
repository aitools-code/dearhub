
import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: The API key is sourced from environment variables.
    // Ensure `process.env.API_KEY` is available in your deployment environment.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      throw new Error("API_KEY environment variable not set.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateIdeas(topic: string): Promise<string> {
    const prompt = `Brainstorm a list of 5 creative and unique ideas about the following topic: "${topic}". Present them as a simple, unnumbered list, with each idea starting with a hyphen.`;
    
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error('Error generating content from Gemini:', error);
      throw new Error('Failed to fetch ideas from Gemini API.');
    }
  }
}

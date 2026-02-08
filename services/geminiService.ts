import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';
import { Product } from '../types';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

// A helper to serialize the product catalog for the AI to understand what's available
const catalogSummary = PRODUCTS.map(p => `${p.name} (Category: ${p.category}, ID: ${p.id})`).join('\n');

export const smartSearch = async (query: string): Promise<Product[]> => {
  const genAI = getAI();
  if (!genAI) {
    console.warn("Gemini API Key not found, falling back to simple filter");
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }

  try {
    const prompt = `
      You are an intelligent grocery shopping assistant. 
      The user is searching for: "${query}".
      
      Here is the available product catalog:
      ${catalogSummary}
      
      Return a JSON array of the IDs of the products that best match the user's intent.
      If the user asks for a recipe (e.g., "ingredients for pasta"), find the products from the catalog that are needed for that recipe.
      Limit to top 5 most relevant IDs.
      Return ONLY the JSON array of strings, no markdown.
    `;

    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text || "[]";
    const cleanJson = text.replace(/```json|```/g, '').trim();
    const ids: string[] = JSON.parse(cleanJson);

    return PRODUCTS.filter(p => ids.includes(p.id));
  } catch (error) {
    console.error("Gemini search failed:", error);
    // Fallback
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const getRecipeSuggestions = async (products: Product[]): Promise<string> => {
    const genAI = getAI();
    if (!genAI || products.length === 0) return "";

    try {
        const itemNames = products.map(p => p.name).join(', ');
        const prompt = `
            Based on these grocery items in my cart: ${itemNames}.
            Suggest one simple Indian recipe I can make. 
            Keep it under 30 words. Be enthusiastic.
        `;
        
        const response = await genAI.models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: prompt,
        });
        return response.text || "";
    } catch (e) {
        return "";
    }
}
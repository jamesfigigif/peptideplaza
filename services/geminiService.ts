import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../types";

// In-memory cache for generated images to prevent re-generation
const productImageCache = new Map<string, string>();
const moleculeCache = new Map<string, string>();

// Helper to check for API Key
export const ensureApiKey = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }
};

export const askPeptideAssistant = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are an expert biochemist and research assistant for PeptidePlaza. You provide accurate, scientific information about peptides (like BPC-157, TB-500, Semaglutide, etc.). You must always include a disclaimer that these products are for 'Research Purposes Only' and not for human consumption. Be concise, professional, and helpful.",
    },
    history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
  });

  try {
    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I apologize, I couldn't retrieve that information.";
  } catch (error) {
    console.error("Chat failed", error);
    return "System error: Unable to contact research database.";
  }
};

export const generateProductImage = async (peptideName: string): Promise<string> => {
  // Check cache first to avoid re-generating
  if (productImageCache.has(peptideName)) {
    return productImageCache.get(peptideName)!;
  }

  await ensureApiKey();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Specific prompt for Nano Banana (gemini-2.5-flash-image) to match site branding
  const prompt = `Professional product photography of a pharmaceutical glass vial labeled "${peptideName}" containing white lyophilized powder. The vial is sitting on a dark, sleek, reflective surface. The lighting is cinematic, moody, with teal and cyan neon rim lighting to match a cyberpunk medical aesthetic. High resolution, 8k, macro shot, sharp focus on the label, minimalist laboratory background.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        // Save to cache
        productImageCache.set(peptideName, imageUrl);
        return imageUrl;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Product image generation failed", error);
    throw error;
  }
};

export const generateMoleculeVisual = async (
  peptideName: string,
  details: string,
  size: ImageSize
): Promise<string> => {
  const cacheKey = `${peptideName}-${details}-${size}`;
  
  // Check cache
  if (moleculeCache.has(cacheKey)) {
      return moleculeCache.get(cacheKey)!;
  }

  await ensureApiKey();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Generate a stunning, high-tech, scientific 3D visualization of the peptide molecule ${peptideName}. ${details}. The style should be futuristic laboratory, macro photography, with shallow depth of field, neon blue and teal lighting accents, hyper-realistic molecular structure.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "16:9",
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        moleculeCache.set(cacheKey, imageUrl);
        return imageUrl;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Visual generation failed", error);
    throw error;
  }
};
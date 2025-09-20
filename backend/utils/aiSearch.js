import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const smartSearchQuery = async (query) => {
  const prompt = `
    You are a sweet shop assistant. 
    Suggest relevant sweet names or categories for this search query: "${query}".
    Return an array of keywords.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 50,
  });

  const keywords = JSON.parse(response.choices[0].message.content);
  return keywords;
};
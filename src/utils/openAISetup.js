import { createOpenAI } from "@ai-sdk/openai";

export const openAIModelName = "openrouter/openai/gpt-4.1";

export const getOpenAIInstance = () => {
  const baseURL = process.env.NEXT_PUBLIC_LLMLITE_URL;
  const apiKey = process.env.NEXT_PUBLIC_LLMLITE_API_KEY;

  return createOpenAI({
    baseURL,
    apiKey,
  });
};

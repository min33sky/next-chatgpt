import openai from './chatGPT';

interface QueryProps {
  text: string;
  chatId: string;
  model: string;
}

/**
 * ChatGPT query function
 */
export async function queryChatGPT({ chatId, model, text }: QueryProps) {
  try {
    const result = await openai.createCompletion({
      model,
      prompt: text,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return result.data.choices[0].text;
  } catch (error: any) {
    return `ChatGPT was unable to find an answer for that! (Error: ${error.message})`;
  }
}


import { ChatPromptTemplate, HumanMessagePromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from "@langchain/core/runnables";

/**
 * Generates a response from the LLM using the retrieved context.
 * @param {string} context - The retrieved context from the vector store.
 * @param {string} query - The user query or input.
 * @param {Object} llmModel - MistralAI LLM model object from langchain (runnable)
 * @returns {Promise<string>} - The generated response from the model.
 */
export const generateResponse = async (context, query, llmModel) => {
  try {

    // crafting prompt
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", `You are an AI assistant that helps expecting or new mothers. Only respond when the user explicitly asks a question. If the input is a greeting like "Hi," "Hello," or "Hey," respond with a simple greeting back. Do not generate additional questions on your own, however you can answer user's valid questions to the best of your knowledge.`],
      HumanMessagePromptTemplate.fromTemplate("Context: {context} \n Question: {query}")
    ]);

    const chain = RunnableSequence.from([promptTemplate, llmModel]);
  
    const result = await chain.invoke({ context, query });

    // console.log(result)
    // output filtering by trimming response before colon
    const parts = result.split(':');
    return parts.length > 1 ? parts.slice(1).join(':').trim() : result;

  } catch (error) {
    console.error("Error while generating response:", error);
    throw error;
  }
};


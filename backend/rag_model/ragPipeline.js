import { retrieveContext } from './contextRetriever.js';
import { generateResponse } from './responseGenerator.js';

/**
 * RAG pipeline to retrieve context and generate a response.
 * @param {string} query - The user query to be processed.
 * @param {Object} vectorStore - The vector store to retrieve context from.
 * @param {Object} llmModel - MistralAI model object
 * @returns {Promise<string>} - The generated response from the model.
 */
export const ragPipeline = async (query, vectorStore, llmModel) => {
  try {
    // crafting and refining prompt (a.k.a. prompt engineering)
    const questionPattern = /\b(what|how|why|when|where|is|am|me|can|do|does|are|will|could|would|should|did|which|whom|whose|who)\b/i;
    
    if (!questionPattern.test(query)) {
      return "How can I assist you today?";
    }

    // retrieve the context from the vector store based on the query
    const context = await retrieveContext(query, vectorStore);

    // generate a response using the retrieved context and the query
    const response = await generateResponse(context, query, llmModel);

    return response;
  } catch (error) {
    console.error("Error in RAG pipeline:", error);
    throw error;
  }
};
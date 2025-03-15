import { getSplitDocuments } from './loaderSplitter.js'; // Function to load PDF
import { initializeVectorStore } from './embeddingIndexer.js'; // Function to split documents

/**
 * One-time setup to load, split, and store documents in the vector store.
 * @param {string} dataDir - The path to the data directory which contains PDF documents to process.
 * @param {Object} embeddingModel 
 * @returns {Promise<Object>} - The vector store instance.
 */
export const setupVectorStore = async (dataDir, embeddingModel) => {
  try {
    const splitDocs = await getSplitDocuments(dataDir);

    const vectorStore = await initializeVectorStore(splitDocs, embeddingModel);

    return vectorStore;
  } catch (error) {
    console.error("Error in setting up vector store:", error);
    throw error;
  }
};

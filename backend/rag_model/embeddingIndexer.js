import { Chroma } from "@langchain/community/vectorstores/chroma";

export const initializeVectorStore = async (splitDocs, embeddingModel) => {
  try {
    
    // create Chroma vector store
    const vectorStore = new Chroma(
      embeddingModel, 
      { 
        collectionName: "belly-buddy-collection", 
        url: "http://localhost:8000", 
      });

    // index the documents and stores in vector store
    await vectorStore.addDocuments(splitDocs);
    
    return vectorStore;
  } catch (error) {
    console.error("Error while initializing vector store:", error);
    throw error;
  }
};



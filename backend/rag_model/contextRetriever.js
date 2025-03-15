export const retrieveContext = async (query, vectorStore) => {
  try {

    // vector store to perform a similarity search with the query where k represents number of results to be retrieved

    const retriever = vectorStore.asRetriever({ k: 1, searchType: "similarity" });
    const results = await retriever.invoke(query);
    console.log("similarity search result:", results);
    
    return results;
  } catch (error) {
    console.error("Error while retrieving documents:", error);
    throw error;
  }
};


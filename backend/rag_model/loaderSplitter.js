import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const getSplitDocuments = async (dataDir) => {
    try {
      // load all PDFs within the specified directory
      const directoryLoader = new DirectoryLoader(dataDir, {
        ".pdf": (path) => new PDFLoader(path),
      });
  
      const directoryDocs = await directoryLoader.load();
  
      // split text into chunks
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
  
      const splitDocs = await textSplitter.splitDocuments(directoryDocs);
  
      console.log("documents split was successful,", splitDocs[0])
      return splitDocs;
    } catch (error) {
      console.error("Error while processing documents:", error);
      throw error;
    }
  };


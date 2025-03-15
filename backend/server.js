import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { MistralAIEmbeddings, MistralAI } from "@langchain/mistralai";
import { setupVectorStore } from './rag_model/setupVectorStore.js';
import { ragPipeline } from './rag_model/ragPipeline.js';
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

dotenv.config(); // Load environment variables
const apiKey = process.env.MISTRAL_API_KEY;

const llmModel = new MistralAI({ apiKey: apiKey });

// initialize Mistral AI Embeddings
const embeddingModel = new MistralAIEmbeddings({ model: "mistral-embed" });

const history = new ChatMessageHistory();

const app = express();

const dataDir = './data';
let vectorStore;

import bodyParser from 'body-parser';

app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: 102410241024,
    extended: true
}));
app.use(cors()); // Enable CORS

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


/* API endpoint that processes a user's message using a RAG pipeline to generate a response */
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await ragPipeline(message, vectorStore, llmModel, embeddingModel);

        res.json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* API endpoint that generates a response using the Mistral AI language model */
app.post("/chat-llm", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await llmModel.chat.complete({
            model: "mistral-large-latest",
            messages: [{ role: "system", content: "You are a helpful chatbot. Keep every response concise and not more than 2-3 sentences. Don't make up questions on your own. If user don't ask a question, ask them again how can you help!" },
            { role: "user", content: message }]
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// initialize vector store once when the server starts
(async () => {
    try {
        await history.clear();
        console.log((await history.getMessages()).length)
        vectorStore = await setupVectorStore(path.resolve(dataDir), embeddingModel);
        console.log("Vector store initialized successfully");

        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to initialize vector store:", error);
        process.exit(1);
    }
})();
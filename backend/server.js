const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Mistral } = require('@mistralai/mistralai');

dotenv.config(); // Load environment variables
const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

const app = express();

const bodyParser = require('body-parser');
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

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await client.chat.complete({
            model: "mistral-large-latest",
            messages: [{ role: "system", content: "You are a helpful chatbot. Keep every response concise and not more than 2-3 sentences." },
            { role: "user", content: message }]
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import axios from "axios";

class ActionProvider {
    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }

    // Function to send request to OpenAI API defined as backend API and handle response from the same
    async handleOpenAIResponse(message) {
        try {
            this.createClientMessage(message);
            const response = await axios.post("http://127.0.0.1:5000/chat", {
                message,
            });
            const botMessage = this.createChatBotMessage(response.data.reply);

            // Update the state with the new bot message
            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, message, botMessage],
            }));
        } catch (error) {
            console.error("Error fetching response from OpenAI:", error);
        }
    }
}

export default ActionProvider;
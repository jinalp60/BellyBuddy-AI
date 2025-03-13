import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [createChatBotMessage(`Hello! I'm BellyBuddy AI, here to help you with all things related to pregnancy, motherhood and newborn care. How can I assist you today?`)],
  botName: "BellyBuddy",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#f1f1f1",
      textAlign: "left", 
    
    },
    botAvatar: {
      width: "40px",               
      height: "40px",              
      marginRight: "10px",     
    },
    chatButton: {
      backgroundColor: "#800080", 
    },
  }
}

export default config
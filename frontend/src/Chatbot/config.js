import { createChatBotMessage } from "react-chatbot-kit";
const config = {
  initialMessages: [createChatBotMessage(`Hello! I'm BellyBuddy AI, here to help you with all things related to pregnancy, motherhood and newborn care. How can I assist you today?`)],
  botName: "BellyBuddy",
  customComponents: {
    botMessageBox: {
      backgroundColor: "#f1f1f1",
      textAlign: "left", 
    
    },
    userAvatar: () => (
      <div
        style={{
          backgroundColor: '#892bd7',
          color: '#fff',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          marginLeft: "10px",  
        }}
      >
        U
      </div>
    ),
    botAvatar: (props) => (
      <img
        src="bellybuddy-logo-892bd7.png"
        alt="Bot"
        style={{
          height: '45px',
          width: '45px',
          borderRadius: '50%',
          objectFit: 'cover',  
          marginRight: "10px",  
        }}
      />
    ),
    userInput: ({ onChange, onKeyDown, value }) => (
      <input
        className="react-chatbot-kit-chat-input"
        placeholder="Ask me anything about your baby, pregnancy or self-care ..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    ),
    chatButton: {
      backgroundColor: "#800080", 
    }
  }
}

export default config
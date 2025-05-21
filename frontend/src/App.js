import MyChatbot from "./Chatbot/Chatbot";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-icon"><img src="/bellybuddy-logo.png" alt="Logo" style={{ width: '100%', height: '100px' }} /></div>
          <h1 className="app-title">BellyBuddy AI</h1>
        </div>
      </header>

      <main className="chat-area">
        <div className="chat-container">
          <MyChatbot />
        </div>
      </main>
    </div>
  );
}

export default App;

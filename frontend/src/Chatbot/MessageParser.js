class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      this.actionProvider.handleOpenAIResponse(message);
    }
  }
  
  export default MessageParser;

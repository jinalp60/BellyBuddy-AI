import React, { useState } from "react";
import { Chatbot } from "react-chatbot-kit";

import "react-chatbot-kit/build/main.css";
import styles from './Chatbot.module.css';
import '../App.css'

import config from "./config"
import MessageParser from "./MessageParser"
import ActionProvider from "./ActionProvider";


const MyChatbot = () => {

  const [state, setState] = useState({
    messages: config.initialMessages,
  });

  return (
    <div className={styles.Chatbot}>
      <Chatbot 
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        state={state}
        setState={setState}
      />
      </div>
  );
};

export default MyChatbot;

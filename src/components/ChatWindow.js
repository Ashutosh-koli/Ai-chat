import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';

function ChatWindow({ chat, setChats, chatId }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = process.env.REACT_APP_GROQ_API_KEY;

  useEffect(() => {
    console.log('Loaded API Key:', apiKey); // Debug here
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    const updatedMessages = [...chat.messages, userMessage];

    updateChatMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const formattedMessages = updatedMessages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    if (!apiKey) {
      console.error('Missing API key. Please check your .env file.');
      alert('Missing API Key. Make sure you added REACT_APP_GROQ_API_KEY in .env and restarted the app.');
      updateChatMessages([
        ...updatedMessages,
        { text: '⚠️ Missing API Key. Cannot connect to Groq.', sender: 'bot' },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: formattedMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botReply = response.data?.choices?.[0]?.message?.content?.trim();
      const botMessage = { text: botReply || '⚠️ No response from Groq.', sender: 'bot' };
      updateChatMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Groq API Error:', error.response?.data || error.message);
      updateChatMessages([
        ...updatedMessages,
        { text: '⚠️ Error: Failed to get response from AI.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateChatMessages = (newMessages) => {
    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chatId ? { ...c, messages: newMessages } : c))
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) return <div className="chat-window">Select a chat to begin</div>;

  return (
    <div className="chat-window">
      <div className="messages">
        {chat.messages.map((msg, idx) => (
          <Message key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {isTyping && <div className="typing">System is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;

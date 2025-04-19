import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [chats, setChats] = useState(() => {
    const storedChats = localStorage.getItem('chats');
    return storedChats ? JSON.parse(storedChats) : [{ id: 'chat1', name: 'Chat 1', messages: [] }];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem('activeChatId') || 'chat1';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('activeChatId', activeChatId);
  }, [activeChatId]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        setChats={setChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
      <ChatWindow
        chat={chats.find((chat) => chat.id === activeChatId)}
        setChats={setChats}
        chatId={activeChatId}
      />
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

function Sidebar({ chats, setChats, activeChatId, setActiveChatId }) {
  const [editingChatId, setEditingChatId] = useState(null);
  const [newName, setNewName] = useState('');
  const [deletingChatId, setDeletingChatId] = useState(null);

  const addChat = () => {
    const newId = `chat-${Date.now()}`;
    const newChat = { id: newId, name: 'New Chat', messages: [] };
    setChats((prev) => [...prev, newChat]);
    setActiveChatId(newId);
  };

  const confirmDeleteChat = (id) => {
    setDeletingChatId(id);
  };

  const cancelDeleteChat = () => {
    setDeletingChatId(null);
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);

    if (activeChatId === id) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id); // Set to the first chat if any
      } else {
        setActiveChatId(null); // No chats left, so set to null
      }
    }
    setDeletingChatId(null); // Reset deletion state
  };

  const startEditing = (chat) => {
    setEditingChatId(chat.id);
    setNewName(chat.name);
  };

  const saveRename = () => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === editingChatId ? { ...chat, name: newName } : chat
      )
    );
    setEditingChatId(null);
  };

  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <button onClick={addChat}>＋ New Chat</button>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={chat.id === activeChatId ? 'active' : ''}
            onClick={() => setActiveChatId(chat.id)}
          >
            {editingChatId === chat.id ? (
              <div>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={saveRename}>Save</button>
              </div>
            ) : (
              <div>
                {chat.name}
                <button onClick={() => startEditing(chat)}>✏️</button>
                {deletingChatId === chat.id ? (
                  <div>
                    <button onClick={() => deleteChat(chat.id)}>Confirm Delete</button>
                    <button onClick={cancelDeleteChat}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => confirmDeleteChat(chat.id)}>🗑️</button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="settings">⚙️ Settings</div>
    </div>
  );
}

export default Sidebar;

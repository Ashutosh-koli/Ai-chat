import React from 'react';

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <strong>{sender === 'user' ? 'You' : 'AI'}:</strong> {text}
    </div>
  );
}

export default Message;

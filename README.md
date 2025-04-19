# ChatGPT Clone using ReactJS, JavaScript, HTML, CSS, and Groq AI

This project is a basic ChatGPT clone built with the following technologies:

- **Frontend**: ReactJS, JavaScript, HTML, CSS
- **AI Backend**: Groq AI (via API)

## Features

- Interactive chat interface
- AI-powered responses using Groq API
- Responsive design for desktop and mobile

## Prerequisites

- Node.js and npm installed
- Groq AI API key (get one from https://groq.com)

## Installation

1. **Clone the repository**

```bash
https://github.com/yourusername/chatgpt-clone-groq.git
cd chatgpt-clone-groq
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

Create a `.env` file in the root directory and add your Groq API key:

```
REACT_APP_GROQ_API_KEY=your_api_key_here
```

4. **Start the development server**

```bash
npm start
```

The app will run at `http://localhost:3000`.



## API Integration (Groq AI)

Use `fetch` or `axios` to send a POST request to the Groq AI endpoint. Example:

```javascript
const response = await fetch("https://api.groq.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: "groq-1", // Adjust model name based on availability
    messages: [
      { role: "user", content: userMessage },
    ],
  }),
});
```

## Styling

Modify `App.css` or create separate CSS modules for better component-level styling. Ensure mobile responsiveness with media queries or use a CSS framework like Tailwind or Bootstrap.

## Deployment

You can deploy this app using Vercel, Netlify, or GitHub Pages.

```bash
npm run build
```

## License

MIT


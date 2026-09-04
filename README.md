# AI Chatbot Backend

A Node.js and Express backend that powers an AI chatbot by connecting user prompts to a Large Language Model (LLM) through the Hugging Face Inference API.

The backend receives requests from the chatbot frontend, processes user prompts, sends them to the configured language model, and returns the generated response.

## Features

* REST API built with Node.js and Express
* Connects the chatbot frontend to a Hugging Face language model
* Accepts and processes user prompts
* Generates AI-powered responses
* Supports configurable response length
* Uses environment variables for secure API token management
* Configures CORS for frontend-backend communication
* Validates incoming requests
* Handles model inference errors

## Tech Stack

* Node.js
* Express.js
* JavaScript
* Hugging Face Inference API
* Large Language Models (LLMs)
* node-fetch
* dotenv
* CORS

## Project Architecture

```text
AI Chatbot Frontend
        │
        │ User Prompt
        ▼
Express Backend API
        │
        │ Inference Request
        ▼
Hugging Face API
        │
        ▼
Large Language Model
        │
        │ Generated Response
        ▼
Express Backend
        │
        ▼
AI Chatbot Frontend
```

## Project Structure

```text
ai-chatbot-backend/
├── server.js
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/betty1-3/ai-chatbot-backend.git
cd ai-chatbot-backend
```

Install the required dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
HF_TOKEN=your_huggingface_token
PORT=3000
```

> Never commit your `.env` file or API tokens to GitHub.

You can use `.env.example` as a reference for the required environment variables.

## Running the Application

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

The server will run on the configured port.

By default:

```text
http://localhost:3000
```

## API Endpoint

### Ask the Language Model

**POST**

```text
/api/ask-llm
```

### Request Body

```json
{
  "prompt": "Explain artificial intelligence in simple words.",
  "max_tokens": 512
}
```

### Request Flow

1. The frontend sends a user prompt to the backend.
2. The backend validates the request.
3. The prompt is sent to the configured Hugging Face language model.
4. The model generates a response.
5. The backend processes the result.
6. The generated response is returned to the chatbot frontend.

## Error Handling

The API handles common errors such as:

* Missing prompts
* Invalid requests
* Missing API configuration
* Model inference failures
* Network errors

## Related Project

This backend is designed to work with the AI Chatbot frontend.

Frontend repository:

```text
AI Chatbot Frontend
```

Together, the frontend and backend form a full-stack AI chatbot application.

## Future Improvements

* Improve validation for request parameters
* Add rate limiting
* Improve handling of different model response formats
* Add API health checks
* Add structured logging
* Add automated tests
* Add Docker support
* Support multiple language models
* Improve response validation

## Author

GitHub: [@betty1-3](https://github.com/betty1-3)

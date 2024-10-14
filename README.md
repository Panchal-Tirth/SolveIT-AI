# SolveIT-AI

SolveIT-AI is a web-based application that leverages Generative AI and prompt engineering to solve mathematical expressions and provide descriptions for anything drawn on the screen. The project is built using React with TypeScript for the frontend and Python (FastAPI) for the backend.

## Features

- **Hand-drawn Expression Recognition**: Users can draw mathematical expressions on a canvas, which are then processed to provide solutions.
- **Generative AI for Descriptions**: The AI can also generate descriptions of any non-mathematical drawings.
- **Latex Rendering**: Mathematical expressions are rendered in real-time on the canvas using LaTeX.
- **Interactive Canvas**: Users can draw, reset the canvas, and choose colors.
- **Prompt Engineering**: The backend leverages prompt engineering to process and understand the user's input efficiently.

## Tech Stack

- **Frontend**: React, TypeScript, Mantine, Axios
- **Backend**: FastAPI, Python, OpenAI/GPT models
- **API Integration**: GEMINI API for solving complex problems and providing AI-generated content.

## Setup

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- Yarn or npm for managing frontend dependencies

### Environment Variables

1. **Backend (calc-be/.env)**:
   - `GEMINI_API_KEY`: Your API key for GEMINI API.

2. **Frontend (calc-fe/.env)**:
   - `VITE_API_URL`: The URL pointing to the backend FastAPI server.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/SolveIT-AI.git
   cd SolveIT-AI

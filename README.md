# ✨ SolveIT-AI ✨

SolveIT-AI is a web-based application that leverages **Generative AI** and **prompt engineering** to solve mathematical expressions ✏️ and provide descriptions for anything drawn on the screen 🎨. The project is built using **React** with **TypeScript** for the frontend and **Python (FastAPI)** for the backend.

## 🚀 Features

- ✍️ **Hand-drawn Expression Recognition**: Users can draw mathematical expressions on a canvas, which are then processed to provide solutions.
- 🤖 **Generative AI for Descriptions**: The AI generates descriptions of any non-mathematical drawings.
- 📐 **LaTeX Rendering**: Mathematical expressions are rendered in real-time using LaTeX.
- 🎨 **Interactive Canvas**: Users can draw, reset the canvas, and choose colors to enhance the drawing experience.
- 🧠 **Prompt Engineering**: The backend leverages prompt engineering to efficiently process and understand the user's input.

## 🛠️ Tech Stack

- **Frontend**: React ⚛️, TypeScript 🟦, Mantine 🎨, Axios 🌐
- **Backend**: FastAPI 🐍, Python 🧑‍💻, OpenAI/GPT models 🤖
- **API Integration**: GEMINI API 🔑 for solving complex problems and providing AI-generated content.

## ⚙️ Setup

### Prerequisites

- 🟩 **Node.js** (v14+)
- 🐍 **Python** (v3.8+)
- 📦 **Yarn** or **npm** for managing frontend dependencies

### 🌍 Environment Variables

1. **Backend (`calc-be/.env`)**:
   - `🔑 GEMINI_API_KEY`: Your API key for the GEMINI API.

2. **Frontend (`calc-fe/.env`)**:
   - `🌐 VITE_API_URL`: The URL pointing to the backend FastAPI server.

### 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/SolveIT-AI.git
   cd SolveIT-AI

2. **Backend Setup (FastAPI)**:
   - Navigate to the `calc-be` folder:
     ```bash
     cd calc-be
     ```
   - Install the required Python modules:
     ```bash
     pip install -r requirements.txt
     ```
   - Create an `.env` file in `calc-be` and add your GEMINI API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```
   - Run the backend server:
     ```bash
     uvicorn main:app --reload
     or
     python main.py
     ```

     The backend should now be running at `http://localhost:8000`.
3. **Frontend Setup (React)**:
   - Navigate to the `calc-fe` folder:
     ```bash
     cd calc-fe
     ```
   - Install the dependencies:
     ```bash
     yarn install
     ```
     or
     ```bash
     npm install
     ```
   - Create a `.env` file in `calc-fe` and add the backend API URL:
     ```
     VITE_API_URL=http://localhost:8000
     ```
   - Run the frontend:
     ```bash
     yarn dev
     ```
     or
     ```bash
     npm run dev
     ```

     The frontend should now be running at `http://localhost:3000`.

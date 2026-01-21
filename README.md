# AI-First CRM HCP Module 🏥💊

## 📌 Project Overview
This project is an AI-first Customer Relationship Management (CRM) system designed specifically for the Life Sciences industry. [cite_start]It focuses on the **Healthcare Professional (HCP) module**, providing a "Log Interaction Screen" that allows Field Representatives to log meeting details via a structured form or a conversational AI interface[cite: 7, 9, 12].

[cite_start]The system uses a **LangGraph** agent to intelligently process natural language, extract entities (like Doctor Name, Sentiment, and Date), and automate data entry, reducing the cognitive load on representatives[cite: 15].

## 🛠️ Tech Stack
* [cite_start]**Frontend:** React.js, Redux (State Management), Tailwind CSS.
* [cite_start]**Backend:** Python, FastAPI.
* [cite_start]**AI Framework:** LangGraph (Agentic Workflow)[cite: 15].
* [cite_start]**LLM Engine:** Groq API (Model: `gemma2-9b-it` / `llama-3.3-70b-versatile`)[cite: 16, 18].
* [cite_start]**Database:** SQLite (Development) / Compatible with PostgreSQL & MySQL[cite: 19].
* [cite_start]**Font:** Google Inter[cite: 20].

## 🤖 LangGraph Agent & Tools
[cite_start]The core of this application is an AI Agent capable of using **5 specific tools** to assist the user[cite: 62].

### [cite_start]Mandatory Tools [cite: 63]
1.  **`Log Interaction`**: Captures interaction data from natural language (e.g., *"Met Dr. Smith, he was positive"*). [cite_start]It extracts the HCP Name, Date, Sentiment, and Topics automatically[cite: 64].
2.  [cite_start]**`Edit Interaction`**: Allows the user to modify logged data via chat commands (e.g., *"Change the date to tomorrow"*) without rewriting the form[cite: 66].

### Additional Tools
3.  **`Product Info`**: Retrieves specific dosage and efficacy details for pharmaceutical products (e.g., *"What is the dosage for CardioFix?"*).
4.  **`HCP Search`**: Queries the database to retrieve past interaction history for specific doctors.
5.  **`Schedule Follow-up`**: Detects future intent in the conversation and schedules follow-up actions automatically.

## 🚀 Installation & Setup

### Prerequisites
* Node.js & npm
* Python 3.9+
* Groq API Key

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt


Create a .env file in the backend/ folder and add your API credentials:

GROQ_API_KEY = your_api_key_here


Run the FastAPI server:
python -m uvicorn app.main:app --reload
---------------------------------------------------------------------------------------

2. Frontend Setup

cd frontend
npm install
npm run dev

📂 Architecture Flow
User Input: The user speaks or types into the Chat Interface.

Redux Sync: The frontend state is managed via Redux, ensuring the Chat and Form stay synchronized.

API Layer: The FastAPI backend receives the request.

Agent Decision: The LangGraph agent analyzes the intent and routes the query to the correct tool (Log, Edit, Search, etc.).

LLM Processing: Groq processes the text for entity extraction and summarization.

Persistence: Data is committed to the database.
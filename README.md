# Transformer-Based Text Summarization
hehe1
## 🚀 Quick Start

### 1. Clone & Setup
```powershell
git clone https://github.com/your-repo/transformer-summarizer.git
cd transformer-summarizer

# Backend
cd backend
python -m venv env
.\env\Scripts\Activate
pip install flask flask-cors openai pymupdf python-dotenv

# Frontend
cd ..\frontend
npm install
2. Run Application
powershell
# Terminal 1 (Backend)
cd backend
.\env\Scripts\Activate
python app.py

# Terminal 2 (Frontend)
cd ..\frontend
npm start
📌 Key Requirements
Python Packages:

bash
pip install flask flask-cors openai pymupdf python-dotenv
Node.js: v16+

VS Code Extensions (Recommended):

Python

ESLint

Prettier

🌐 Access
Frontend: http://localhost:3000

Backend API: http://localhost:5000

⚠️ Troubleshooting
If pip install fails:

bash
python -m pip install --upgrade pip
React errors:

bash
cd frontend
rm -rf node_modules package-lock.json
npm install

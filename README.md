# CodeRefine AI - Generative AI Powered Code Review & Optimization Engine

A production-ready hackathon prototype that performs AI-powered code analysis and rewriting using Groq LLM inference. The system allows users to paste source code, analyze it with an LLM, detect issues, classify severity, and generate optimized rewritten code.

## 🚀 Features

- **AI-Powered Code Review**: Professional software engineering feedback using Groq's Llama 3.3 70B model
- **Multi-Language Support**: Python, JavaScript, Java, and C++
- **Issue Detection**: Bugs, security vulnerabilities, performance issues, and best practice violations
- **Severity Classification**: Critical, High, Medium, and Low severity levels
- **Code Optimization**: AI-generated optimized code with side-by-side comparison
- **Modern UI**: Clean, responsive interface with TailwindCSS
- **Syntax Highlighting**: Powered by Highlight.js
- **Markdown Rendering**: Formatted explanations using Marked.js
- **Export Options**: Copy and download optimized code

## 🏗️ Architecture

### Backend (FastAPI)
- **FastAPI**: Modern, fast web framework for building APIs
- **Groq Integration**: Llama 3.3 70B model for AI analysis
- **Structured Prompts**: Professional code review templates
- **Error Handling**: Comprehensive error management
- **Health Checks**: API endpoint monitoring

### Frontend (Vanilla JavaScript)
- **TailwindCSS**: Utility-first CSS framework
- **Highlight.js**: Syntax highlighting for multiple languages
- **Marked.js**: Markdown parsing and rendering
- **Lucide Icons**: Beautiful icon system
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend
- Python 3.8+
- FastAPI 0.104.1
- Uvicorn 0.24.0
- Groq 0.5.0
- python-dotenv 1.0.0
- Pydantic 2.5.0

### Frontend
- HTML5
- TailwindCSS (CDN)
- Vanilla JavaScript
- Highlight.js 11.9.0
- Marked.js
- Lucide Icons

### AI Integration
- Groq API
- Llama 3.3 70B model
- Custom prompt engineering

## 📁 Project Structure

```
code-refine-ai/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── ai_engine.py         # Groq AI integration
│   ├── prompts.py           # Prompt templates
│   ├── requirements.txt     # Python dependencies
│   └── .env.example        # Environment variables template
├── frontend/
│   ├── index.html           # Main HTML interface
│   ├── script.js            # Frontend JavaScript
│   └── style.css            # Custom CSS styles
└── README.md               # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Groq API key (get from [console.groq.com](https://console.groq.com))
- Modern web browser

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-refine-ai
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   ```bash
   # Copy the example file
   copy .env.example .env
   
   # Edit .env and add your Groq API key
   # GROQ_API_KEY=your_actual_api_key_here
   ```

6. **Start the backend server**
   ```bash
   uvicorn main:app --reload
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Open the HTML file in your browser**
   ```bash
   # Option 1: Double-click index.html
   # Option 2: Use a local server
   python -m http.server 3000
   ```

   The frontend will be available at `http://localhost:3000` (if using a server)

## 📖 Usage

1. **Open the web application** in your browser
2. **Select programming language** from the dropdown
3. **Paste your source code** in the code editor
4. **Click "Analyze Code"** to run AI review
5. **View results**:
   - Issues found with severity levels
   - Detailed explanations
   - Best practices suggestions
6. **Compare code** in the side-by-side view
7. **Copy or download** the optimized code

## 🔧 API Endpoints

### POST /review
Analyzes code and returns AI review results.

**Request Body:**
```json
{
    "code": "your source code here",
    "language": "python|javascript|java|cpp"
}
```

**Response:**
```json
{
    "success": true,
    "issues_found": "Line Number | Issue | Severity | Fix\n...",
    "explanation": "Detailed explanation of issues...",
    "optimized_code": "Optimized version of the code...",
    "best_practices": "Best practices suggestions..."
}
```

### GET /health
Health check endpoint to verify API status.

**Response:**
```json
{
    "status": "healthy",
    "groq_configured": true
}
```

## 🎯 Example Usage

### Python Code Example
```python
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total

result = calculate_sum([1, 2, 3, 4, 5])
print(result)
```

**AI Review Results:**
- **Issues Found**: Inefficient loop, missing input validation
- **Optimized Code**: Uses built-in `sum()` function with validation
- **Best Practices**: Type hints, docstrings, error handling

### JavaScript Code Example
```javascript
function findMax(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
```

**AI Review Results:**
- **Issues Found**: Uses `var` instead of `const/let`, no input validation
- **Optimized Code**: Uses `Math.max()` with spread operator
- **Best Practices**: Modern ES6+ syntax, parameter validation

## 🛡️ Error Handling

The application handles various error scenarios:

- **Empty code input**: Validation with user-friendly messages
- **Invalid API key**: Clear error instructions
- **Groq API failures**: Network error handling
- **Timeout errors**: Graceful degradation
- **Unsupported languages**: Validation with supported options

## 🎨 UI Features

- **Dark theme**: Easy on the eyes for long coding sessions
- **Responsive design**: Works on desktop and mobile
- **Syntax highlighting**: Language-specific code coloring
- **Severity indicators**: Color-coded issue severity
- **Copy buttons**: One-click code copying
- **Download functionality**: Save optimized code locally
- **Loading states**: Visual feedback during analysis
- **Keyboard shortcuts**: Ctrl+Enter to analyze, Escape to clear

## 🔮 Advanced Features (Future)

- **GitHub Integration**: Analyze entire repositories
- **Batch Processing**: Analyze multiple files
- **Code Metrics**: Complexity analysis and scoring
- **Team Collaboration**: Share reviews with team members
- **Custom Rules**: Configure custom review rules
- **Export Reports**: Generate PDF/HTML reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Groq** for providing the powerful Llama 3.3 70B model
- **FastAPI** for the excellent web framework
- **TailwindCSS** for the utility-first CSS framework
- **Highlight.js** for syntax highlighting
- **Marked.js** for markdown parsing

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🚀 Quick Start Commands

```bash
# Backend setup
cd code-refine-ai/backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your Groq API key
uvicorn main:app --reload

# Frontend (in separate terminal)
cd code-refine-ai/frontend
python -m http.server 3000

# Open browser
# Navigate to http://localhost:3000
```

## 🎯 Hackathon Tips

- **Demo Preparation**: Prepare code examples that showcase different issue types
- **API Key**: Have your Groq API key ready before the demo
- **Network**: Ensure stable internet connection for API calls
- **Browser**: Use a modern browser (Chrome, Firefox, Safari)
- **Examples**: Have sample code ready for Python, JavaScript, Java, and C++

---

**Built with ❤️ for hackathon innovation**

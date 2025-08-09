import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("text");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (mode === "text" && !text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }
    if (mode === "pdf" && !file) {
      setError("Please upload a PDF file");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary("");

    try {
      let res;
      if (mode === "text") {
        res = await axios.post("http://localhost:5000/summarize/text", { 
          text: text
        });
      } else {
        const formData = new FormData();
        formData.append("file", file);
        res = await axios.post("http://localhost:5000/summarize/pdf", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSummary(formatSummary(res.data.summary));
    } catch (err) {
      console.error("Summarization error:", err);
      setError(err.response?.data?.message || "Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatSummary = (summaryText) => {
    if (!summaryText) return null;
    
    const sentences = summaryText.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    const paragraphs = [];
    
    for (let i = 0; i < sentences.length; i += 4) {
      paragraphs.push(sentences.slice(i, i + 4).join(' '));
    }

    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <p className="summary-paragraph">{paragraph}</p>
        {index < paragraphs.length - 1 && <div className="paragraph-spacing" />}
      </React.Fragment>
    ));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTextChange = (e) => setText(e.target.value);

  return (
    <div className="app">
      <img src="/torreens.jpg" alt="Torrens University" className="university-logo"/>
      <h1>Transformer-Based Text Summarization<br />(Text & PDF)</h1>

      <div className="mode-buttons">
        <button className={mode === "text" ? "active" : ""} onClick={() => setMode("text")}>
          Text
        </button>
        <button className={mode === "pdf" ? "active" : ""} onClick={() => setMode("pdf")}>
          PDF
        </button>
      </div>

      {mode === "text" ? (
        <textarea
          placeholder="Paste your text here..."
          rows={10}
          value={text}
          onChange={handleTextChange}
          disabled={loading}
        />
      ) : (
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={loading}
        />
      )}

      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {summary && (
        <div className="summary">
          <h2>📝 Summary</h2>
          <div className="summary-content">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
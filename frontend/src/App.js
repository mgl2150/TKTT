import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchQuote, setSearchQuote] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/quotes");
      const data = await response.json();
      setQuotes(data.quotes);
      setFilteredQuotes(data.quotes); 
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const handleSearch = () => {
    const termAuthor = searchAuthor.toLowerCase();
    const termQuote = searchQuote.toLowerCase();
    const filtered = quotes.filter(
      (quote) =>
        quote.author.toLowerCase().includes(termAuthor) &&
        quote.quote.toLowerCase().includes(termQuote)
    );
    setFilteredQuotes(filtered);
  };

  const handleResetSearch = () => {
    setSearchAuthor("");
    setSearchQuote("");
    setFilteredQuotes(quotes); 
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(quotes);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "quotes.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ padding: "1rem" }}>Quotes</h1>

      <div>
        <input
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by quote"
          value={searchQuote}
          onChange={(e) => setSearchQuote(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleResetSearch}>Reset Search</button>
        <button onClick={downloadJSON}>Download JSON</button>
      </div>
      <ul>
        {filteredQuotes
          .slice(0, 99)
          .map((quote, index) => (
            <li key={index}>
              <strong>{quote.author}:</strong> {quote.quote}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

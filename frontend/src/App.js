import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/quotes");
      const data = await response.json();
      setQuotes(data.quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const handleSearch = () => {
    const filteredQuotes = quotes.filter((quote) =>
      quote.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setQuotes(filteredQuotes);
  };

  const handleResetSearch = () => {
    setSearchAuthor("");
    fetchQuotes();
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
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleResetSearch}>Reset Search</button>
      </div>
      <ul>
        {quotes
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

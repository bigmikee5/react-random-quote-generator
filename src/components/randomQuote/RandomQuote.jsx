import React, { useState, useEffect } from "react";
import "./RandomQuote.css";
import generateIcon from "../assets/generate.png";
import twitterIcon from "../assets/twitter.png";

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "The Lord is good, and His mercies endure forever.",
    author: "Psalms of David",
  });

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    }

    fetchQuotes();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const shareOnTwitter = () => {
    const twitterText = `${quote.text} - ${quote.author.split(",")[0]}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      twitterText
    )}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">- {quote.author.split(",")[0]}</div>
          <div className="icons">
            <img
              src={generateIcon}
              alt="Generate Quote"
              onClick={getRandomQuote}
            />
            <img
              src={twitterIcon}
              alt="Share on Twitter"
              onClick={shareOnTwitter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;

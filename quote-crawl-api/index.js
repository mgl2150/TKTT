const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); 
const app = express();
const port = 3001;


app.use(cors());

async function crawlQuotes(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);

    const result = await page.evaluate(() => {
      const quoteElements = document.querySelectorAll('.wrap-block .title');
      const authorElements = document.querySelectorAll('.wrap-block .author');

      const quotes = Array.from(quoteElements, (quoteElement, index) => {
        const quote = quoteElement.textContent.trim();
        const author = authorElements[index] ? authorElements[index].textContent.trim() : '';
        return { quote, author };
      });

      return quotes;
    });

    return result;
  } catch (error) {
    console.error('Error during page navigation or extraction:', error);
    return [];
  } finally {
    await browser.close();
  }
}

app.get('/api/quotes', async (req, res) => {
  try {
    const quotesArray = await crawlQuotes('https://www.azquotes.com/top_quotes.html');
    res.json({ quotes: quotesArray });
  } catch (error) {
    console.error('Error crawling quotes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
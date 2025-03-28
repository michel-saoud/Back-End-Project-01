const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
}
);

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
}
);

app.get('/api/quotes', (req, res) => {  
    const { person } = req.query;
    let filteredQuotes = quotes;

    if (person) {
        filteredQuotes = quotes.filter((quote) => quote.person === person);
    }

    res.send({ quotes: filteredQuotes });
});

app.post('/api/quotes', (req, res) => { 
    const { quote, person } = req.query;

    if (!quote || !person) {
        return res.status(400).send({ error: 'Quote and person are required' });
    }

    const newQuote = {
        quote,
        person
    };

    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
}
);  
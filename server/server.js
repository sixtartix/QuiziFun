const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

let questions = [];

app.post('/add-question', (req, res) => {
    const { theme, question, answers, correctOption } = req.body;
    questions.push({ theme, question, answers, correctOption });
    res.sendStatus(200);
});

app.get('/questions', (req, res) => {
    res.json(questions);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

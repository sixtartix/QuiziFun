const express = require('express');
const app = express();
const port = 3000;
const { SerialPort } = require('serialport');
const { Readline } = require('@serialport/parser-readline');

app.use(express.static('public'));
app.use(express.json());

let questions = [];
let arduinoConnected = false;

const serialPort = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));

parser.on('data', data => {
    console.log('Data from Arduino:', data);
    arduinoConnected = true;
});

serialPort.on('open', () => {
    console.log('Serial Port Opened');
    arduinoConnected = true;
});

serialPort.on('error', err => {
    console.error('Error: ', err.message);
    arduinoConnected = false;
});

app.post('/add-question', (req, res) => {
    const { theme, question, answers, correctOption } = req.body;
    questions.push({ theme, question, answers, correctOption });
    res.status(200).json({ message: 'Question added successfully' });
});

app.get('/questions', (req, res) => {
    res.json(questions);
});

app.get('/arduino-status', (req, res) => {
    res.json({ connected: arduinoConnected });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

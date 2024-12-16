const { SerialPort } = require('serialport');
const { Readline } = require('@serialport/parser-readline');

const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

parser.on('data', data => {
    console.log('Data from Arduino:', data);
    // Vous pouvez envoyer cette information au frontend via WebSockets ou autre
});

port.on('open', () => {
    console.log('Serial Port Opened');
    // Vous pouvez envoyer cette information au frontend via WebSockets ou autre
});

port.on('error', err => {
    console.error('Error: ', err.message);
});

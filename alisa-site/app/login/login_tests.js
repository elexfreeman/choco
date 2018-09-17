var Login = require('./login');

Login.generateSmsPass('4747474').then(resp => console.log(resp)).catch(e => console.log(e));


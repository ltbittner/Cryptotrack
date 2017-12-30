const fs = require('fs');
const prompt = require('prompt');
const Handlebars = require('handlebars');
prompt.start();

prompt.get([
  'apiKey',
  'authDomain',
  'databaseURL',
  'projectId',
  'messagingSenderId'
], (err, result) => {
  fs.readFile('../templates/config.txt', 'utf-8', (err, text) => {
    const template = Handlebars.compile(text);
    const final = template(result);
    fs.writeFile('../src/firebase/config.js', final, () => {
      
    })
  });
});



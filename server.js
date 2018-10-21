const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/*
  El orden en los middleware es importante
*/

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log("Unbake to append to file");
    }
  });
  next();
});

// maintance page
// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// });

// Esto es para servir la carpeta public al servidor y poder accederlo desde el fronend desde la ruta.
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send("<h1>Hello World</h1>");
  // res.send({ name: "Zeshan", likes: ["hola", "demo", "demo 1"] });
  res.render('home.hbs', {
    name: "Home PageH",
    welcomeMessage: 'Welcome to my website brah!!'
  })
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    name: "About PageA",
  });
})

app.get('/bad', (req, res) => {
  res.send({
    status: 404,
    errorMessage: 'Resource not found',
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
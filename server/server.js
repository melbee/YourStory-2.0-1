// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');
// const path = require('path');
// const session = require('express-session');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../client/public/index')));
// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

// routes.router(app);

// app.set('port', process.env.PORT || 3000);

// app.listen(app.get('port'), () => {
//   console.log('listening on port: ', app.get('port'));
// });

'use strict';

// We’re setting up an extremely simple server here.
const http = require('http');

// These could (should) be set as env vars.
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// No matter what hits the server, we send the same thing.
http.createServer((req, res) => {

  // Tell the browser what’s coming.
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  });

  // Send a simple message in HTML.
  res.write('<h1>I’m a Node app!</h1>');
  res.write('<p>And I’m <em>sooooo</em> secure.</p>');
  res.end();
}).listen(port, host);

// This message prints in the console when the app starts.
console.log(`App running at http://${host}:${port}`);

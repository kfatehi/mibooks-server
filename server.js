const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;
const core = require('./core');

app.use(cors());

app.use(express.static('public'))

app.get('/books.json', function(req, res) {
  core.getBookList(function(err, list) {
    if (err) return next(err);
    res.json(list);
  });
})

io.on('connection', function(socket) {
  console.log('socket ocnnected');
});

server.listen(port, function(err) {
  if (err) throw err;
  console.log('Listening on port '+port);
});

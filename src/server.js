const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const db = require('./db');

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure('views', {
  express: server,
  noCache: true,
});

const ideas = [
  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
    title: '',
    category: '',
    description: '',
    url: '',
  },
];

server.get('/', function (req, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send('Erro no banco de dados!');
    }

    const reverserdIdeas = [rows].reverse();
    let lastIdeas = [];

    for (idea in reverserdIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }
    return res.render('index.html', { ideas: lastIdeas });
  });
});

server.get('/ideias', function (req, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send('Erro no banco de dados!');
    }

    const reverserdIdeas = [rows].reverse();

    return res.render('ideias.html', { ideas: reverserdIdeas });
  });
});

server.post('/', function (req, res) {
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ];
  const query = `INSERT INTO ideas (
    image, title, category, description, link
  ) VALUES(
    ?, ?, ?, ?, ?
  );`;

  db.run(query, values, function (err) {
    if (err) {
      console.log(err);
      return res.send('Erro no banco de dados!');
    }

    return res.redirect('/ideias');
  });
});

server.listen(3000);

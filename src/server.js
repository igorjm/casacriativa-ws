const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

server.use(express.static('public'));

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
  const reverserdIdeas = [...ideas].reverse();
  const lastIdeas = [];

  for (idea in reverserdIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea);
    }
  }
  return res.render('index.html', { ideas: lastIdeas });
});

server.get('/ideias', function (req, res) {
  const reverserdIdeas = [...ideas].reverse();

  return res.render('ideias.html', { ideas: reverserdIdeas });
});

server.listen(3333);

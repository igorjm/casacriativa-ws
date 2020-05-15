const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ws.db');

db.serialize(function () {
  //CREATE TABLE
  db.run(
    `CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        image TEXT, 
        title TEXT, 
        category TEXT, 
        description TEXT, 
        link TEXT  
      );`
  );

  //INSERT DATA
  const values = ['', '', '', '', ''];
  const query = `INSERT INTO ideas (
    image, title, category, description, link
  ) VALUES(
    ?, ?, ?, ?, ?
  );`;

  db.run(query, values, function (err) {
    if (err) return console.log(err);

    console.log(this);
  });

  //REMOVE DATA
  db.run(`DELETE FROM ideas WHERE id = ?`, [1], function (err) {
    if (err) return console.log(err);

    console.log(this);
  });

  //LIST DATA
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) return console.log(err);

    console.log(rows);
  });
});

module.exports = db;

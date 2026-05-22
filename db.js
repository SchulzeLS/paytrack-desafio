const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Inicializa o banco
async function initDB() {
  const db = await open({
    filename: './users.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT,
      gender TEXT,
      dob TEXT,
      phone TEXT,
      country TEXT
    )
  `);

  return db;
}

// Insere ou atualiza usuário
async function upsertUser(db, user) {
  const existing = await db.get('SELECT * FROM users WHERE email = ?', [user.email]);

  if (existing) {
    await db.run(
      'UPDATE users SET name=?, gender=?, dob=?, phone=?, country=? WHERE email=?',
      [
        `${user.name.first} ${user.name.last}`,
        user.gender,
        user.dob.date,
        user.phone,
        user.location.country,
        user.email
      ]
    );
    return 'updated';
  } else {
    await db.run(
      'INSERT INTO users (email, name, gender, dob, phone, country) VALUES (?, ?, ?, ?, ?, ?)',
      [
        user.email,
        `${user.name.first} ${user.name.last}`,
        user.gender,
        user.dob.date,
        user.phone,
        user.location.country
      ]
    );
    return 'added';
  }
}

// Exporta as funções para uso no index.js
module.exports = { initDB, upsertUser };

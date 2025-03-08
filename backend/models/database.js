const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

const db = new sqlite3.Database(":memory:");

async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)"
      );
      db.run("CREATE TABLE banks (BIC TEXT PRIMARY KEY, Charge REAL)");
      db.run(
        "CREATE TABLE links (FromBIC TEXT, ToBIC TEXT, TimeTakenInMinutes INTEGER)"
      );
      db.run(
        "CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, fromBank TEXT, toBank TEXT, route TEXT, cost REAL, time REAL)"
      );
    }, resolve);
  });
}

async function loadDataToDatabase() {
  await new Promise((resolve, reject) => {
    fs.createReadStream("banks.csv")
      .pipe(csv())
      .on("data", (row) => {
        db.run("INSERT INTO banks (BIC, Charge) VALUES (?, ?)", [
          row.BIC,
          parseFloat(row.Charge),
        ]);
      })
      .on("end", resolve)
      .on("error", reject);
  });
  await new Promise((resolve, reject) => {
    fs.createReadStream("links.csv")
      .pipe(csv())
      .on("data", (row) => {
        db.run(
          "INSERT INTO links (FromBIC, ToBIC, TimeTakenInMinutes) VALUES (?, ?, ?)",
          [row.FromBIC, row.ToBIC, parseInt(row.TimeTakenInMinutes)]
        );
      })
      .on("end", resolve)
      .on("error", reject);
  });
}

const banks = {};
const graph = {};
async function loadDataToMemory() {
  await new Promise((resolve, reject) => {
    db.all("SELECT * FROM banks", (err, rows) => {
      if (err) reject(err);
      rows.forEach((row) => {
        banks[row.BIC] = row.Charge;
      });
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    db.all("SELECT * FROM links", (err, rows) => {
      if (err) reject(err);
      rows.forEach((row) => {
        if (!graph[row.FromBIC]) graph[row.FromBIC] = [];
        graph[row.FromBIC].push({
          to: row.ToBIC,
          time: row.TimeTakenInMinutes,
        });
      });
      resolve();
    });
  });
}

module.exports = {
  db,
  initializeDatabase,
  loadDataToDatabase,
  loadDataToMemory,
  banks,
  graph,
};

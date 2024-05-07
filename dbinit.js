import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('database/database.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)
})

let sql = "SELECT * FROM user"
db.all(sql,[],(err,rows)=>{
    if(err) return console.error(err.message)
    rows.forEach(row => {
        console.log(row);
    });
})
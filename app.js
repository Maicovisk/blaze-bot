const express = require('express')
const axios = require('axios');
var mysql = require('mysql');


async function getData(){
    try{
        pattern = ''
        let d = new Date()
        day = d.getDate()
        hour = d.getHours()
    
        data = await axios.get('https://blaze.com/api/roulette_games/recent/history?page=1')
        _data = data.data["records"]
    
    
        var stringData = _data[0]["created_at"]
    
        for (c of _data){
            pattern += c['color']
        }
    
        insert(pattern.slice(1), pattern[0], day, hour, stringData)
    }catch(e){}
}

setInterval(() => {
    getData()
}, 15 * 1000);

var conn = mysql.createConnection({
    host:"blaze-db.mysql.database.azure.com",
    user:"blazebot",
    password:"Maicon2018$",
    database: 'blazebot',
    port:3306,
});

conn.connect(err => {
    if (!err) {
        console.log('connected')
    }
})

function createBase() {
    conn.query(`
        create table if not exists data (
        ID INTEGER AUTO_INCREMENT PRIMARY KEY,
        pattern VARCHAR(30) NOT NULL,
        wnext INTEGER not null,
        day INTEGER not null,
        hour INTEGER not null,
        created_at VARCHAR(80) UNIQUE NOT NULL)`.trim())
}

async function select() {
    data = await conn.query('select * from data', function (err, result, fields) {
        console.log(result)
    })
}


async function insert(pattern, wnext, day, hour, time) {
    try{
        await conn.query(`insert into data (pattern, wnext, day, hour, created_at)
        values ('${pattern}', '${wnext}', '${day}', '${hour}', '${time}')`, function (err, result, fields) {
        })
        conn.commit()
    }catch(e) {
    }
}

function dropTable() {
    conn.query('drop table data')
}


const app = express()
const port = process.env.PORT || 3001;


app.get('/pattern', (req, res) => {
    data = conn.query('select * from data', function (err, result, fields) {
        res.json(result)
    })
})


app.get('/pattern/:pattern', (req, res) => {
    data = conn.query(`select * from data where pattern = ${req.params.pattern}`, function (err, result, fields) {
        res.json(result)
    })
})


app.get('/day/:day', (req, res) => {
    data = conn.query(`select * from data where day = ${req.params.day}`, function (err, result, fields) {
        res.json(result)
    })
})


app.get('/bet', async (req, res) => {
    pattern = ''

    data = await axios.get('https://blaze.com/api/roulette_games/recent/history?page=1')
    for (c of _data){
        pattern += c['color']
    }
    
    data = conn.query(`select * from data where pattern = ${pattern.slice(0, -1)}`, function (err, result, fields) {
        res.json(result)
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const app = express();
// app.listen(8181);

// Establishing the port
// const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8181 || 8000 || 5000 || 5050 || 5500;
app.listen(PORT, console.log(
    `Server started on port ${PORT}`));

const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(express.static('./public'));
app.use(cookieParser());
app.use(session({
    secret: 'user',
    name: 'user',
    saveUninitialized: false,
    resave: true
}));

var foodrouter = require('./router/foodrouter');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/food', foodrouter);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});


var mysql = require('mysql');
var mysql_config = {
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'ba457097dc58b9',
    password: 'd720c7af',
    database: 'heroku_f6720d51623cf1f'
};


function disconnect_handler() {
   let conn = mysql.createConnection(mysql_config);
    conn.connect(err => {
        (err) && setTimeout('disconnect_handler()', 2000);
    });

    conn.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // db error 重新連線
            disconnect_handler();
        } else {
            throw err;
        }
    });
    exports.conn = conn;
}
disconnect_handler();
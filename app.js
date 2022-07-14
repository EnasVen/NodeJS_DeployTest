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
    secret: '34SDgsdgspxxxxxxxdfsG',
    name: 'user',
    saveUninitialized: false,
    resave: true
}));

var foodrouter = require('./router/foodrouter');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/food', foodrouter);

app.get('*', (req, res) => {
    res.sendFile('./index.html');
});

const express = require('express');
const app = express();
// app.listen(8181);

// Establishing the port
const PORT = process.env.PORT || 8181;

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
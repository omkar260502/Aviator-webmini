const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter');
const port = process.env.port || 8080;

const app = express();

//db connection

mongoose.connect('mongodb://127.0.0.1/Aviatordata', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB', error);
});

const db=mongoose.connection;

db.on("error",()=>{console.log("Error in Connection");})
db.once('open',()=>{console.log("Connection estb")})

app.set('view engine', 'ejs')

app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

 app.use('/',homeRouter);

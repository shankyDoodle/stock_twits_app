'use strict';

const express = require('express')
const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const LoadData = require("./load-data");
let myData = new LoadData();
myData.prepareData()

const port = 9091

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser());
app.use(cors())

app.get('/symbolList', (req, res) => res.send(myData.symbolList));
app.get('/symbolData', (req, res) => res.send("myData.symbolData"));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
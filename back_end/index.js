'use strict';

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const LoadData = require("./load-data");
let myData = new LoadData();
myData.prepareData()

const ip = require("ip");
const host = ip.address();
const port = 9091

const dotenv = require('dotenv');
dotenv.config();
const STOCK_TOKEN = process.env.STOCK_TOKEN


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser());
app.use(cors())

app.get('/symbolList', (req, res) => res.send(myData.symbolList));
app.get('/symbolData', (req, res) => {
    let stringQuery = req.query;
    let symbols = stringQuery.symbols

    let baseURL = "https://api.stocktwits.com/api/2/streams/symbols.json?";
    let stockTokenQuery = "access_token=" + STOCK_TOKEN;
    let symbolsQuery = "&symbols=" + symbols;
    axios.get(baseURL + stockTokenQuery + symbolsQuery)
        .then(innerRes => {
            let data = innerRes.data;
            let oRetData = {};
            oRetData.cursor = data.cursor;
            oRetData.message = data.messages.map(oM => {
                return {
                    id: oM.id,
                    body: oM.body,
                    created_at: oM.created_at,
                    symbols: oM.symbols
                }
            })
            res.statusCode = OK;
            res.send(oRetData)
        }).catch(e => {
        res.statusCode = BAD_REQUEST;
        res.send(e)
    });
});


app.listen(port, () => console.log(`App listening at ${host}:${port}`))
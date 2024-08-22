require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./router/api.js');
const path = require('path');
const cors = require('cors');
const mongoDBPinkCron = require('./services/cron.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://layangku-app.vercel.app');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use(cors());
mongoDBPinkCron.start();

app.use(api);

app.listen(process.env.PORT || 5000, () => console.log('server aktif'));

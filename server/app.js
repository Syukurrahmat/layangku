require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const handler = require('serve-handler');
const api = require('./router/api.js');
const path = require('path')
const cors = require('cors')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: '*'
}));
app.use('/api', api);

app.get('*', (req, res) => handler(req, res, { public: path.join('public') }))

app.listen(process.env.PORT || 5000, () => console.log('server aktif'))
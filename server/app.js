require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./router/api.js')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.use('/api', api)

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

app.listen(process.env.PORT || 5000, () => console.log('server aktif'))
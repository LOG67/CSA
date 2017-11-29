import express from 'express'
import path from 'path'
import moment from 'moment'
import googleFinance from 'google-finance'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/company/:company/startdate/:startdate/enddate/:enddate', (req, res) => {
  res.send(req.params)
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bundle.js'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

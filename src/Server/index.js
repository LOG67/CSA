import express from 'express'
import path from 'path'
import moment from 'moment'
import googleFinance from 'google-finance'
import axios from 'axios'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/company/:company/startdate/:startdate/enddate/:enddate', (req, res) => {
  googleFinance.historical({
    symbol: 'NASDAQ:GOOGL',
    from: '2014-01-01',
    to: '2014-12-31'
  }).then(news => {
    res.send(news)
    // crawl(news, text => res.send(striptags(text)))
  })
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bundle.js'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


function crawl(news, callback) {
  var links = news.map(n => axios.get(n.link))
  axios.all(links).then(results => {
    var res = "";
    results.forEach(r => res += r.data)
    console.log(results)
    callback("hello")

  }).catch(error => {
    console.log(error);
  });
}

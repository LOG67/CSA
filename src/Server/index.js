import express from 'express'
import path from 'path'
import moment from 'moment'
import googleFinance from 'google-finance'
import axios from 'axios'

import companies from '../../companies'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/query/symbol/:symbol/from/:from/to/:to', (req, res) => {

    let companySymbol = req.params.symbol || ''
    let from = req.params.from || ''
    let to = req.params.to || ''

    // check the company
    if (!companies.includes(companySymbol)) {
        res.status(404).send("No company symbol: " + companySymbol)
        res.end()
        return
    }

    // TODO: should check the dates

    let symbol = 'NASDAQ:' + companySymbol
    let query = {
        companySymbol,
        from,
        to,
    }

    var result = {
        query,
    }

    googleFinance.historical({
        symbol,
        from,
        to,
    }).then(financialRes => {
        result = {...result, quotes: cleanQuotes(financialRes)}
        return googleFinance.companyNews({symbol})
    }).then(newsRes => {
        result = {...result, newsRes}
        res.send(result)
    }).catch(reason => {
        res.send(reason)
    })

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))




// helper methods
function cleanQuotes(quotes) {
    return quotes.map(({date, high, low, volume}) => ({date, high, low, volume}))
}

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

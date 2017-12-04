import express from 'express'
import path from 'path'
import moment from 'moment'
import googleFinance from 'google-finance'
import axios from 'axios'
import * as admin from "firebase-admin"
import cheerio from 'cheerio'

import adminsdk from "../../adminsdk.json"
import companies from '../../companies'
import ibmconfig from '../../ibmconfig'

// firebase stuff
admin.initializeApp({
  credential: admin.credential.cert(adminsdk),
  databaseURL: "https://csanalyzer-91607.firebaseio.com/",
})

let db = admin.database()
let ref = db.ref('restricted_access/secret_document')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/query/symbol/:symbol/from/:from/to/:to/token/:token', (req, res) => {

    console.log(req.url)
    let companySymbol = req.params.symbol || ''
    let from = req.params.from || ''
    let to = req.params.to || ''

    // check the company
    if (!companies.includes(companySymbol)) {
        res.status(404).send("No company symbol: " + companySymbol).end()
        return
    }

    // TODO: should check the dates
    //
    //

    admin.auth().verifyIdToken(req.params.token).then(decodedToken => {
        let symbol = 'NASDAQ:' + companySymbol
        let query = {
            companySymbol,
            from,
            to,
        }
        let date = moment().toISOString()
        var result = {
            date,
            query,
        }

        googleFinance.historical({
            symbol,
            from,
            to,
        }).then(financialRes => {
            result = { ...result, quotes: cleanQuotes(financialRes) }
            return googleFinance.companyNews({ symbol })
        }).then(newsRes => {
            let allText = newsRes.map(n => {return n.summary}).reduce((sum, n) => {return sum + '\n' + n}, '')
            let tone = {
                sadness: 0.1,
                angry: 0.2,
            }
            result = { ...result, tone }
            console.log(result)
            db.ref('users/' + decodedToken.uid + '/histories').push().set(result)
            res.send(result).end()

            // console.log(a)
            // axios(watsonReqConf(a)).then(({data}) => {
            //     res.status(404).send("hello").end()
            //     console.log("here")
            //     if (!data || !data.document_tone) {
            //         res.status(404).send(data).end()
            //         return
            //     }
            //     console.log(data)
            //     result = data
            //     res.send(result).end()
            // }).catch(reason => {
            //     console.log(reason)
            //     res.status(404).send(reason).end()
            // })
        }).catch(reason => {
            res.status(404).send(reason).end()
        })
    }).catch(error => {
        res.status(403).send(error).end()
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


// helper methods
function cleanQuotes(quotes) {
    return quotes.map(({date, open, close, volume}) => ({date: moment(date).toISOString(), open, close, volume}))
}

function crawl(news, callback) {
    var links = news.map(n => axios.get(n.link))
    axios.all(links).then(results => {
        var res = "";
        results.forEach(r => {
            const $ = cheerio.load(r.data)
            res += $('p').text()
        })
        callback(res)
    }).catch(error => {
        console.log(error)
        callback()
    })
}

function watsonReqConf(text) {
    return {
        url: imbconfig.url,
        method: 'post',
        // headers: {'Content-Type': 'application/json'},
        auth: {
            username: imbconfig.username,
            password: imbconfig.password,
        },
        data: JSON.stringify({text})
    }
}

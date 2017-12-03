import express from 'express'
import path from 'path'
import moment from 'moment'
import googleFinance from 'google-finance'
import axios from 'axios'
import * as admin from "firebase-admin"
import adminsdk from "../../adminsdk.json"

import companies from '../../companies'

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
            db.ref('users/' + decodedToken.uid + '/histories').push().set(result)
            result = {...result, newsRes}
            res.send(result).end()
        }).catch(reason => {
            res.status(404).send(reason).end()
        })
    }).catch(error => {
        res.status(403).send("Not Authorized!").end()
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


// helper methods
function cleanQuotes(quotes) {
    return quotes.map(({date, high, low, volume}) => ({date, high, low, volume}))
}

// function crawl(news, callback) {
//     var links = news.map(n => axios.get(n.link))
//     axios.all(links).then(results => {
//         var res = "";
//         results.forEach(r => res += r.data)
//         console.log(results)
//         callback("hello")
//
//     }).catch(error => {
//         console.log(error);
//     });
// }

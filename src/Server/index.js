import express from 'express'
import path from 'path'
import moment from 'moment'
import googleFinance from 'google-finance'
import * as admin from "firebase-admin"
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'


import adminsdk from "../../adminsdk.json"
import companies from '../../companies'
import ibmconfig from '../../ibmconfig'

// firebase stuff
admin.initializeApp({
  credential: admin.credential.cert(adminsdk),
  databaseURL: "https://csanalyzer-91607.firebaseio.com/",
})

const db = admin.database()
const app = express()
const toneAnalyzer = new ToneAnalyzerV3({
    username: ibmconfig.username,
    password: ibmconfig.password,
    version_date: '2016-05-19',
})

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
            let text = newsRes.map(n => {return n.summary}).reduce((sum, n) => {return sum + '\n' + n}, '')

            let toneParams = {
                text,
                tones: 'emotion',
            }

            toneAnalyzer.tone(toneParams, (toneError, toneResponse) => {
                if (toneError) {
                    console.log(toneError)
                    res.status(404).send(toneError).end()
                    return
                } else {
                    // console.log(toneResponse)
                    let tones = toneResponse.document_tone.tone_categories[0].tones
                    console.log(tones)
                    result = { ...result, tones }
                    // console.log(result)
                    db.ref('users/' + decodedToken.uid + '/histories').push().set(result)
                    res.send(result).end()
                }
            })
        }).catch(reason => {
            res.status(404).send(reason).end()
        })
    }).catch(error => {
        res.status(403).send(error).end()
    })
})

// helper methods
function cleanQuotes(quotes) {
    return quotes.map(({date, open, close, volume}) => ({date: moment(date).toISOString(), open, close, volume}))
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running on port: ' + port))

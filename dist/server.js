/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_google_finance__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_google_finance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_google_finance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_admin__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_admin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_admin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_watson_developer_cloud_tone_analyzer_v3__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_watson_developer_cloud_tone_analyzer_v3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_watson_developer_cloud_tone_analyzer_v3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__adminsdk_json__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__adminsdk_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__adminsdk_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__companies__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ibmconfig__ = __webpack_require__(9);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };












// firebase stuff
__WEBPACK_IMPORTED_MODULE_4_firebase_admin__["initializeApp"]({
    credential: __WEBPACK_IMPORTED_MODULE_4_firebase_admin__["credential"].cert(__WEBPACK_IMPORTED_MODULE_6__adminsdk_json___default.a),
    databaseURL: "https://csanalyzer-91607.firebaseio.com/"
});

var db = __WEBPACK_IMPORTED_MODULE_4_firebase_admin__["database"]();
var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var toneAnalyzer = new __WEBPACK_IMPORTED_MODULE_5_watson_developer_cloud_tone_analyzer_v3___default.a({
    username: __WEBPACK_IMPORTED_MODULE_8__ibmconfig__["a" /* default */].username,
    password: __WEBPACK_IMPORTED_MODULE_8__ibmconfig__["a" /* default */].password,
    version_date: '2016-05-19'
});

app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'public', 'index.html'));
});

app.get('/query/symbol/:symbol/from/:from/to/:to/token/:token', function (req, res) {

    console.log(req.url);
    var companySymbol = req.params.symbol || '';
    var from = req.params.from || '';
    var to = req.params.to || '';

    // check the company
    if (!__WEBPACK_IMPORTED_MODULE_7__companies__["a" /* default */].includes(companySymbol)) {
        var error = "Not a valid NAsDAQ company symbol: " + companySymbol;
        console.log(error);
        res.status(404).send({ error: error }).end();
        return;
    }

    if (!__WEBPACK_IMPORTED_MODULE_2_moment___default()(req.params.from, 'MM-DD-YYYY').isValid()) {
        var _error = "Not a valid from date: " + req.params.from;
        console.log(_error);
        res.status(404).send({ error: _error }).end();
        return;
    }

    if (!__WEBPACK_IMPORTED_MODULE_2_moment___default()(req.params.to, 'MM-DD-YYYY').isValid()) {
        var _error2 = "Not a valid to date: " + req.params.to;
        console.log(_error2);
        res.status(404).send({ error: _error2 }).end();
        return;
    }

    __WEBPACK_IMPORTED_MODULE_4_firebase_admin__["auth"]().verifyIdToken(req.params.token).then(function (decodedToken) {
        var symbol = 'NASDAQ:' + companySymbol;
        var query = {
            companySymbol: companySymbol,
            from: from,
            to: to
        };
        var date = __WEBPACK_IMPORTED_MODULE_2_moment___default()().toISOString();
        var result = {
            date: date,
            query: query
        };

        __WEBPACK_IMPORTED_MODULE_3_google_finance___default.a.historical({
            symbol: symbol,
            from: from,
            to: to
        }).then(function (financialRes) {
            result = _extends({}, result, { quotes: cleanQuotes(financialRes) });
            return __WEBPACK_IMPORTED_MODULE_3_google_finance___default.a.companyNews({ symbol: symbol });
        }).then(function (newsRes) {
            var text = newsRes.map(function (n) {
                return n.summary;
            }).reduce(function (sum, n) {
                return sum + '\n' + n;
            }, '');

            var toneParams = {
                text: text,
                tones: 'emotion'
            };

            toneAnalyzer.tone(toneParams, function (serverError, toneResponse) {
                if (serverError) {
                    console.log(serverError);
                    res.status(404).send({ error: "Something went wrong in the server!", serverError: serverError }).end();
                    return;
                } else {
                    var tones = toneResponse.document_tone.tone_categories[0].tones;
                    result = _extends({}, result, { tones: tones });

                    db.ref('users/' + decodedToken.uid + '/histories').push().set(result);
                    res.send(result).end();
                }
            });
        }).catch(function (serverError) {
            var error = "Something went wrong in the query!";
            console.log(serverError);
            res.status(404).send({ error: error, serverError: serverError }).end();
            return;
        });
    }).catch(function (serverError) {
        console.log(serverError);
        res.status(403).send({ error: "Athentication Failed! relogin, please.", serverError: serverError }).end();
    });
});

// helper methods
function cleanQuotes(quotes) {
    return quotes.map(function (_ref) {
        var date = _ref.date,
            open = _ref.open,
            close = _ref.close,
            volume = _ref.volume;
        return { date: __WEBPACK_IMPORTED_MODULE_2_moment___default()(date).toISOString(), open: open, close: close, volume: volume };
    });
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
    return console.log('Server is running on port: ' + port);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("google-finance");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("watson-developer-cloud/tone-analyzer/v3");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"type":"service_account","project_id":"csanalyzer-91607","private_key_id":"ffa0fb70a66baf9c26309ce3edd8c99beb8c567f","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCovgMdCrEZReRI\nrau+yzGndTwBxOME+hUtHHX9Vx4rLRdVU6GEt68UrarG3w9GSgl93unhFtHZ/goc\nCsdxNTtu/H3Cs3DhENvEzAaGvn2WYTx5NPhiK3qqIUBImR5DW/SK/ylwDqCro1hv\nZ9jfcDgjmtSZW8gY3T75utBnJS/FaRwS46hHL6sH2FZ7fgMnQan6KqtI/AMds3W/\nCJ1Nr9x+zJKJdkp9BFfzTqu/Kcm1S9dBLpLIW652q3GmR9p6XyopTgyPQ/54B4YM\nvJSNVEztFUy91W+0SxbtwTY0O4huPe/S81HsX69+TjPSsTUNcpz8KfmEqjLZ++E6\ncdKSNYflAgMBAAECggEAAwC4oPZs/uBjxthSV1eZ11tKeVSV3qONp2sbfWnkt0t6\n4BGYLPqw0qshgB79kFhmcVc7bb5Ad0LiTqvxbyYNm/TBzypuzo6EfqzLy++NYBT0\nZMrIxcR0zxy+3lvdMkEraaLPS7dy7AMA4qCkNxux4A5UDLOZrLmZMov8w+0hO7/S\n8mxHBTDKkgDP4MdKlSBXNUCJA05N4T8qTOgDBDjpumKaX2vKvTXtIMj7ifn2m21n\nq59aCJGv3UhvO6Xv+J4QkhjLMkttrhwRDrqNFoMvMpe4CzjDfWkpJYPhFACEOLa0\nUL/CvJivv9CWrGEc3LzgtURHT9MTCvEisZXnsia38QKBgQDSyRoIpDB/c6eDd2UP\nRiQsgL+cY/Mvj44JfsdF9csVVQK1ELGe/VoKpRV25kyeNlGuMY0WkOmSDpd8KVWC\nSr2ejvHLaVH/qgvQ1QZrJQbJCYtibUZIzsAeOPhOa1Nv9UoEuV1xM6COFBnmYZOp\ny/z1/9cIWCCf9lZWNNo1c53AMQKBgQDM8C3zYrj7ANFPWMo8K4t/3laH7smtZ5zh\nEWB5JqE8UIOC63q3PeL4XWZomtpMSAr8cLPxx6sWbnzhOGxPLJrdK1HRgnCoCUA2\nVSgSPElof9iUHckcNlfeYbIccApYME/wtSTx0deVpL0O1aREqYIQ+c128NtCb7U1\nQX73mVDp9QKBgQDMPLkx+E1ZoSmFs9FDHHZ+fH2svhfrVJCO2L2jJwcQ8179LGC+\nqcNuHwkOPRWuEvnP7AlF/UGkGOllD/PfnCXhFaZprvIZ5J0wSsi+VpEdiFb7FuCM\nOXBjmFXYPhwJlkWTEDzfK+P85rM1zAQ0+QdxIOUtG574/8omG233bsBCcQKBgGTV\n0GYurwGhl1tJPsh4TH0v8reTgFv33TLIkAVMQo0guHSUVJ8QrjqyCg9yEfLyh6VJ\n9uAB9GZnGr7eOjyCn/gutmU1nySu2I9jOwIt85idPv0x4qAlBPsAatifMBfQPaUc\nG/931nFkyzkfWWIHXV3o63WYcOmxeSGpBkXhg/R5AoGAVG52uNvyha7ylVJRGfM+\nvsw6bRVjeImdxFe+lCQhfpwePwL+JJ3OiIDWgd7ykH+UVViAt501TIuQKTw8q+1n\nMXXXB/xJRSYxMvS4ig30FzsUDa02OgH8BtG/fImYOAg1uTm1pqmywOAR8UCY6QjC\nE1VP3JrvdodkfXdydp03mps=\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-m6c2v@csanalyzer-91607.iam.gserviceaccount.com","client_id":"103318465342488433125","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m6c2v%40csanalyzer-91607.iam.gserviceaccount.com"}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var companies = ["PIH", "TURN", "FLWS", "FCCY", "SRCE", "VNET", "TWOU", "JOBS", "CAFD", "EGHT", "AVHI", "SHLM", "AAON", "ABAX", "ABEO", "ABEOW", "ABIL", "ABMD", "ABLX", "AXAS", "ACIU", "ACIA", "ACTG", "ACHC", "ACAD", "ACST", "AXDX", "XLRN", "ANCX", "ARAY", "ACRX", "ACER", "ACERW", "ACET", "AKAO", "ACHV", "ACHN", "ACIW", "ACRS", "ACMR", "ACNB", "ACOR", "SQZZ", "ATVI", "ACTA", "ACXM", "ADMS", "ADMP", "ADAP", "ADUS", "AEY", "IOTS", "ADMA", "ADBE", "ADOM", "ADTN", "ADRO", "AAAP", "ADES", "AEIS", "AMD", "ADXS", "ADXSW", "ADVM", "AEGN", "AGLE", "AEHR", "AMTX", "AERI", "AVAV", "AEZS", "AEMD", "GNMX", "AFMD", "AGEN", "AGRX", "AGYS", "AGIO", "AGNC", "AGNCB", "AGNCN", "AGFS", "AGFSW", "ALRN", "AIMT", "AIRT", "ATSG", "AIRG", "AMCN", "AKAM", "AKTX", "AKCA", "AKBA", "AKER", "AKRX", "AKTS", "ALRM", "ALSK", "ALBO", "ABDC", "ALDR", "ALDX", "ALXN", "ALCO", "ALGN", "ALIM", "ALJJ", "ALKS", "ABTX", "ALGT", "ALNA", "AHGP", "AMMA", "ARLP", "AHPI", "AMOT", "ALQA", "ALLT", "MDRX", "AFAM", "ALNY", "AOSL", "GOOG", "GOOGL", "SMCP", "ATEC", "ALPN", "SWIN", "AABA", "ALTR", "ALT", "ASPS", "AIMC", "AMAG", "AMRN", "AMRK", "AMZN", "AMBC", "AMBCW", "AMBA", "AMCX", "DOX", "AMDA", "AMED", "UHAL", "AMRH", "AMRHW", "ATAX", "AMOV", "AAL", "ACSF", "AETI", "AMNB", "ANAT", "AOBC", "APEI", "ARII", "AMRB", "AMSWA", "AMSC", "AMWD", "CRMT", "ABCB", "AMSF", "ASRV", "ASRVP", "ATLO", "AMGN", "FOLD", "AMKR", "AMPH", "IBUY", "ASYS", "AFSI", "AMRS", "ADI", "ALOG", "ANAB", "AVXL", "ANCB", "ANDA", "ANDAR", "ANDAU", "ANDAW", "ANGI", "ANGO", "ANIP", "ANIK", "ANSS", "ATRS", "ANTH", "APLS", "APOG", "APEN", "AINV", "APPF", "APPN", "AAPL", "ARCI", "APDN", "APDNW", "AGTC", "AMAT", "AAOI", "AREX", "APTI", "APRI", "APVO", "APTO", "AQMS", "AQB", "AQXP", "ARDM", "ARLZ", "PETX", "ABUS", "ARCW", "ABIO", "RKDA", "ARCB", "ACGL", "ACGLO", "ACGLP", "APLP", "FUV", "ARCT", "ARDX", "ARNA", "ARCC", "ARGX", "AGII", "AGIIL", "ARGS", "ARKR", "ARTX", "ARQL", "ARRY", "ARRS", "DWAT", "AROW", "ARWR", "ASNS", "ARTNA", "ARTW", "ASNA", "ASND", "ASCMA", "APWC", "ASML", "ASPU", "AZPN", "ASMB", "ASFI", "ASTE", "ATRO", "ALOT", "ASTC", "ASUR", "ASV", "ATAI", "ATRA", "ATHN", "ATNX", "ATHX", "ATAC", "ATACR", "ATACU", "AAME", "ACBI", "ACFC", "AY", "ATLC", "AAWW", "AFH", "AFHBL", "TEAM", "ATNI", "ATOM", "ATOS", "ATRC", "ATRI", "ATTU", "LIFE", "AUBN", "BOLD", "AUDC", "AUPH", "EARS", "ADSK", "ADP", "AUTO", "AVDL", "ATXI", "AVEO", "AVXS", "AVNW", "AVID", "AVGR", "AVIR", "CAR", "AHPA", "AHPAU", "AHPAW", "AWRE", "ACLS", "AXGN", "AAXN", "AXON", "AXSM", "AXTI", "AYTU", "AZRX", "BCOM", "RILY", "RILYL", "RILYZ", "BOSC", "BIDU", "BCPC", "BWINA", "BWINB", "BLDP", "BANF", "BANFP", "BCTF", "BAND", "BKMU", "BOCH", "BMRC", "BMLP", "BKSC", "BOTJ", "OZRK", "BFIN", "BWFG", "BANR", "BZUN", "TAPR", "DLBL", "DTYL", "BHAC", "BHACR", "BHACU", "BHACW", "BBSI", "BSET", "BYBK", "BV", "BCBP", "BECN", "BSF", "BBGI", "BEBE", "BBBY", "BGNE", "BELFA", "BELFB", "BLPH", "BLCM", "BNCL", "BNFT", "BNTC", "BNTCW", "BYSI", "BGCP", "BGFV", "BRPAU", "BASI", "ORPN", "BIOC", "BCRX", "BDSI", "BIIB", "BKYI", "BIOL", "BLFS", "BLRX", "BMRN", "BMRA", "BVXV", "BVXVW", "BPTH", "BIOS", "BSTC", "BSPM", "TECH", "BEAT", "BIVV", "BCAC", "BCACR", "BCACU", "BCACW", "BJRI", "BBOX", "BRAC", "BRACR", "BRACU", "BRACW", "BLKB", "HAWK", "BL", "BKCC", "ADRA", "ADRD", "ADRE", "ADRU", "BLMN", "BCOR", "BLBD", "BUFF", "BHBK", "BLUE", "BKEP", "BKEPP", "BPMC", "BMCH", "BOBE", "BOFI", "BOFIL", "WIFI", "BOJA", "BOKF", "BOKFL", "BNSO", "BRQS", "BRQSW", "BOMN", "BPFH", "BPFHP", "BPFHW", "EPAY", "BLVD", "BLVDU", "BLVDW", "BCLI", "BBRG", "BDGE", "BLIN", "BRID", "BCOV", "BHF", "AVGO", "BSFT", "BVSN", "BYFC", "BWEN", "BPY", "BRKL", "BRKS", "BRKR", "BMTC", "BLMT", "BSQR", "BWLD", "BLDR", "BUR", "CFFI", "CHRW", "CA", "CCMP", "CDNS", "CDZI", "CZR", "CSTE", "PRSS", "CLBS", "CHY", "CHI", "CCD", "CHW", "CGO", "CSQ", "CAMP", "CVGW", "CALA", "CALD", "CALM", "CLMT", "CLXT", "ABCD", "CATC", "CAC", "CAMT", "CSIQ", "CGIX", "CPHC", "CPLA", "CBF", "CCBG", "CPLP", "CSWC", "CPTA", "CPTAG", "CPTAL", "CFFN", "CAPR", "CSTR", "CPST", "CARA", "CARB", "CRME", "CSII", "CATM", "CDNA", "CECO", "CTRE", "CARG", "CARO", "CART", "CRZO", "TAST", "CARV", "CASM", "CASC", "CWST", "CASY", "CASI", "CASS", "CATB", "CBIO", "CPRX", "CATS", "CATY", "CATYW", "CVCO", "CAVM", "CBFV", "CBAK", "CBOE", "CBTX", "CDK", "CDW", "CECE", "CELC", "CELG", "CELGZ", "CLDX", "APOP", "APOPW", "CLRB", "CLRBW", "CLRBZ", "CLLS", "CBMG", "CLSN", "CELH", "CYAD", "CETX", "CETXP", "CETXW", "CDEV", "CSFL", "CETV", "CFBK", "CENT", "CENTA", "CVCY", "CENX", "CNBKA", "CNTY", "CVO", "CRNT", "CERC", "CERCW", "CERN", "CERS", "KOOL", "CEVA", "CFCO", "CFCOU", "CFCOW", "CSBR", "CYOU", "BURG", "CTHR", "GTLS", "CHTR", "CHFN", "CHKP", "CHEK", "CHEKW", "CKPT", "CEMI", "CHFC", "CCXI", "CHMG", "CHKE", "CHFS", "CHMA", "CSSE", "PLCE", "CMRX", "CADC", "CALI", "CAAS", "CBPO", "CCCL", "CCCR", "CCRC", "JRJC", "HGSH", "CNIT", "CIFS", "CJJD", "CLDC", "HTHT", "CHNR", "CREG", "CNTF", "CXDC", "CCIH", "CNET", "IMOS", "CDXC", "CHSCL", "CHSCM", "CHSCN", "CHSCO", "CHSCP", "CHDN", "CHUY", "CDTX", "CMCT", "CMCTP", "CMPR", "CINF", "CIDM", "CTAS", "CRUS", "CSCO", "CTRN", "CTXR", "CTXRW", "CZNC", "CZWI", "CZFC", "CIZN", "CTXS", "CHCO", "CIVB", "CIVBP", "CLAR", "CDTI", "CLNE", "CLNT", "CACG", "YLDE", "LRGE", "CLFD", "CLRO", "CLSD", "CLIR", "CLIRW", "CMTA", "CBLI", "CSBK", "CLVS", "CMFN", "CMSS", "CMSSR", "CMSSU", "CMSSW", "CME", "CCNE", "CWAY", "COBZ", "COKE", "CODA", "CDXS", "CODX", "CVLY", "JVA", "CCOI", "CGNT", "COGT", "CGNX", "CTSH", "COHR", "CHRS", "COHU", "CLCT", "COLL", "CIGI", "CBAN", "COLB", "COLM", "CMCO", "CMCSA", "CBSH", "CBSHP", "CUBN", "CHUBA", "CHUBK", "CVGI", "COMM", "JCS", "ESXB", "CFBI", "CYHHZ", "CTBI", "CWBC", "CVLT", "CGEN", "CPSI", "CTG", "CHCI", "CMTL", "CNAT", "CNCE", "CXRX", "CCUR", "CDOR", "CFMS", "CNFR", "CNMD", "CTWS", "CNOB", "CONN", "CNSL", "CWCO", "CNAC", "CNACR", "CNACU", "CNACW", "CPSS", "CFRX", "CTRV", "CTRL", "CPRT", "CRBP", "CORT", "CORE", "CORI", "CSOD", "CRVL", "CRVS", "CSGP", "COST", "CPAH", "ICBK", "COUP", "CVTI", "COWN", "COWNL", "PMTS", "CPSH", "CRAI", "CBRL", "BREW", "CRAY", "CACC", "USOI", "CREE", "CRESY", "CRSP", "CRTO", "CROX", "CCRN", "CRWS", "CYRX", "CYRXW", "CSGS", "CCLP", "CSPI", "CSWI", "CSX", "CTIC", "CTIB", "CTRP", "CUI", "CPIX", "CRIS", "CUTR", "CVBF", "CVV", "CYAN", "CYBR", "CYBE", "CYCC", "CYCCP", "CBAY", "CY", "CYRN", "CONE", "CYTK", "CTMX", "CYTX", "CYTXW", "CTSO", "CYTR", "DJCO", "DAKT", "DARE", "DRIO", "DRIOW", "DZSI", "DSKE", "DSKEW", "DAIO", "DWCH", "PLAY", "DTEA", "DFNL", "DUSA", "DWLD", "DWSN", "DBVT", "DCPH", "DFRG", "TACO", "TACOW", "DMPI", "DELT", "DELTW", "DENN", "XRAY", "DEPO", "DERM", "DEST", "DXLG", "DSWL", "DTRM", "RNDM", "DXCM", "DXTR", "DHXM", "DHIL", "FANG", "DCIX", "DRNA", "DFBG", "DFFN", "DGII", "DMRC", "DRAD", "DGLY", "APPS", "DCOM", "DIOD", "DISCA", "DISCB", "DISCK", "DISH", "DVCR", "SAUC", "DLHC", "BOOM", "DNBF", "DLTR", "DGICA", "DGICB", "DMLP", "DORM", "EAGL", "EAGLU", "EAGLW", "DOVA", "LYL", "DOTA", "DOTAR", "DOTAU", "DOTAW", "DRYS", "DSPG", "DLTH", "DNKN", "DRRX", "DXPE", "DYSL", "DYNT", "DVAX", "ETFC", "EBMT", "EGBN", "EGLE", "EFBI", "EGRX", "EWBC", "EACQ", "EACQU", "EACQW", "EML", "ESDI", "ESDIW", "EVGBC", "EVSTC", "EVLMC", "OKDCC", "EBAY", "EBAYL", "EBIX", "ELON", "ECHO", "SATS", "EEI", "ESES", "EDAP", "EDGE", "EDGW", "EDIT", "EDUC", "EGAN", "EGLT", "EHTH", "EIGR", "EKSO", "LOCO", "EMITF", "ESLT", "ERI", "ESIO", "EA", "EFII", "ELSE", "ELEC", "ELECU", "ELECW", "EBIO", "DWAC", "ESBK", "ELTK", "EMCI", "EMCF", "EMKR", "RNEM", "EMMS", "NYNY", "ENTA", "ECPG", "WIRE", "ENDP", "ECYT", "ELGX", "NDRA", "NDRAW", "EIGI", "WATT", "EFOI", "ERII", "EXXI", "ENG", "ENPH", "ESGR", "ENFC", "ENTG", "ENTL", "EBTC", "EFSC", "ENZY", "EPZM", "PLUS", "EQIX", "EQFN", "EQBK", "ERIC", "ERIE", "ERYP", "ESCA", "ESPR", "ESQ", "ESSA", "EPIX", "ESND", "ITEQ", "ETSY", "CLWT", "EEFT", "ESEA", "EVEP", "EVBG", "EVK", "MRAM", "EVLV", "EVGN", "EVOK", "EVOL", "EXAS", "EXAC", "XELA", "EXEL", "EXFO", "EXLS", "EXPE", "EXPD", "EXPO", "ESRX", "XOG", "EXTR", "EYEG", "EYEGW", "EZPW", "FFIV", "FB", "DAVE", "FANH", "FARM", "FMAO", "FFKT", "FMNB", "FARO", "FAST", "FAT", "FATE", "FBSS", "FCRE", "FSAC", "FSACU", "FSACW", "FNHC", "FENC", "GSM", "FFBW", "FCSC", "FGEN", "FDBC", "ONEQ", "LION", "FDUS", "FRGI", "FITB", "FITBI", "FNGN", "FISI", "FNSR", "FNJN", "FNTE", "FNTEU", "FNTEW", "FEYE", "FBNC", "FNLC", "FRBA", "BUSE", "FBIZ", "FCAP", "FCFS", "FCNCA", "FCBC", "FCCO", "FBNK", "FDEF", "FFBC", "FFBCW", "FFIN", "THFF", "FFNW", "FFWM", "FGBI", "FHB", "INBK", "INBKL", "FIBK", "FRME", "FMBH", "FMBI", "FNWB", "FSFG", "FSLR", "FAAR", "FPA", "BICK", "FBZ", "FCAL", "FCAN", "FTCS", "FCEF", "FCA", "SKYY", "FDT", "FDTS", "FVC", "FV", "IFV", "DWPP", "FEM", "FEMB", "FEMS", "FTSM", "FEP", "FEUZ", "FGM", "FTGC", "FTHI", "HYLS", "FHK", "FTAG", "FTRI", "FPXI", "YDIV", "FJP", "FEX", "FTC", "FTA", "FLN", "FTLB", "LMBS", "FMB", "FMK", "FNX", "FNY", "FNK", "FAD", "FAB", "MDIV", "MCEF", "FMHI", "QABA", "FTXO", "QCLN", "GRID", "CIBR", "FTXG", "CARZ", "FTXN", "FTXH", "FTXD", "FTXL", "FONE", "TDIV", "FTXR", "QQEW", "QQXT", "QTEC", "AIRR", "QINC", "RDVY", "RFAP", "RFDI", "RFEM", "RFEU", "FTSL", "FYX", "FYC", "FYT", "SDVY", "FKO", "FCVT", "FDIV", "FSZ", "FTW", "FIXD", "TUSA", "FKU", "FUNC", "FUSB", "SVVC", "FSV", "FISV", "FIVE", "FPRX", "FVE", "FIVN", "FLEX", "FLKS", "FLXN", "SKOR", "LKOR", "MBSD", "ASET", "ESGG", "ESG", "QLC", "FPAY", "FLXS", "FLIR", "FLDM", "FFIC", "FNBG", "FOMX", "FOGO", "FONR", "FSCT", "FRSX", "FH", "FORM", "FORTY", "FORR", "FRTA", "FTNT", "FBIO", "FBIOP", "FMCI", "FMCIR", "FMCIU", "FMCIW", "FWRD", "FORD", "FWP", "FOSL", "FMI", "FOXF", "FRAN", "FELE", "FRED", "RAIL", "FEIM", "FRPT", "FTEO", "FTR", "FTRPR", "FRPH", "FSBW", "FSBC", "FTD", "FTEK", "FCEL", "FLGT", "FORK", "FLL", "FULT", "FNKO", "FSNN", "FTFT", "FFHL", "WILC", "GTHX", "FOANC", "MOGLC", "GAIA", "GLPG", "GALT", "GALE", "GLMD", "GLPI", "GPIC", "GRMN", "GARS", "GDS", "GEMP", "GENC", "GNCMA", "GFN", "GFNCP", "GFNSL", "GENE", "GNUS", "GNMK", "GNCA", "GHDX", "GNTX", "THRM", "GEOS", "GABC", "GERN", "GEVO", "ROCK", "GIGM", "GIII", "GILT", "GILD", "GBCI", "GLAD", "GLADN", "GOOD", "GOODM", "GOODO", "GOODP", "GAIN", "GAINM", "GAINN", "GAINO", "LAND", "LANDP", "GLBZ", "GBT", "GLBR", "ENT", "GBLI", "GBLIL", "GBLIZ", "GPAC", "GPACU", "GPACW", "SELF", "GWRS", "KRMA", "FINX", "BFIT", "SNSR", "LNGR", "MILN", "EFAS", "QQQC", "BOTZ", "CATH", "SOCL", "ALTY", "SRET", "YLCO", "GLBS", "GLUU", "GLYC", "GOGO", "GLNG", "GMLP", "GMLPP", "GDEN", "GOGL", "GBDC", "GTIM", "GPRO", "GSHT", "GSHTU", "GSHTW", "GOV", "GOVNI", "LOPE", "GRVY", "GECC", "GECCL", "GEC", "GLDD", "GSBC", "GNBC", "GRBK", "GPP", "GPRE", "GCBC", "GLRE", "GSUM", "GRIF", "GRFS", "GRPN", "OMAB", "GGAL", "GSIT", "GSVC", "GTXI", "GTYH", "GTYHU", "GTYHW", "GBNK", "GNTY", "GFED", "GIFI", "GURE", "GPOR", "GWPH", "GWGH", "GYRO", "HEES", "HLG", "HNRG", "HALL", "HALO", "HBK", "HLNE", "HBHC", "HBHCL", "HAFC", "HQCL", "HONE", "HDNG", "HLIT", "HBIO", "HCAP", "HCAPZ", "HAS", "HA", "HCOM", "HWKN", "HWBK", "HYAC", "HYACU", "HYACW", "HAYN", "HDS", "HIIQ", "HCSG", "HQY", "HSTM", "HTLD", "HTLF", "HTBX", "HEBT", "HSII", "HELE", "HMNY", "HMTV", "HNNA", "HSIC", "HTBK", "HFWA", "HCCI", "MLHR", "HRTX", "HSKA", "HX", "HIBB", "SNLN", "HPJ", "HIHO", "HIMX", "HIFS", "HSGX", "HMNF", "HMSY", "HOLI", "HOLX", "HBCP", "HOMB", "HFBL", "HMST", "HMTA", "HTBI", "HOFT", "HOPE", "HFBC", "HBNC", "HZNP", "HRZN", "DAX", "QYLD", "HDP", "HPT", "TWNK", "TWNKW", "HMHC", "HWCC", "HOVNP", "HBMD", "HSNI", "HTGM", "HUBG", "HSON", "HDSN", "HUNT", "HUNTU", "HUNTW", "HBAN", "HBANN", "HBANO", "HBANP", "HURC", "HURN", "HCM", "HBP", "HVBC", "HYGS", "IDSY", "IAC", "IAM", "IAMXR", "IAMXW", "IBKC", "IBKCO", "IBKCP", "ICAD", "IEP", "ICCH", "ICFI", "ICHR", "ICLR", "ICON", "ICUI", "IPWR", "INVE", "IDRA", "IDXX", "IESC", "IROQ", "IFMK", "RXDX", "INFO", "IIVI", "KANG", "IKNX", "ILG", "ILMN", "ISNS", "IMMR", "ICCC", "IMDZ", "IMNP", "IMGN", "IMMU", "IMRN", "IMRNW", "IPXL", "IMPV", "PI", "IMMY", "INCR", "INCY", "INDB", "IBCP", "IBTX", "INDU", "INDUU", "INDUW", "IDSA", "INFN", "INFI", "IPCC", "IFRX", "III", "IFON", "IMKTA", "INWK", "INOD", "IPHS", "IOSP", "ISSC", "INVA", "INGN", "ITEK", "INOV", "INO", "INPX", "INSG", "NSIT", "ISIG", "INSM", "INSE", "IIIN", "PODD", "INSY", "NTEC", "IART", "IDTI", "IMTE", "INTC", "NTLA", "IPCI", "IPAR", "IBKR", "ICPT", "IDCC", "TILE", "LINK", "IMI", "INAP", "IBOC", "ISCA", "IGLD", "IIJI", "IDXG", "XENT", "INTX", "IVAC", "INTL", "ITCI", "IIN", "INTU", "ISRG", "SNAK", "ISTR", "ISBC", "ITIC", "NVIV", "IVTY", "IONS", "IOVA", "IPAS", "DTYS", "DTUS", "DTUL", "DFVS", "DFVL", "FLAT", "DLBS", "STPP", "IPGP", "CSML", "IRMD", "IRTC", "IRIX", "IRDM", "IRDMB", "IRBT", "IRWD", "IRCP", "PMPT", "SLQD", "CSJ", "ISHG", "SHY", "TLT", "IEI", "IEF", "AIA", "COMT", "ISTB", "IXUS", "IUSG", "IUSV", "IUSB", "HEWG", "SUSB", "SUSC", "XT", "FALN", "IFEU", "IFGL", "IGF", "GNMA", "HYXE", "CIU", "IGOV", "EMB", "MBB", "JKI", "ACWX", "ACWI", "AAXJ", "EWZS", "MCHI", "ESGD", "SCZ", "ESGE", "EEMA", "EMXC", "EUFN", "IEUS", "RING", "MPCT", "ENZL", "QAT", "TUR", "UAE", "ESGU", "IBB", "SOXX", "AMCA", "EMIF", "ICLN", "WOOD", "INDY", "IJT", "DVY", "SHV", "CRED", "PFF", "ISRL", "ITI", "ITRI", "ITRN", "ITUS", "IVENC", "IVFGC", "IVFVC", "IXYS", "IZEA", "JJSF", "MAYS", "JBHT", "JCOM", "JASO", "JKHY", "JACK", "JXSB", "JAGX", "JAKK", "JMBA", "JRVR", "SGQI", "JSML", "JSMD", "JASN", "JASNW", "JAZZ", "JD", "JSYN", "JSYNR", "JSYNU", "JSYNW", "JBLU", "JTPY", "JCTCF", "WYIG", "WYIGU", "WYIGW", "JMU", "JBSS", "JOUT", "JNCE", "JNP", "JUNO", "KTWO", "KALU", "KALA", "KALV", "KMDA", "KNDI", "KPTI", "KAAC", "KAACU", "KAACW", "KZIA", "KBLM", "KBLMR", "KBLMU", "KBLMW", "KBSF", "KCAP", "KCAPL", "KRNY", "KELYA", "KELYB", "KMPH", "KFFB", "KERX", "KEQU", "KTEC", "KTCC", "KFRC", "KE", "KBAL", "KIN", "KGJI", "KINS", "KONE", "KNSL", "KIRK", "KTOV", "KTOVW", "KLAC", "KLXI", "KONA", "KOPN", "KRNT", "KOSS", "KWEB", "KTOS", "KRYS", "KLIC", "KURA", "KVHI", "FSTR", "LJPC", "LSBK", "LBAI", "LKFN", "LAKE", "LRCX", "LAMR", "LANC", "LCA", "LCAHU", "LCAHW", "LNDC", "LARK", "LMRK", "LMRKO", "LMRKP", "LE", "LSTR", "LNTH", "LTRX", "RNLC", "LSCC", "LAUR", "LAWS", "LAYN", "LCNB", "LBIX", "LPTX", "LGCY", "LGCYO", "LGCYP", "LTXB", "DDBI", "EDBI", "INFR", "LVHD", "SQLV", "UDBI", "LMAT", "TREE", "LXRX", "LGIH", "LHCG", "LLIT", "LBRDA", "LBRDK", "LEXEA", "LEXEB", "LBTYA", "LBTYB", "LBTYK", "LILA", "LILAK", "LVNTA", "LVNTB", "QVCA", "QVCB", "BATRA", "BATRK", "FWONA", "FWONK", "LSXMA", "LSXMB", "LSXMK", "TAX", "LTRPA", "LTRPB", "LPNT", "LCUT", "LFVN", "LWAY", "LGND", "LTBR", "LPTH", "LLEX", "LMB", "LLNW", "LMNR", "LINC", "LECO", "LIND", "LINDW", "LINU", "LPCN", "LQDT", "LFUS", "LIVN", "LOB", "LIVE", "LPSN", "LKQ", "LMFA", "LMFAW", "LOGI", "LOGM", "CNCR", "LONE", "LTEA", "LOOP", "LORL", "LOXO", "LPLA", "LRAD", "LYTS", "LULU", "LITE", "LMNX", "LUNA", "MBTF", "MACQ", "MACQU", "MACQW", "MIII", "MIIIU", "MIIIW", "MBVX", "MCBC", "MFNC", "MTSI", "MGNX", "MDGL", "MAGS", "MGLN", "MGIC", "CALL", "MNGA", "MGYR", "MHLD", "MSFG", "MMYT", "MBUU", "MLVF", "MAMS", "TUSK", "MANH", "LOAN", "MNTX", "MTEX", "MNKD", "MANT", "MARA", "MCHX", "MARPS", "MRNS", "MKTX", "MRLN", "MAR", "MBII", "MRTN", "MMLP", "MRVL", "MASI", "MTCH", "MTLS", "MPAC", "MPACU", "MPACW", "MTRX", "MAT", "MATR", "MATW", "MXIM", "MXWL", "MZOR", "MBFI", "MBFIO", "MBFIP", "MCFT", "MGRC", "MDCA", "MFIN", "MFINL", "MTBC", "MTBCP", "MNOV", "MDSO", "MDGS", "MDWD", "MEDP", "MEIP", "MLCO", "MLNT", "MLNX", "MELR", "MTSL", "MELI", "MBWM", "MERC", "MBIN", "MRCY", "EBSB", "MRBK", "VIVO", "MRDN", "MRDNW", "MMSI", "MACK", "MRSN", "MRUS", "MLAB", "MESO", "CASH", "MEOH", "MGCD", "MGEE", "MGPI", "MBOT", "MCHP", "MU", "MICT", "MICTW", "MSCC", "MSFT", "MSTR", "MVIS", "RNMC", "MPB", "MTP", "MCEP", "MBCN", "MSEX", "MSBI", "MOFG", "MIME", "MDXG", "MNDO", "MB", "NERV", "MGEN", "MRTX", "MSON", "MIND", "MINDP", "MITK", "MITL", "MKSI", "MMAC", "MINI", "MOBL", "MMDM", "MMDMR", "MMDMU", "MMDMW", "MLNK", "MTEM", "MBRX", "MNTA", "MOMO", "MCRI", "MDLZ", "MGI", "MDB", "MPWR", "TYPE", "MNRO", "MRCC", "MNST", "MSDI", "MSDIW", "MORN", "MOSY", "MTFB", "MTFBW", "MPAA", "MPVD", "MOXC", "MSBF", "MTGE", "MTGEP", "MTSC", "LABL", "MBIO", "MFSF", "MYSZ", "MYL", "MYND", "MYNDW", "MYOK", "MYOS", "MYRG", "MYGN", "NBRV", "NAKD", "NNDM", "NANO", "NSTG", "NAOV", "NH", "NK", "NSSC", "NDAQ", "NTRA", "NATH", "NAUH", "NKSH", "FIZZ", "NCMI", "NCOM", "NESR", "NESRW", "NGHC", "NGHCN", "NGHCO", "NGHCP", "NGHCZ", "NHLD", "NHLDW", "NATI", "NRCIA", "NRCIB", "NSEC", "EYE", "NWLI", "NAII", "NHTC", "NATR", "BABY", "ISM", "JSM", "NAVI", "NBTB", "NCSM", "NKTR", "NEOG", "NEO", "NEON", "NEOS", "NEOT", "NVCN", "NEPT", "UEPS", "NETE", "NTAP", "NTES", "NFLX", "NTGR", "NLST", "NTCT", "NTWK", "CUR", "NBIX", "NURO", "NUROW", "NTRP", "NBEV", "NYMT", "NYMTN", "NYMTO", "NYMTP", "NEWA", "NLNK", "NWS", "NWSA", "NEWS", "NEWT", "NEWTL", "NEWTZ", "NXEO", "NXEOU", "NXEOW", "NXST", "NEXT", "NEXTW", "NFEC", "NODK", "EGOV", "NICE", "NICK", "NCBS", "NITE", "NIHD", "NMIH", "NNBR", "NDLS", "NDSN", "NSYS", "NBN", "NTIC", "NTRS", "NTRSP", "NFBK", "NRIM", "NWBI", "NWPX", "NCLH", "NWFL", "NVFY", "NVMI", "NOVN", "NOVT", "NVAX", "NVLN", "NVCR", "NVUS", "NUAN", "NCNA", "NMRX", "NTNX", "NTRI", "NUVA", "NVTR", "QQQX", "NVEE", "NVEC", "NVDA", "NXPI", "NXTM", "NXTD", "NXTDW", "NYMX", "OIIM", "OVLY", "OCSL", "OCSLL", "OCSI", "OASM", "OBLN", "OBSV", "OBCI", "OPTT", "ORIG", "OCFC", "OCRX", "OCLR", "OFED", "OCUL", "OMEX", "ODP", "OFS", "OHAI", "OVBC", "OHRP", "OKTA", "ODFL", "OLBK", "ONB", "OPOF", "OSBC", "OSBCP", "OLLI", "ZEUS", "OFLX", "OMER", "OMNT", "OMCL", "ON", "OTIV", "ONS", "ONSIW", "ONSIZ", "OMED", "ONTX", "ONTXW", "ONCS", "OHGI", "OTEX", "OPGN", "OPGNW", "OPHT", "OPNT", "OPK", "OBAS", "OCC", "OPHC", "OPTN", "OPB", "ORMP", "OSUR", "ORBC", "ORBK", "ORLY", "OREX", "ONVO", "SEED", "OACQ", "OACQR", "OACQU", "OACQW", "OESX", "ORIT", "ORRF", "OFIX", "KIDS", "OSIS", "OSPR", "OSPRU", "OSPRW", "OSN", "OTEL", "OTIC", "OTTW", "OTTR", "OVAS", "OSTK", "OVID", "OXBR", "OXBRW", "OXFD", "OXLC", "OXLCM", "OXLCO", "PFIN", "PTSI", "PCAR", "PACB", "PEIX", "PMBC", "PPBI", "PCRX", "PACW", "PTIE", "PAAS", "PANL", "PZZA", "FRSH", "PBNC", "PRTK", "PCYG", "PSTB", "PKBK", "PRKR", "PKOH", "PTNR", "PBHC", "PATK", "PNBK", "PATI", "PEGI", "PDCO", "PTEN", "PAVM", "PAVMW", "PAYX", "PCTY", "PYDS", "PYPL", "PBBI", "CNXN", "PCMI", "PCSB", "PCTI", "PDCE", "PDFS", "PDLI", "PDLB", "PDVW", "SKIS", "PGC", "PEGA", "PCO", "PENN", "PVAC", "PFLT", "PNNT", "PWOD", "WRLS", "WRLSR", "WRLSU", "WRLSW", "PEBO", "PEBK", "PFBX", "PFIS", "PBCT", "PBCTP", "PUB", "PRCP", "PPHM", "PPHMP", "PRFT", "PFMT", "PERI", "PESI", "PPIH", "PTX", "PERY", "PGLC", "PETQ", "PETS", "PFSW", "PGTI", "PZRX", "PHII", "PHIIK", "PAHC", "PLAB", "PICO", "PIRS", "PPC", "PME", "PNK", "PNFP", "PPSI", "PXLW", "PLPM", "PLYA", "PLXS", "PLUG", "PLBC", "PSTI", "PLXP", "PBSK", "PNTR", "PCOM", "POLA", "COOL", "POOL", "POPE", "BPOP", "BPOPM", "BPOPN", "PBIB", "PTLA", "PBPB", "PCH", "POWL", "POWI", "PLW", "PKW", "PFM", "PYZ", "PEZ", "PSL", "PIZ", "PIE", "PXI", "PFI", "PTH", "PRN", "DWLV", "PDP", "DWAQ", "DWAS", "DWIN", "DWTR", "PTF", "PUI", "IDLB", "PRFZ", "PAGG", "PSAU", "PIO", "PGJ", "PEY", "IPKW", "PID", "KBWB", "KBWD", "KBWY", "KBWP", "KBWR", "LDRI", "LALT", "PNQI", "PDBC", "QQQ", "USLB", "PSCD", "PSCC", "PSCE", "PSCF", "PSCH", "PSCI", "PSCT", "PSCM", "PSCU", "VRIG", "PHO", "PRAA", "PRAH", "PRAN", "PRPO", "PFBC", "PLPC", "PFBI", "PINC", "LENS", "PSDO", "PRGX", "PSMT", "PBMD", "PNRG", "PRMW", "PRIM", "PVAL", "BTEC", "PXUS", "GENY", "PSET", "PY", "PMOM", "USMC", "PSC", "PDEX", "IPDN", "PFIE", "PGNX", "PRGS", "PFPT", "PRPH", "PRQR", "EQRR", "BIB", "UBIO", "TQQQ", "ZBIO", "SQQQ", "BIS", "PSEC", "PTGX", "PRTO", "PTI", "PRTA", "PVBC", "PROV", "PBIP", "PSDV", "PMD", "PTC", "PTCT", "PULM", "PLSE", "PBYI", "PCYO", "PXS", "QADA", "QADB", "QCRH", "QGEN", "QIWI", "QRVO", "QCOM", "QSII", "QBAK", "QLYS", "QTNA", "QTRH", "QRHC", "QUIK", "QDEL", "QNST", "QUMU", "QTNT", "RRD", "RCM", "RARX", "RADA", "RDCM", "RSYS", "RDUS", "RDNT", "RDWR", "METC", "RMBS", "RAND", "RLOG", "GOLD", "RNDB", "RPD", "RAVE", "RAVN", "RBB", "ROLL", "RICK", "RCMT", "RDI", "RDIB", "RGSE", "RNWK", "RP", "RETA", "RCON", "REPH", "RRGB", "RRR", "RDFN", "RDHL", "REGN", "RGNX", "RGLS", "REIS", "RELV", "MARK", "RNST", "REGI", "ABAC", "RCII", "RGEN", "RPRX", "RBCAA", "FRBK", "REFR", "RSLS", "RESN", "RECN", "HAIR", "ROIC", "RTRX", "RVNC", "RVEN", "RVLT", "RWLK", "REXX", "RFIL", "RGCO", "RYTM", "RIBT", "RIBTW", "RELL", "RIGL", "RNET", "RMNI", "RIOT", "REDU", "RTTR", "RVSB", "RLJE", "RMGN", "ROBO", "RMTI", "RCKY", "RMCF", "ROKU", "ROSE", "ROSEU", "ROSEW", "ROSG", "ROST", "RBPAA", "RGLD", "RPXC", "RTIX", "RBCN", "RMBL", "RUSHA", "RUSHB", "RUTH", "RXII", "RXIIW", "RYAAY", "STBA", "SANW", "SCAC", "SCACU", "SCACW", "SBRA", "SBRAP", "SABR", "SAEX", "SAFT", "SAGE", "SAIA", "SALM", "SAL", "SAFM", "SASR", "SGMO", "SANM", "GCVRZ", "SPNS", "SRPT", "SVRA", "SBFG", "SBFGP", "SBAC", "SCSC", "SMIT", "SCHN", "SCHL", "SGMS", "SCPH", "SNI", "SCYX", "SEAC", "SBCF", "STX", "SHIP", "SHIPW", "SHLD", "SHLDW", "SHOS", "SPNE", "SGEN", "EYES", "EYESW", "SECO", "SCWX", "SNFCA", "SEIC", "SLCT", "SIR", "SELB", "SIGI", "LEDS", "SMTC", "SENEA", "SENEB", "SNES", "SNH", "SNHNI", "SNHNL", "SNMX", "SRTS", "SRTSW", "STNLU", "SQBG", "MCRB", "SREV", "SFBS", "SSC", "SVBI", "SGBX", "SGOC", "SMED", "SHSP", "SHEN", "PIXY", "SHLO", "TYHT", "SHPG", "SCVL", "SHBI", "SSTI", "SFLY", "SIFI", "SIEB", "SNNA", "SIEN", "BSRR", "SRRA", "SWIR", "SIFY", "SIGM", "SGLB", "SGLBW", "SGMA", "SBNY", "SBNYW", "SLGN", "SILC", "SLAB", "SIMO", "SPIL", "SRUN", "SRUNU", "SRUNW", "SAMG", "SSNT", "SFNC", "SLP", "SINA", "SBGI", "SINO", "SVA", "SIRI", "SITO", "SKYS", "SKLN", "SKYW", "SWKS", "SNBR", "SLM", "SLMBP", "RNSC", "SGH", "SND", "SMBK", "SMSI", "SMTX", "LNCE", "SRAX", "SCKT", "SODA", "SOHU", "SLRC", "SUNS", "SEDG", "SLNO", "SLNOW", "SNGX", "SNGXW", "SONC", "SOFO", "SNOA", "SNOAW", "SONS", "SPHS", "SORL", "ROKA", "SRNE", "SOHO", "SOHOB", "SOHOO", "SFBC", "SSB", "SFST", "SMBC", "SONA", "SBSI", "SP", "SGRP", "SPKE", "SPKEP", "ONCE", "SPAR", "SPTN", "DWFI", "SPPI", "SPRO", "ANY", "SPEX", "SPI", "SAVE", "SPLK", "SPOK", "SPWH", "SBPH", "FUND", "SFM", "SPSC", "SSNC", "SSRM", "STAA", "STAF", "STMP", "STLY", "SBLK", "SBLKL", "SBLKZ", "SBUX", "STFC", "STBZ", "STDY", "GASS", "STLD", "SMRT", "STLR", "STLRU", "STLRW", "SBOT", "STML", "SRCL", "SRCLP", "SBT", "STRL", "SHOO", "SSFN", "SFIX", "SYBT", "BANX", "SSKN", "SSYS", "STRT", "STRS", "STRA", "STRM", "SBBP", "STB", "SCMP", "SUMR", "SMMF", "SSBI", "SMMT", "SNBC", "SNHY", "SNDE", "SNSS", "STKL", "SPWR", "RUN", "SBCP", "SUNW", "SMCI", "SPCB", "SCON", "SGC", "SUPN", "SPRT", "SGRY", "SRDX", "SBBX", "SIVB", "SIVBO", "SYKE", "SYMC", "SYNC", "SYNL", "SYNA", "SNCR", "SNDX", "SGYP", "SYBX", "SNPS", "SYNT", "SYMX", "SYPR", "SYRS", "TROW", "TTOO", "TRHC", "TCMD", "TAIT", "TTWO", "TLND", "TNDM", "TLF", "TANH", "TPIV", "TEDU", "TATT", "TAYD", "CGBD", "TCPC", "AMTD", "PETZ", "TECD", "TCCO", "TTGT", "TGLS", "TGEN", "TNAV", "TTEC", "TLGT", "TELL", "TENX", "GLBL", "TERP", "TBNK", "TSRO", "TESO", "TSLA", "TESS", "TTEK", "TTPH", "TCBI", "TCBIL", "TCBIP", "TCBIW", "TXN", "TXRH", "TFSL", "TGTX", "ANDE", "TBBK", "BPRN", "CG", "TCGP", "CAKE", "CHEF", "TCFC", "DSGX", "DXYN", "ENSG", "XONE", "FINL", "FBMS", "FLIC", "GT", "HABT", "HCKT", "HAIN", "CUBA", "INTG", "JYNT", "KEYW", "KHC", "OLD", "MSG", "MDCO", "MEET", "MIK", "MIDD", "NAVG", "SLIM", "STKS", "ORG", "PCLN", "PRSC", "RMR", "SMPL", "SMPLW", "TSG", "TTD", "ULTI", "YORW", "NCTY", "TXMD", "TRPX", "TBPH", "TST", "TCRD", "TICC", "TICCL", "TIG", "TTS", "TIL", "TSBK", "TNTR", "TIPT", "TITN", "TTNP", "TVTY", "TIVO", "TMUS", "TMUSP", "TOCA", "TNXP", "TISA", "TOPS", "TORM", "TRCH", "TSEM", "CLUB", "TOWN", "TPIC", "TCON", "TSCO", "TWMC", "TACT", "TRNS", "TGA", "TA", "TANNI", "TANNL", "TANNZ", "TZOO", "TRMT", "TRVN", "TCBK", "TRIL", "TRS", "TRMB", "TRIB", "TRIP", "TSC", "TBK", "TRVG", "TRNC", "TROV", "TRUE", "THST", "TRUP", "TRST", "TRMK", "TSRI", "TTMI", "TCX", "TUES", "TOUR", "HEAR", "FOX", "FOXA", "TWIN", "TRCB", "TYME", "USCR", "PRTS", "USEG", "GROW", "USAU", "UBNT", "UFPT", "ULTA", "UCTT", "UPL", "RARE", "ULBI", "UMBF", "UMPQ", "UNAM", "UBSH", "UNB", "QURE", "UBCP", "UBOH", "UBSI", "UCBA", "UCBI", "UCFC", "UBNK", "UFCS", "UIHC", "UNFI", "UBFO", "USLM", "UTHR", "UG", "UNIT", "UNTY", "OLED", "UEIC", "UFPI", "ULH", "USAP", "UVSP", "UPLD", "UONE", "UONEK", "URBN", "URGN", "ECOL", "RNDV", "USAT", "USATP", "USAK", "UTMD", "UTSI", "VLRX", "VALX", "VALU", "VNDA", "BBH", "GNRX", "PPH", "VWOB", "VNQI", "VGIT", "VCIT", "VIGI", "VYMI", "VCLT", "VGLT", "VMBS", "VONE", "VONG", "VONV", "VTWO", "VTWG", "VTWV", "VTHR", "VCSH", "VGSH", "VTIP", "VTC", "BNDX", "VXUS", "VEAC", "VEACU", "VEACW", "VREX", "VRNS", "VDSI", "VBLT", "VBIV", "VECO", "DGLD", "DSLV", "UGLD", "USLV", "TVIZ", "TVIX", "ZIV", "XIV", "VIIZ", "VIIX", "VEON", "VRA", "VCYT", "VSTM", "VCEL", "VRNT", "VRSN", "VRSK", "VBTX", "VERI", "VRML", "VRNA", "VSAR", "VTNR", "VRTX", "VERU", "VIA", "VIAB", "VSAT", "VIAV", "VICL", "VICR", "CIZ", "VSDA", "CEY", "CEZ", "CID", "CIL", "CFO", "CFA", "CSF", "CDC", "CDL", "VSMV", "CSB", "CSA", "VBND", "VUSE", "VIDI", "VDTH", "VRAY", "VKTX", "VKTXW", "VBFC", "VLGEA", "VNOM", "VIRC", "VIRT", "VRTS", "VRTSP", "BBC", "BBP", "VRTU", "VTGN", "VTL", "VIVE", "VVPR", "VVUS", "VOD", "VOXX", "VYGR", "VSEC", "VTVT", "VUZI", "WBA", "WAFD", "WAFDW", "WASH", "WFBI", "WSBF", "WVE", "WSTG", "WCFB", "WDFC", "FLAG", "WEB", "WB", "WEBK", "WEN", "WERN", "WSBC", "WTBA", "WABC", "WSTL", "WDC", "WNEB", "WLB", "WPRT", "WWR", "WEYS", "WHLR", "WHLRD", "WHLRP", "WHLRW", "WHF", "WHFBL", "WHLM", "WVVI", "WVVIP", "WLDN", "WLFC", "WLTW", "WIN", "WING", "WINA", "WINS", "WTFC", "WTFCM", "WTFCW", "AGZD", "AGND", "CXSE", "EMCG", "EMCB", "DGRE", "DXGE", "HYZD", "WETF", "DXJS", "GULF", "HYND", "DGRW", "DGRS", "DXPS", "WIX", "WMIH", "WWD", "WDAY", "WKHS", "WRLD", "WPCS", "WMGI", "WMGIZ", "WSFS", "WSCI", "WVFC", "WYNN", "XBIT", "XELB", "XCRA", "XNCR", "XBIO", "XBKS", "XENE", "XGTI", "XGTIW", "XLNX", "GLDI", "SLVO", "XOMA", "XPER", "XPLR", "XTLB", "XNET", "YNDX", "YERR", "YTRA", "YTEN", "YIN", "YOGA", "YGYI", "YRCW", "YECO", "YY", "ZFGN", "ZAGG", "ZLAB", "ZAIS", "ZEAL", "ZBRA", "Z", "ZG", "ZN", "ZNWAA", "ZION", "ZIONW", "ZIONZ", "ZIOP", "ZIXI", "ZKIN", "ZGNX", "ZSAN", "ZUMZ", "ZYNE", "ZNGA"];

/* harmony default export */ __webpack_exports__["a"] = (companies);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ibmconfig = {
    "url": "https://gateway.watsonplatform.net/tone-analyzer/api",
    "username": "69a2d822-e52e-4a12-8c0d-0d022ff46b0b",
    "password": "blexrUrzwy1k"
};

/* harmony default export */ __webpack_exports__["a"] = (ibmconfig);

/***/ })
/******/ ]);
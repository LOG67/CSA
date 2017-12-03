import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import config from '../../config'
import SearchBar from './SearchBar.jsx'
import SideBar from './SideBar.jsx'
import SearchResults from './SearchResults.jsx'


class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      userID: '',
      query: {},
      histories: [],
      result: {}
    }
  }


  componentDidMount() {
    init()
    auth()
  }

  update(query) {
    this.setState({...this.state, query: query})
  }

  historySearch(results) {
    this.setState({...this.state, results: results})
  }

  historyClick(index) {
    this.update();
  }


  render() {
    var BackgroundPath = "./images/background_image.jpg"
    var sectionStyle = {
      width: "100%",
      height: "60px",
      backgroundImage: `url(${BackgroundPath})`
    };

    var res = [
      {
        quotes: [],
        query: {
          companySymbol: "SAMG",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "GOOGL",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "APPL",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "AMAZON",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "SAMG",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "GOOGL",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "APPL",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "AMAZON",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "APPL",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
      {
        quotes: [],
        query: {
          companySymbol: "AMAZON",
          from: "12-21-2015",
          to: "12-21-2016",
        },
      },
    ]

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark navbar-fixed-top"
             style={sectionStyle}>
          <a className="navbar-brand" href="#">Company Sentiment Analyzer</a>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                  data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <button className="btn btn-dark btn-lg" type="login">Login</button>
            </form>
          </div>
        </nav>

        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-3 col-md-2 bg-dark text-light sidebar">
              <h5 className="text-center text">History</h5>
              <SideBar results={res}/>
            </div>
            <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
              {/*-- <div id="firebaseui-auth-container"></div>*/}
              <SearchBar
                query={this.state.query}
                updater={(newQuery) => this.update(newQuery)}/>
              <hr/>
              <div className="row">
                <SearchResults
                  results={this.state.result}
                  updater={(oldResults) => this.historySearch(oldResults)}/>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>
                <p><h1>These are results!!!!!</h1></p>





              </div>
            </main>
          </div>
        </div>

      </div>
    )
  }
}


function auth() {

  var uiConfig = {
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: function (currentUser, credential, redirectUrl) {
        // Do something.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false
      }
    }
  }

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth())
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig)

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      alert(user.uid)
    }
  })
}

function init() {
  firebase.initializeApp(config)
}

const root = document.getElementById('app')
ReactDOM.render(
  <App/>
  , root)

/*
    State: {
    userID: t.String,
    query: t.Query,
    result: t.Result,
    histories: [t.History]
}

History: {
    query: t.Query,
    result: t.Result,
}

Query: {
    companySymbol: t.String,
    startDate: t.String,
    endDate: t.String,
}

Result: {
    quotes: [t.Quote],
    tone: t.Tone
}

Tone: {
    ??
}

Quote: {
    date: t.String,
    open: t.Number,
    close: t.Number,
    volume: t.Number
}
*/

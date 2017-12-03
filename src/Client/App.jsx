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
    this.setState({ ...this.state, query: query})
  }

  historyClick(index) {
    this.update();
  }


  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark navbar-fixed-top bg-dark">
          <a className="navbar-brand" href="#">CSA</a>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                  data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Search <span class="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Archive</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
              <SideBar results={['a', 'b', 'c']}/>
            </nav>
            <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
              {/*-- <div id="firebaseui-auth-container"></div>*/}
              <section class="row text-center placeholders">
                <div className="col">
                  <div className="row">
                    <SearchBar
                      query={ this.state.query}
                      updater={(newQuery) => this.update(newQuery)}/>
                  </div>
                  <hr />
                  <div className="row text-center">
                    <SearchResults/>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                    <h1>TEST!!!!!</h1>
                  </div>
                </div>
              </section>
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
    // ui.start('#firebaseui-auth-container', uiConfig)

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            alert(user.uid)
            firebase.auth().currentUser.getToken(true).then(function(idToken) {
                console.log(idToken)
            }).catch(function(error) {
                // Handle error
            });
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

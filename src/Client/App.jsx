import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import config from '../../config.js'
import SearchBar from './SearchBar.jsx'
import SideBar from './SideBar.jsx'
import SearchResult from './SearchResult.jsx'
import NavBar from './NavBar.jsx'
import ErrowBar from "./ErrorBar.jsx"

import dummyData from './DummyData.json'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            username: 'Mehran',
            query: {},
            histories: dummyData.histories,
            result: dummyData.result
        }
    }


    componentDidMount() {
        init()
        auth()
    }


    // Event Handlers

    onLogoutPressed() {
        console.log('here')
    }

    onSubmitPressed(query) {
        this.setState({...this.state, query: query})
    }

    historySearch(results) {
        this.setState({...this.state, results: results})
    }

    historyClick(index) {
        this.update();
    }

    // {/*-- <div id="firebaseui-auth-container"></div>*/}

    render() {
        return (
            <div>
                <NavBar
                    username={this.state.username}
                    onLogoutPressed={() => this.onLogoutPressed}
                />
                <div>
                <ErrowBar />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-md-2">
                            <div className=" sidebar-light sidebar mt-md-3"
                                 style={{backgroundColor:"#ff8533"}}>
                                <h5 className="text-center text  ">History</h5>
                                <SideBar results={this.state.histories}/>
                            </div>
                        </div>
                        <div className="col col-sm-9 ml-sm-auto col-md-10 bg-light text-dark">
                            <div className=" mt-md-3">
                            <SearchBar
                                query={this.state.query}
                                onSubmitPressed={(newQuery) => this.onSubmitPressed(newQuery)}
                            />
                            </div>
                            <hr/>
                            <div className="row">
                                <SearchResult
                                    result={this.state.result}
                                />
                            </div>
                        </div>
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

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken(true).then(idToken => {
                    console.log(idToken)
                }).catch(function(error) {
                    console.log(error)
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
        histories: [t.History],
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
tone: t.Tone,
}

Tone: {
??
}

Quote: {
date: t.String,
open: t.Number,
close: t.Number,
volume: t.Number,
}
*/

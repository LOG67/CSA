import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import axios from 'axios'
import _ from 'lodash'

import config from '../../config.js'
import SearchBar from './SearchBar.jsx'
import SideBar from './SideBar.jsx'
import SearchResult from './SearchResult.jsx'
import NavBar from './NavBar.jsx'
import ErrorBar from "./ErrorBar.jsx"

import dummyData from './DummyData.json'

const SERVER_URL = 'http://localhost:3000/'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            username: '',
            query: {},
            histories: [],
            result: {},
            errors: [],
        }
    }


    componentDidMount() {
        init(this)
        auth()
    }


    // Event Handlers

    onLogoutPressed() {
        firebase.auth().signOut().then(() => {
            this.setState({...this.state, username: ""})
        }).catch(error => {
            console.log("logout error")
        })
        auth()
    }

    onQueryChanged(query) {
        this.setState({ ...this.state, query})
    }

    onSubmitPressed(errors) {
        console.log("errors: " + errors)
        this.setState({ ...this.state, errors })
        if (errors.length > 0) {
            return
        }

        firebase.auth().currentUser.getIdToken(true).then(idToken => {
            let url = SERVER_URL + 'query/symbol/' + this.state.query.companySymbol + '/from/' +
            this.state.query.from + '/to/' + this.state.query.to + '/token/' + idToken
            return axios.get(url)
        }).then(res => {
            this.setState({...this.state, result: res.data})
        }).catch(function(error) {
            console.log(error)
        })
    }

    onHistorySelected(index) {
        const result = this.state.histories[index]
        const query = result.query
        this.setState({ ...this.state, result, query })
    }

    onErrorDismissed() {
        this.setState({...this.state, errors:[]})

    }
    /* objectSpread*/


    render() {
        return (
            <div>
                <NavBar
                    username={this.state.username}
                    onLogoutPressed={() => this.onLogoutPressed()}
                />
                <div>
                    <ErrorBar  errors={this.state.errors}
                        dismiss={() => this.onErrorDismissed()}/>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-md-2">
                                <div className=" sidebar-light sidebar mt-md-3"
                                    style={{backgroundColor:"#ff8533"}}>
                                    <h5 className="text-center text  ">History</h5>
                                    <SideBar
                                        histories={this.state.histories}
                                        onHistorySelected={i => this.onHistorySelected(i)}
                                    />
                                </div>
                            </div>
                            <div className="col col-sm-9 ml-sm-auto col-md-10 bg-light text-dark">
                                <div className=" mt-md-3">
                                    <SearchBar
                                        query={this.state.query}
                                        onSubmitPressed={(errors) => this.onSubmitPressed(errors)}
                                        onQueryChanged={newQuery => this.onQueryChanged(newQuery)}
                                    />
                                </div>
                                <hr/>
                                <div className="row">
                                    <SearchResult
                                        result={this.state.result}
                                    />
                                </div>
                                <div id="firebaseui-auth-container"></div>
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
                    return false
                }
            },
        }

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth())
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig)
    }

    function init(app) {
        firebase.initializeApp(config)
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref(`users/${user.uid}/histories`).on('value', snap => {
                    const historyObjects = snap.val() || {}
                    const unsortedHistories = _.values(historyObjects)
                    const histories = _.sortBy(unsortedHistories, ['date']).reverse()
                    app.setState({ ...app.state, histories }, () => {
                        if (_.isEmpty(app.state.result) && !_.isEmpty(app.state.histories)) {
                            app.setState({ ...app.state,
                                result: histories[0],
                                query: histories[0].query,
                                username: user.displayName
                            })
                        }
                    })
                })
            } else {
                app.setState({...app.state, username: ""})
            }
        })
    }


    const root = document.getElementById('app')
    ReactDOM.render(<App/>, root)

    /*
    State: {
    userID: t.String,
    query: t.Query,
    result: t.Result,
    histories: [t.Result],
}

Result: {
query: t.Query,
quotes: [t.Quote],
tone: t.Tone,
date: t.String,
}

Query: {
companySymbol: t.String,
startDate: t.String,
endDate: t.String,
}

Tone: {
??
}

Quote: {
qDate: t.String,
open: t.Number,
close: t.Number,
volume: t.Number,
}
*/

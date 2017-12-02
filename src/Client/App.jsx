import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import config from '../../config'
import SearchBar from './SearchBar.jsx'
import SideBar from './SideBar.jsx'
import SearchResults from './SearchResults.jsx'


class App extends Component {

    componentDidMount() {
        init()
        auth()
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                        <SideBar results={['a', 'b', 'c']}/>
                    </nav>
                    <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
                        <h1>CSA</h1>
                        <div id="firebaseui-auth-container"></div>
                        <section class="row text-center placeholders">
                            <SearchBar/>
                            <SearchResults/>
                        </section>
                    </main>
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
ReactDOM.render(<App/>, root)

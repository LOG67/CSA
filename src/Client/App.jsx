import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import config from '../../config'


class App extends Component {

  componentDidMount() {
    init()
    auth()
  }

  render() {
    return (
      <div>
        <div>
          CSA: Company Sentiment Analyzer
        </div>
        <div id="firebaseui-auth-container"></div>
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
          signInSuccess: function(currentUser, credential, redirectUrl) {
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
        // this.uid = user.uid;
        // firebase.database().ref(`users/${this.uid}/notes`).on('value', (snap) => {
        //   const notesObjs = snap.val() || {};
        //   const notes = _.values(notesObjs);
        //   this.notes = notes
        //   .map(n => (n.tags ? n : { ...n, tags: [] }));
        //   // .map(n => (n.body ? n.body : ''))
        //   // .map(n => (n.updated_at ? n.updated_at : 0))
        //   this.subscribers.map(f => f(this.notes));
        // });
      }
    });

    // firebase.auth().signInAnonymously()

}

function init() {
  firebase.initializeApp(config)
}

const root = document.getElementById('app')
ReactDOM.render(<App />, root)

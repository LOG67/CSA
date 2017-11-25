import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import config from '../../config'


class App extends Component {

  componentDidMount() {
    auth()
  }

  render() {
    return (
      <div>
        Welcome to React!
      </div>
    )
  }
}



function auth() {
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

    firebase.auth().signInAnonymously()
}

firebase.initializeApp(config)

const root = document.getElementById('app')
ReactDOM.render(<App />, root)

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
            <body>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a class="navbar-brand" href="#">Dashboard</a>
                    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                        </ul>
                        <form class="form-inline mt-2 mt-md-0">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Login <span class="sr-only">(current)</span></a>
                            </li>
                        </form>
                    </div>
                </nav>
            </header>

            <div class="container-fluid">
                <div class="row">
                    <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Overview <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Reports</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Analytics</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Export</a>
                            </li>
                        </ul>

                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Nav item</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="">Nav item again</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/dashboard/#">One
                                    more nav</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/dashboard/#">Another
                                    nav item</a>
                            </li>
                        </ul>

                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/dashboard/#">Nav
                                    item again</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/dashboard/#">One
                                    more nav</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/dashboard/#">Another
                                    nav item</a>
                            </li>
                        </ul>
                    </nav>

                    <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
                        <h1>Dashboard</h1>


                        <section class="row text-center placeholders">
                            <div class="col-6 col-sm-3 placeholder">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs="
                                     width="200" height="200" class="img-fluid rounded-circle"
                                     alt="Generic placeholder thumbnail"></img>
                                <h4>Label</h4>
                                <div class="text-muted">Something else</div>
                            </div>
                            <div class="col-6 col-sm-3 placeholder">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs="
                                     width="200" height="200" class="img-fluid rounded-circle"
                                     alt="Generic placeholder thumbnail"></img>
                                <h4>Label</h4>
                                <span class="text-muted">Something else</span>
                            </div>
                            <div class="col-6 col-sm-3 placeholder">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs="
                                     width="200" height="200" class="img-fluid rounded-circle"
                                     alt="Generic placeholder thumbnail"></img>
                                <h4>Label</h4>
                                <span class="text-muted">Something else</span>
                            </div>
                            <div class="col-6 col-sm-3 placeholder">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs="
                                     width="200" height="200" class="img-fluid rounded-circle"
                                     alt="Generic placeholder thumbnail"></img>
                                <h4>Label</h4>
                                <span class="text-muted">Something else</span>
                            </div>
                        </section>

                        <h2>Section title</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Header</th>
                                    <th>Header</th>
                                    <th>Header</th>
                                    <th>Header</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1,001</td>
                                    <td>Lorem</td>
                                    <td>ipsum</td>
                                    <td>dolor</td>
                                    <td>sit</td>
                                </tr>
                                <tr>
                                    <td>1,002</td>
                                    <td>amet</td>
                                    <td>consectetur</td>
                                    <td>adipiscing</td>
                                    <td>elit</td>
                                </tr>
                                <tr>
                                    <td>1,003</td>
                                    <td>Integer</td>
                                    <td>nec</td>
                                    <td>odio</td>
                                    <td>Praesent</td>
                                </tr>
                                <tr>
                                    <td>1,003</td>
                                    <td>libero</td>
                                    <td>Sed</td>
                                    <td>cursus</td>
                                    <td>ante</td>
                                </tr>
                                <tr>
                                    <td>1,004</td>
                                    <td>dapibus</td>
                                    <td>diam</td>
                                    <td>Sed</td>
                                    <td>nisi</td>
                                </tr>
                                <tr>
                                    <td>1,005</td>
                                    <td>Nulla</td>
                                    <td>quis</td>
                                    <td>sem</td>
                                    <td>at</td>
                                </tr>
                                <tr>
                                    <td>1,006</td>
                                    <td>nibh</td>
                                    <td>elementum</td>
                                    <td>imperdiet</td>
                                    <td>Duis</td>
                                </tr>
                                <tr>
                                    <td>1,007</td>
                                    <td>sagittis</td>
                                    <td>ipsum</td>
                                    <td>Praesent</td>
                                    <td>mauris</td>
                                </tr>
                                <tr>
                                    <td>1,008</td>
                                    <td>Fusce</td>
                                    <td>nec</td>
                                    <td>tellus</td>
                                    <td>sed</td>
                                </tr>
                                <tr>
                                    <td>1,009</td>
                                    <td>augue</td>
                                    <td>semper</td>
                                    <td>porta</td>
                                    <td>Mauris</td>
                                </tr>
                                <tr>
                                    <td>1,010</td>
                                    <td>massa</td>
                                    <td>Vestibulum</td>
                                    <td>lacinia</td>
                                    <td>arcu</td>
                                </tr>
                                <tr>
                                    <td>1,011</td>
                                    <td>eget</td>
                                    <td>nulla</td>
                                    <td>Class</td>
                                    <td>aptent</td>
                                </tr>
                                <tr>
                                    <td>1,012</td>
                                    <td>taciti</td>
                                    <td>sociosqu</td>
                                    <td>ad</td>
                                    <td>litora</td>
                                </tr>
                                <tr>
                                    <td>1,013</td>
                                    <td>torquent</td>
                                    <td>per</td>
                                    <td>conubia</td>
                                    <td>nostra</td>
                                </tr>
                                <tr>
                                    <td>1,014</td>
                                    <td>per</td>
                                    <td>inceptos</td>
                                    <td>himenaeos</td>
                                    <td>Curabitur</td>
                                </tr>
                                <tr>
                                    <td>1,015</td>
                                    <td>sodales</td>
                                    <td>ligula</td>
                                    <td>in</td>
                                    <td>libero</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
            <SideBar results={['a', 'b', 'c']}/>
            <SearchBar/>
            <SearchResults/>
            <div id="firebaseui-auth-container"></div>
            </body>

            /*
            <div>
                <div>
                </div>

            </div>*/
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

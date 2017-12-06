import React, { Component } from 'react'

export default class NavBar extends Component {
    onLogoutPressed(e) {
        this.props.onLogoutPressed()
        e.preventDefault()
        this.showLogout = false
    }

    render() {
        var showLogout = false;
        if (this.props.username.length === 0) {
            showLogout = false;
        } else {
            showLogout = true;
        }
        return (
            <nav
                className="navbar navbar-light navbar-fixed-top"
                style={{backgroundColor:"#ff8533"}}>
                <a
                    className="navbar-brand"
                    href="#">
                    Company Sentiment Analyzer
                </a>
                <div style={showLogout ? {visibility: 'visible'} :
                                        {display: 'none'}}>
                    <form>
                        <label>{'Hello, ' + this.props.username}</label>
                        <button
                            className="btn btn-dark mb-3 mb-md-0 ml-md-4 mr-md-1"
                            type="submit"
                            onClick={(e) => this.onLogoutPressed(e)}>
                            Logout
                        </button>
                    </form>
                </div>
            </nav>
        )
    }
}

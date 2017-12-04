import React, { Component } from 'react'

export default class NavBar extends Component {

    onLogoutPressed(e) {
        this.props.onLogoutPressed()
        e.preventDefault()
    }

    render() {
        var BackgroundPath = "./images/background_image.jpg"
        var sectionStyle = {
            width: "100%",
            height: "60px",
            backgroundImage: `url(${BackgroundPath})`,
        }
        return (
            <nav
                className="navbar navbar-dark navbar-fixed-top"
                style={sectionStyle}>
                <a
                    className="navbar-brand"
                    href="#">
                    Company Sentiment Analyzer
                </a>
                <form>
                    <label>{'Hello, ' + this.props.username}</label>
                    <button
                        class="btn btn-default mb-3 mb-md-0 ml-md-3"
                        type="submit"
                        onClick={(e) => this.onLogoutPressed(e)}>
                        Logout
                    </button>
                </form>
            </nav>
        )
    }
}

import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        var BackgroundPath = "./images/background_image.jpg"
        var sectionStyle = {
            width: "100%",
            height: "60px",
            backgroundImage: `url(${BackgroundPath})`,
        }
        return (
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
        )
    }
}

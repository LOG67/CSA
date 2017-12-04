import React, { Component } from 'react'

export default class ErrorBar extends Component {

    render() {
        let errorMsg = "Error Bar is here.";
        return (
            <h1>{errorMsg}</h1>
        )
    }
}
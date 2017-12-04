import React, { Component } from 'react'

export default class ErrorBar extends Component {


    render() {
        var showError = true
        let errorMsg = "Error Bar is here."
        let res = this.props.errorArray
        if (res.length === 0) {
            showError = false
        }
        return (
            <div
                className="mx-auto"
                id="errorEleID"
                style={showError ? {visibility: 'visible'} : {display: 'none'}}>
                {res.map(i => {
                    return <div>{i}</div>
                })}
                <button
                    className="btn btn-dark"
                    id='errorBtn'
                    onClick={console.log("test")}>
                    Dismiss
                </button>

            </div>
        )
    }
}

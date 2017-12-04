import React, { Component } from 'react'

export default class ErrorBar extends Component {

    render() {
        let errorMsg = "Error Bar is here.";
        return (
            <div
                className="test"
                style={{visibility: this.props.showError ? 'visible' : 'hidden'}}>
                {errorMsg}
            </div>
        )
    }
}

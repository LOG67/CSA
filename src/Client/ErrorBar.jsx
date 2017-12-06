import React, { Component } from 'react'

export default class ErrorBar extends Component {



    render() {
        var showError = true
        let errorMsg = "Error Bar is here."
        let res = this.props.errors
        console.log(res);
        if (res.length === 0) {
            showError = false
        }
        return (
            <div
                className="alert alert-danger text-center"
                id="errorEleID"
                style={showError ? {visibility: 'visible'} : {display: 'none'}}>
                <button type="button" class="close" aria-label="Close"
                    onClick={this.props.dismiss}
                    >
                    <span aria-hidden="true">&times;</span>
                </button>
                {res.map(i => {
                    return <div>{i}</div>
                })}

            </div>
        )
    }
}

/*<button
    className="btn btn-dark">
    Dismiss
</button>*/

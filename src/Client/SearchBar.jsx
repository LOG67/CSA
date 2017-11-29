import React, {PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import muiThemeable from 'material-ui/styles/muiThemeable'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import { TextField } from 'redux-form-material-ui'
import companies from 'companies'

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {value: ''};
    }

    handleSubmit(e) {
        this.state.name
        event.preventDefault()

    }

    handleChangeName(e) {
        setState({...this.state, name: e.target.value})
        event.preventDefault()
    }

    handleChangeFromDate(e) {
        setState({...this.state, fromDate: e.target.value})
        event.preventDefault()
    }

    handleChangeToDate(e) {
        setState({...this.state, toDate: e.target.value})
        event.preventDefault()
    }


    /*() => expression

    function () {
        return expression
    }*/

    render() {
        const { submitting } = this.props

        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <input type="text"
                       value={this.state.name}
                       onChange={e => this.handleChangeName(e)}
                       placeholder='Company Name' />
                <input type="text"
                       value={this.state.fromDate}
                       onChange={e => this.handleChangeFromDate(e)}
                       placeholder='Company Name' />
                <input type="text"
                       value={this.state.toDate}
                       onChange={e => this.handleChangeToDate(e)}
                       placeholder='Company Name' />

                <RaisedButton
                    fullWidth
                    style={{ marginTop: '26px' }}
                    buttonStyle={{
                        backgroundColor: this.props.muiTheme.palette.accent1Color,
                    }}
                    labelColor={this.props.muiTheme.palette.alternateTextColor}
                    type=''
                    label='Analyze'
                    disabled={submitting} />

                <Snackbar
                    open={this.state.showErrorMessage}
                    message={this.state.errorMessage}
                    action='Dismiss'
                    autoHideDuration={this.props.errorAutoHideDuration}
                    onActionTouchTap={this.handleDismissErrorMessage}
                    onRequestClose={this.handleDismissErrorMessage}
                />

            </form>
        )
    }
}
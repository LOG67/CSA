import React, {PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import muiThemeable from 'material-ui/styles/muiThemeable'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import { TextField } from 'redux-form-material-ui'

class searchBar extends Component {

    render() {
        const { companyName, fromDate, toDate, submitting } = this.props

        return (
            <form onSubmit={(err) => {
                let errorMessage;

                /*if (err.errors.old_password) {
                    errorMessage = 'Please double-check your current password and try again.'
                } else if (err.errors.new_password2) {
                    errorMessage = err.errors.new_password2[0]
                } else {
                    errorMessage = 'Unable to update password'
                }*/
                // error checking

                this.setState({
                    showErrorMessage: true,
                    errorMessage,
                })
            }}>

                <Field
                    fullWidth
                    name='Company Name'
                    component={TextField}
                    type=''
                    inputStyle={{
                        color: black,
                    }}

                    validate={(companyName) => {
                        if (!companyName) {
                            return 'This is a required field'
                        }
                    }}

                    floatingLabelText='Company Name' />

                <Field
                    fullWidth
                    name='From Date'
                    component={TextField}
                    type=''
                    inputStyle={{
                        color: black,
                    }}

                    validate={(fromDate) => {
                        if (!fromDate) {
                            return 'This is a required field'
                        }
                    }}

                    floatingLabelText='From Date' />

                <Field
                    fullWidth
                    name='To Date'
                    component={TextField}
                    type=''
                    inputStyle={{
                        //color: this.props.muiTheme.palette.accent1Color,
                        color: black,
                    }}

                    validate={(toDate) => {
                        if (!toDate) {
                            return 'This is a required field'
                        }
                        /*else if (allValues.newPassword !== allValues.confirmNewPassword) {
                          return 'Passwords do not match'
                        }*/
                    }}

                    floatingLabelText ='To Date' />

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
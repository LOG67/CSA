import React, {PropTypes, Component } from 'react'
//import companies from './companies.js'

export default class SearchBar extends Component {
    constructor() {
        super();
        this.state = {name: '', fromDate: '', toDate: ''};
    }

    handleSubmit(e) {
        alert(this.state.name)
        event.preventDefault()

    }

    handleChangeName(e) {
        this.setState({name: e.target.value})
        event.preventDefault()
    }

    handleChangeFromDate(e) {
        this.setState({fromDate: e.target.value})
        event.preventDefault()
    }

    handleChangeToDate(e) {
        this.setState({toDate: e.target.value})
        event.preventDefault()
    }


    /*() => expression

    function () {
        return expression
    }*/

    render() {

        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <input type="text"
                       value={this.state.name}
                       onChange={e => this.handleChangeName(e)}
                       placeholder='Company Name' />
                <input type="text"
                       value={this.state.fromDate}
                       onChange={e => this.handleChangeFromDate(e)}
                       placeholder='From Date: MM/DD' />
                <input type="text"
                       value={this.state.toDate}
                       onChange={e => this.handleChangeToDate(e)}
                       placeholder='To Date: MM/DD' />
                <input type="submit"
                       value="Search"/>

            </form>
        )
    }
}
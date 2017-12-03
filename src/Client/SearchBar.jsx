import React, {PropTypes, Component } from 'react'
//import companies from './companies.js'

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {name: props.query.companySymbol, fromDate: props.query.from, toDate: props.query.to};
    }

    handleSubmit(e) {
        props.updater({symbol: this.state.name, from: this.state.fromDate, to: this.state.toDate})
        alert(this.state.name)
        e.preventDefault()
    }

    handleChangeName(e) {
        this.setState({name: e.target.value})
        e.preventDefault()
    }

    handleChangeFromDate(e) {
        this.setState({fromDate: e.target.value})
        e.preventDefault()
    }

    handleChangeToDate(e) {
        this.setState({toDate: e.target.value})
        e.preventDefault()`q`
    }


    /*() => expression

    function () {
        return expression
    }*/

    render() {
        this.props.updater();
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
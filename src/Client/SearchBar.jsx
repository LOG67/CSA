import React, {PropTypes, Component} from 'react'
import moment from 'moment'

import companies from '../../companies.js'


export default class SearchBar extends Component {

    handleSubmit(e) {
        let { companySymbol, to, from } = this.props.query
        // first validate the inputs
        var errors = []
        if (!companies.includes(companySymbol)) {
            errors.push('Provide a valid company symbol!')
        }
        if (!moment(from, 'MM-DD-YYYY').isValid()) {
            errors.push('Provide a valid start date!')
        }
        if (!moment(to, 'MM-DD-YYYY').isValid()) {
            errors.push('Provide a valid end date!')
        }
        this.props.onSubmitPressed(errors)
        e.preventDefault()
    }

    handleChangeName(e) {
        let companySymbol = e.target.value.toUpperCase()
        this.props.onQueryChanged({ ...this.props.query, companySymbol })
    }

    handleChangeFromDate(e) {
        let from = e.target.value
        this.props.onQueryChanged({ ...this.props.query, from })
    }

    handleChangeToDate(e) {
        let to = e.target.value
        this.props.onQueryChanged({ ...this.props.query, to })
    }


    render() {
        let { companySymbol, from, to } = this.props.query
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-row">
                    <input className="form-control col-4"
                           type="text"
                           value={companySymbol}
                           onChange={e => this.handleChangeName(e)}
                           placeholder='Company Name'/>

                    <div className="form-group col">
                        <div className='input-group date'>
                            <input className="form-control "
                                   type="text"
                                   value={from}
                                   onChange={e => this.handleChangeFromDate(e)}
                                   placeholder='From MM/DD/YYYY'
                                   id="date"/>
                        </div>
                    </div>

                    <div class="form-group col">
                        <div class='input-group date' >
                            <input className="form-control "
                                   type="text"
                                   value={to}
                                   onChange={e => this.handleChangeToDate(e)}
                                   placeholder='To MM/DD/YYYY'
                                   id="date2"/>
                        </div>
                    </div>
                    <button className="btn btn-dark text-center ml-md-4 mr-md-2" type="submit">Search</button>
                </div>
            </form>
        )
    }
}

import React, {PropTypes, Component} from 'react'


export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.query.companySymbol,
            fromDate: props.query.from,
            toDate: props.query.to,
        }
    }

    handleSubmit(e) {
        this.props.onSubmitPressed({
            companySymbol: this.state.name,
            from: this.state.fromDate,
            to: this.state.toDate,
        })
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
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div className="form-row">
                    <div className="col-4">
                        <input className="form-control "
                            type="text"
                            value={this.state.name}
                            onChange={e => this.handleChangeName(e)}
                            placeholder='Company Name'/>
                        </div>
                        <div className="col">
                            <input className="form-control "
                                type="text"
                                value={this.state.fromDate}
                                onChange={e => this.handleChangeFromDate(e)}
                                placeholder='From MM/DD/YYYY'/>
                            </div>
                            <div className="col">
                                <input className="form-control"
                                    type="text"
                                    value={this.state.toDate}
                                    onChange={e => this.handleChangeToDate(e)}
                                    placeholder='To MM/DD/YYYY'/>
                                </div>
                                <button className="btn btn-dark text-center" type="submit">Search</button>
                            </div>
                        </form>
                    )
                }
            }

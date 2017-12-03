import React, {PropTypes, Component } from 'react'

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {results : props.results};
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.state.results.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<li key={i}> <a href={"#"}> {results[i]}</a></li>);
        }
        return (
            <ul className="list-unstyled text-center">
                {rows}
            </ul>
        )
    }
}
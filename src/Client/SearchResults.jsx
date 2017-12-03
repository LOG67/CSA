import React, {PropTypes, Component } from 'react'

export default class SearchResults extends Component {

    render() {
        var results = this.props.results;
        return (
            <ul>
                {results}
            </ul>
        )
    }
}
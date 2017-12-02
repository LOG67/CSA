import React, {PropTypes, Component } from 'react'

export default class SideBar extends Component {


    /*() => expression

    function () {
        return expression
    }*/

    render() {
        var history = this.props.results;
        var rows = [];
        for (var i = 0; i < history.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<li key={i}> <a> {history[i]}</a></li>);
        }
        return (
                <ul>
                    {rows}
                </ul>
        )
    }
}
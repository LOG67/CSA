import React, { Component } from 'react'

export default class SideBar extends Component {
  render() {
    let rows = this.props.histories.map((history, i) => {
        return (
            <HistoryRow
                index={i}
                key={i}
                query={history.query}
                onHistorySelected={index => this.props.onHistorySelected(index)}
            />
        )
    })

    return (
      <ul className="list-group text-center">
        {rows}
      </ul>

    )
  }
}

class HistoryRow extends Component {
    render() {
        let { query, onHistorySelected, index } = this.props
        let text = `${query.companySymbol} ${query.from} to ${query.to}`
        return (
            <li className="list-group-item">
                <a href="#" onClick={e => onHistorySelected(index)}>
                    { text }
                </a>
            </li>
        )
    }
}

import React, {PropTypes, Component} from 'react'

export default class SideBar extends Component {


  /*() => expression

  function () {
      return expression
  }*/

  render() {
    var res = this.props.results;
    var rows = [];


    for (var i = 0; i < res.length; i++) {
      // note: we add a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      if (i === 0) {
        rows.push(<li className="list-group-item " key={i}><a href={"#"}>
          {`${res[i].query.companySymbol}\n${res[i].query.from} to ${res[i].query.to}` + '\n'}</a></li>);
      } else {

        rows.push(<li className="list-group-item" key={i}><a href={"#"}>
          {`${res[i].query.companySymbol}\n${res[i].query.from} to ${res[i].query.to}` + '\n'}</a></li>);
      }
    }
    return (
      <ul className="list-group text-center">
        {rows}
      </ul>

    )
  }
}
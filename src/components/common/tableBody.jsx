import React, { Component } from 'react'

export default class tableBody extends Component {
  render() {
    const {data,columns}=this.props;
    return (
        <tbody>
        {data.map(item =>
            <tr>
                {columns.map(column =><td></td>)}
            </tr>
            )}
        </tbody>
    )
  }
}

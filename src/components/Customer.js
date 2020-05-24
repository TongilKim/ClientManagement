import React, { Component } from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import CustomerDelete from './CustomerDelete'

export default class Customer extends Component {
    render() {
        return (
            <>
                <TableRow>
                    <TableCell>{this.props.id}</TableCell>
                    <TableCell><img src={this.props.image} style={{ maxWidth: 64, maxHeight: 64 }} /></TableCell>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell>{this.props.birthday}</TableCell>
                    <TableCell>{this.props.gender}</TableCell>
                    <TableCell>{this.props.job}</TableCell>
                    <TableCell>
                        <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
                </TableRow>
            </>
        )
    }
}

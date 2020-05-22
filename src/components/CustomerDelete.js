import React, { Component } from 'react'
import { Typography, Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core'
export default class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }
    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
    handleClickDelete = () => {
        this.setState({
            modalOpen: true
        })
    }
    handleClickClose = () => {
        this.setState({

            modalOpen: false
        })
    }
    render() {
        return (
            <div>
                <Button size="small" variant="contained" color="secondary" onClick={this.handleClickDelete}>Delete</Button>
                <Dialog open={this.state.modalOpen} onClost={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}>
                        Delete
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            Are you sure deleting this client?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>Delete</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { post } from 'axios'
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, withStyles } from '@material-ui/core'
import '../App.css'
const styles = e => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthDay: '',
            gender: '',
            job: '',
            fileName: '',
            modalOpen: false,
            nameError: "",
            birthDayError: "",
            genderError: "",
            jobError: "",
            fileError: ""
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const isValid = this.validate();

        if (isValid) {
            this.addCustomer()
                .then((response) => {
                    //console.log(response.data);
                    this.props.stateRefresh();
                })
            this.setState({
                file: null,
                userName: '',
                birthDay: '',
                gender: '',
                job: '',
                fileName: '',
                modalOpen: false
            })
        }
        else {
            console.log("empty");
        }

    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], // it's maybe binary or hex numbers of the image which is unknown
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    addCustomer = () => {
        const requestUrl = 'https://clientmanagement-server.herokuapp.com';
        const url = requestUrl + '/api/customers';
        const formData = new FormData();
        formData.append('imageUploaded', this.state.file); // image byte data
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthDay);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        // when you sending data and if it has a file (ex. image), you need to add this below
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
    handleClickAdd = () => {
        this.setState({
            modalOpen: true
        })
    }
    handleClickClose = () => {

        this.setState({
            file: null,
            userName: '',
            birthDay: '',
            gender: '',
            job: '',
            fileName: '',
            modalOpen: false,
            nameError: '',
            birthDayError: '',
            genderError: '',
            jobError: '',
            fileError: ''
        })
    }
    validate = () => {
        let nameError = "";
        let birthDayError = "";
        let genderError = "";
        let jobError = "";
        let fileError = "";
        // let passwordError = "";

        if (!this.state.file) {
            fileError = "Please upload your image";
        }
        if (!this.state.userName) {
            nameError = "Please enter your name";
        }
        if (!this.state.birthDay) {
            birthDayError = "Please enter your birth of date";
        }

        if (!this.state.gender) {
            genderError = "Please enter your gender";
        }
        if (!this.state.job) {
            jobError = "Please enter your occupation";
        }

        if (birthDayError || nameError || genderError || jobError || fileError) {
            this.setState({ birthDayError, nameError, genderError, jobError, fileError });
            return false;
        }

        return true;
    };
    render() {
        const { classes } = this.props;

        return (
            <>
                <Button style={{ backgroundColor: '#8b00ff', marginBottom: '15px' }} variant="contained" color="primary" onClick={this.handleClickAdd}>
                    Add New Client
                 </Button>
                <Dialog open={this.state.modalOpen} onClose={this.handleClickClose}>
                    <DialogTitle>NEW Client</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Upload Image" : this.state.fileName}
                            </Button>
                        </label>
                        <div style={{ fontSize: 12, color: "red" }}> {/* validation prompt */}
                            {this.state.fileError}
                        </div>
                        <br />
                        <TextField label="Name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                        <div style={{ fontSize: 12, color: "red" }}> {/* validation prompt */}
                            {this.state.nameError}
                        </div>
                        <br />
                        <TextField label="Date of Birth" type="text" name="birthDay" value={this.state.birthDay} onChange={this.handleValueChange} />
                        <div style={{ fontSize: 12, color: "red" }}> {/* validation prompt */}
                            {this.state.birthDayError}
                        </div>
                        <br />
                        <TextField label="Gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                        <div style={{ fontSize: 12, color: "red" }}> {/* validation prompt */}
                            {this.state.genderError}
                        </div>
                        <br />
                        <TextField label="Occupation" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                        <div style={{ fontSize: 12, color: "red" }}> {/* validation prompt */}
                            {this.state.jobError}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> Add </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}> Close </Button>
                    </DialogActions>
                </Dialog>
            </>

        )
    }
}

export default withStyles(styles)(CustomerAdd);
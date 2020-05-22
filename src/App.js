import React, { Component } from 'react';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Customer from './components/Customer';
import {
  CircularProgress, TableBody, Table, TableHead, TableRow,
  TableCell, withStyles, Paper, AppBar, Toolbar, IconButton,
  Typography, InputBase, fade
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      loaded: 0,
      searchKeyword: ''
    }
  }

  componentDidMount() {
    // set timer to keep run progress method every 0.02 sec.
    this.timer = setInterval(this.progress, 20);

    //Calling api from server
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }
  stateRefresh = () => {
    this.setState({
      customers: '',
      loaded: 0,
      searchKeyword: ''
    });
    //Calling api from server
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }
  // method for calling server
  callApi = async () => {
    const response = await fetch('/api/customers');
    const data = await response.json();
    return data;
  }
  // method for progress bar
  progress = () => {
    const { loaded } = this.state;
    this.setState({ loaded: loaded >= 100 ? 0 : loaded + 1 })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() {
    const filteredClient = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      })
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>
      })
    }
    const { classes } = this.props;
    const cellList = ["No", "Image", "Name", "Date of Birth", "Gender", "Occupation", "Edit"];
    return (
      <div className={styles.root}>
        {/* Search bar Section */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Client Management
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        {/*  End of Search bar Section */}

        {/* Add Button (the ACTUALLY button property is in 'CustomerAdd' component) */}
        <div style={{ marginTop: 15, marginButtom: 15, display: 'flex', justifyContent: 'center' }}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper >
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                {/* Populate the table header names */}
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers ? filteredClient(this.state.customers) :
                  // if customers data is still in loading or false then prompt loading icon
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.loaded} />
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(App);


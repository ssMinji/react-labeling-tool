/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  radioControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
    
  }
});

class SignIn extends Component {

  constructor(props){
    super(props);
    this.state = {
      uid: "",
      password: "",
      job: "farmer"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange (e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleLogin() {
    let id = this.state.uid;
    let pw = this.state.password;
    let job = this.state.job;

    this.props.onLogin(id, pw, job).then(
      (success) => {
        if(!success) {
          this.setState({
            password:''
          });
        }
      }
    );
  }

  handleKeyPress(e) {
    if(e.charCode===13) {
        if(this.props.mode) {
            this.handleLogin();
        } else {
            this.handleRegister();
        }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="uid"
              label="Id"
              name="uid"
              autoComplete="uid"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            </form>
            <FormControl component="fieldset">
              <RadioGroup className={classes.radioControl} aria-label="job" name="job" value={this.state.job} onChange={this.handleChange}>
                <FormControlLabel value="farmer" control={<Radio />} label="농민" />
                <FormControlLabel value="expert" control={<Radio />} label="전문가" />
              </RadioGroup>
            </FormControl>
            <a className="waves-effect waves-light btn"
                onClick={this.handleLogin}>
                  로그인
            </a>
            <Grid container>
              <Grid item>
              </Grid>
            </Grid>
        </div>
      </Container>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogin: PropTypes.func
}

SignIn.defaultProps = {
  onLogin: (id, pw, job) => {console.error("login function not defined");},
};

export default withStyles(styles)(SignIn);


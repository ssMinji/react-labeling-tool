import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
//import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            password: "",
            username: "",
            job: "",
            dateOfBirth: "",
            email: "",
            phoneNum: "",
            company: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRegister() {
        let uid = this.state.uid;
        let pw = this.state.password;
        let username = this.state.username;
        let job = this.state.job;
        let dateOfBirth = this.state.dateOfBirth;
        let email = this.state.email;
        let phoneNum = this.state.phoneNum;
        let company = this.state.company;

        this.props.onRegister(uid, pw, username, job, dateOfBirth, email, phoneNum, company).then(
            (success) => {
                if(!success){
                    this.setState({
                        uid: "",
                        password: "",
                        username: "",
                        job: "",
                        dateOfBirth: "",
                        email: "",
                        phoneNum: "",
                        company: ""
                    });
                }
            }
        );
    }

    handleKeyPress (e) {
        if(e.charCode==13) {
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
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="uid"
                    label="아이디"
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
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="이름"
                    type="username"
                    id="username"
                    autoComplete="current-username"
                    onChange={this.handleChange}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">구분</FormLabel>
                    <RadioGroup aria-label="job" name="job" value={this.state.job} onChange={this.handleChange}>
                        <FormControlLabel value="farmer" control={<Radio />} label="농민" />
                        <FormControlLabel value="expert" control={<Radio />} label="전문가" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="생년월일"
                    type="date"
                    defaultValue="2020-01-01"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="이메일"
                    type="email"
                    id="email"
                    autoComplete="current-email"
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNum"
                    label="핸드폰 번호"
                    type="phoneNum"
                    id="phoneNum"
                    autoComplete="current-phone"
                    onChange={this.handleChange}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="company-native-simple">소속</InputLabel>
                    <Select
                        native
                        value={this.state.company}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'company',
                            id: 'company-native-simple',
                        }}
                    >
                    <option aria-label="None" value="" />
                    <option value="Jeju">제주도</option>
                    <option value="Univ">제주대학교</option>
                    <option value="Office">농업기술원</option>
                    </Select>
                </FormControl>
                <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>회원가입하기</a>
                <Grid container>
                <Grid item>
                </Grid>
                </Grid>
            </form>
            </div>
        </Container>
        );
    }

}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    onRegister: PropTypes.func
};

SignUp.defaultProps = {
    onRegister: (uid, pw, username, job, dateOfBirth, email, phoneNum, company) => {console.error("register function not defined");}
};


export default withStyles(styles)(SignUp);
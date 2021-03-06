/* eslint-disable no-undef */
import React, { Component } from 'react';
import {SignIn} from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw, job) {
        return this.props.loginRequest(id, pw, job).then(
            () => {
                if(this.props.status === "SUCCESS" ) {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        id: id
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData)); // save session data in cookie 

                    Materialize.toast('환영합니다, ' + id + '님!', 2000); 
                    browserHistory.push('/'); 
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">아이디/비밀번호를 다시 확인해주세요</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        )
    }

    render() {
        return (
            <div>
                <div className="container auth">
                    <div className="card">
                        <div className="header orange white-text center">
                            <div className="card-content">LOGIN</div>
                        </div>
                        <SignIn onLogin={this.handleLogin}/> 
                        <div className="footer">
                            <div className="card-content">
                                <div className="right">
                                    <Link to="/register">회원가입</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw, job) => {
            return dispatch(loginRequest(id,pw,job));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
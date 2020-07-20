/* eslint-disable no-undef */
import React, { Component } from 'react';
import { SignUp } from 'components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { registerRequest } from 'actions/authentication';

class Register  extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw, username, job, dateOfBirth, email, phoneNum, company) {
        return this.props.registerRequest(id, pw, username, job, dateOfBirth, email, phoneNum, company).then(
            () => {
                if(this.props.status === 'SUCCESS') {
                    Materialize.toast('Success! Please log in', 2000);
                    browserHistory.push('/login');
                    return true;
                } else {
                    /* 
                        ERROR CODES:
                            1. BAD USERNAME
                            2. BAD PASSWORD
                            3. USERNAME ALREADY EXIST
                    */
                   let errorMessage = [
                       '올바르지 않은 아이디입니다.',
                       '올바르지 않은 비밀번호입니다.',
                       '이미 존재하는 아이디입니다.'
                   ];
                   let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                   Materialize.toast($toastContent, 2000);
                   return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <div className="container auth">
                    <div className="card">
                        <div className="header orange white-text center">
                            <div className="card-content">SIGN UP</div>
                        </div>
                        <SignUp onRegister={this.handleRegister}/> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw, username, job, dateOfBirth, email, phoneNum, company) => {
            return dispatch(registerRequest(id, pw, username, job, dateOfBirth, email, phoneNum, company));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Register);
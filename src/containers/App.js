/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication'; 
import { browserHistory } from 'react-router';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // get cookie by name
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    } 

    //get loginData from cookie
    let loginData = getCookie('key');

    // if loginData is undefined, do nothing
    if(typeof loginData === "undefined") return;

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if(!loginData.isLoggedIn) return;

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
      () => {
        // if session is invalid
        if(!this.props.status.valid) {
          // logout the session
          loginData = {
            isLoggedIn: false,
            uid: '',
            currentJob: ''
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          // and notify
          let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
          Materialize.toast($toastContent, 4000);
        }
      }
    );

  }

  handleLogout() {
    this.props.logoutRequest().then(
      () => {
        Materialize.toast('안녕히가세요! ', 2000);

        // EMPTY SESSION
        let loginData = {
          isLoggedIn: false,
          uid: '',
          currentJob: ''
        };
        
        document.cookie = 'key= ' + btoa(JSON.stringify(loginData));
        browserHistory.push('/');
      }
    )
  }
  
  render() {

    return (
      <div>
        <Header isLoggedIn={this.props.status.isLoggedIn} 
                                        onLogout={this.handleLogout}/>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

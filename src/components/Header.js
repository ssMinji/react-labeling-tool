import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Sidebar from './Sidebar';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({ 
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const loginButton = (
            <li>
                {/* <Link to="/login">
                    <span>Login</span>
                </Link> */}
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <span>Logout</span>
                </a>
            </li>
        );

        
        return (
            <>
            <nav>
                <div className="nav-wrapper orange light-1">
                    <Link to="/" className="brand-logo center">jeju</Link>
                    

                    <ul>
                        <li>
                            <a onClick={this.handleClick} data-target="slide-out" class="sidenav-trigger show-on-large">
                                <i className="material-icons">menu</i>
                            </a>
                        </li>
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton}
                        </ul>
                    </div>
                </div>
            </nav>
            { this.state.isExpanded ? <Sidebar /> : undefined }
            </>
        );
    }
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined"); }
};

export default Header;
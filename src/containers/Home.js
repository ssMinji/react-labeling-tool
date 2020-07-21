/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router';
import Tangerine from '../../public/assets/tangerine_small.png';
import { Upload } from 'containers';
import { connect } from 'react-redux';
import Verify from './Verify';

class Home extends Component {

    render() {
        const homeView = (
            <section>
                <img src={Tangerine} />
                <Link to="/login">
                    {this.props.isLoggedIn ? undefined : <a class="waves-effect waves-light btn-large center" href="#">Login</a> }
                </Link>
            </section>
        );

        return (
            <div className="container home">
                <div className="wrapper">
                    { this.props.isLoggedIn ?
                        (this.props.currentJob === "farmer" ? <Upload /> : <Verify />)
                        : homeView}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentJob: state.authentication.status.currentJob,
    };
};

export default connect(mapStateToProps)(Home);

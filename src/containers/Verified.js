import React, { Component } from 'react';
import VerifiedItemList from 'components/VerifiedItemList';
import { getVerifiedItemRequest } from 'actions/verifyitem';
import { connect } from 'react-redux';


class Verified extends Component {

    componentDidMount() {
        this.props.getVerifiedItemRequest()
        console.log('verifiedItemRequest', this.props.verifiedData)
    }

    render() {
        return (
            <div>
                <VerifiedItemList data={this.props.verifiedData} currentUser={this.props.currentUser} currentJob={this.props.currentJob}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        currentJob: state.authentication.status.currentJob,
        verifiedData: state.resultitem.item.data,
        status: state.resultitem.item.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVerifiedItemRequest: () => {
            return dispatch(getVerifiedItemRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verified);
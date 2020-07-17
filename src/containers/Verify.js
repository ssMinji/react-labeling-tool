import React, { Component } from 'react';
import LabelItemList from 'components/LabelItemList';
import { getLabeledItemRequest } from 'actions/verifyitem';
import { connect } from 'react-redux';


class Verify extends Component {

    componentDidMount() {
        this.props.getLabeledItemRequest().then(
            () => {
                //console.log('fetch success!', this.props.status)
                //console.log('fetch labelData!!',this.props.labelData);
            }
        )
    }

    render() {
        return (
            <div>
                <LabelItemList data={this.props.labelData} currentUser={this.props.currentUser} currentJob={this.props.currentJob}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        currentJob: state.authentication.status.currentJob,
        labelData: state.verifyitem.item.data,
        status: state.verifyitem.item.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabeledItemRequest: () => {
            return dispatch(getLabeledItemRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
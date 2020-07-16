import React, { Component } from 'react';
import LabelItemList from 'components/LabelItemList';
import { getUploadedItemRequest } from 'actions/labelitem';
import { connect } from 'react-redux';

class Label extends Component {

    componentDidMount() {
        this.props.getUploadedItemRequest().then(
            () => {
                //console.log('fetch success!', this.props.status)
                //console.log(this.props.uploadData);
            }
        )
    }

    render() {
        return (
            <div>
                <LabelItemList data={this.props.uploadData} currentUser={this.props.currentUser} currentJob={this.props.currentJob} />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        currentJob: state.authentication.status.currentJob,
        uploadData: state.labelitem.item.data,
        status: state.labelitem.item.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUploadedItemRequest: (item, username) => {
            return dispatch(getUploadedItemRequest(item, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
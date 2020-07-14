import React, { Component } from 'react';
import LabelItemList from 'components/LabelItemList';
import { labelItemRequest } from 'actions/labelitem';
import { connect } from 'react-redux';

class Label extends Component {

    componentDidMount() {
        this.props.labelItemRequest().then(
            () => {
                //console.log(this.props.uploadData);
            }
        )
    }

    render() {
        return (
            <div>
                <LabelItemList data={this.props.uploadData} currentUser={this.props.currentUser} />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        uploadData: state.labelitem.item.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        labelItemRequest: (item, username) => {
            return dispatch(labelItemRequest(item, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
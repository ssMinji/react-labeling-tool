import React, { Component } from 'react';
import { uploadItemRequest } from 'actions/uploaditem';
import { connect } from 'react-redux';
import UploadItem from 'components/UploadItem';

class Upload extends Component {
    constructor(props){
        super(props);
        this.handleItem = this.handleItem.bind(this);
    }

    handleItem(text) {
        return this.props.uploadItemRequest(text).then(
            () => {
                if(this.props.itemStatus.status === "SUCCESS") {
                    Materialize.toast("SUCCESS!", 2000);
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                   let $toastContent;
                   switch(this.props.postStatus.error) {
                       case 1:
                           // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                           $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                           Materialize.toast($toastContent, 2000);
                           setTimeout(()=> {location.reload(false);}, 2000);
                           break;
                       case 2:
                           $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                           Materialize.toast($toastContent, 2000);
                           break;
                       default:
                           $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                           Materialize.toast($toastContent, 2000);
                           break;
                   }
                }
            }
        )
    }

    render() {

        return (
            <div>
                <UploadItem onUpload={this.handleItem} />
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        itemStatus: state.uploaditem.item.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadItemRequest: (text) => {
            return dispatch(uploadItemRequest(text));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
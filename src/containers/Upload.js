import React, { Component } from 'react';
import { uploadItemRequest } from 'actions/uploaditem';
import { connect } from 'react-redux';
import UploadItem from 'components/UploadItem';
import { browserHistory } from 'react-router';

class Upload extends Component {
    constructor(props){
        super(props);
        this.handleItem = this.handleItem.bind(this);
    }

    handleItem(file) {
        return this.props.uploadItemRequest(file).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast("업로드 완료! 분류작업을 해주세요.", 2000);
                    browserHistory.push('/login'); // TODO: /label 
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY FILES
                    */
                   let errorMessage = [
                       '로그인 후 이용해주세요!',
                       '파일을 선택해주세요!'
                   ]
                   let $toastContent;
                   switch(this.props.errorCode){
                       case 1:
                           $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[0] + '</span>');
                           Materialize.toast($toastContent, 2000);
                           browserHistory.push('/login');
                           break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[1] + '</span>');
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
        status: state.uploaditem.item.status,
        errorCode: state.uploaditem.item.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadItemRequest: (files) => {
            return dispatch(uploadItemRequest(files));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
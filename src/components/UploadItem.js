import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
    root: {
        maxWidth: 300,
        maxHeight: 300
    }
});
// let upload_files = []

// function convertToDataURL(e) {
//     return new Promise((resolve, reject) => {
//         let files = e.target.files;
//         let fileArr = Array.prototype.slice.call(files);

//         fileArr.forEach((f) => {
//             let reader = new FileReader();
//             reader.onload = (e) => {
//                 let dataURL = e.target.result;
//                 upload_files.push(dataURL);
//             };
//             reader.readAsDataURL(f);
//         })
//         resolve(upload_files);
//     })
// }

// async function doConvert(e) {
//     await convertToDataURL(e);
//     console.log('complete converting file to url');
// }

class UploadItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            files: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleItem = this.handleItem.bind(this);
        //this.test = this.test.bind(this);
    }

    // test(e) {
    //     doConvert(e).then(() => {
    //         console.log('done')
    //         this.setState({
    //             isClicked: true,
    //             files: upload_files
    //         }); // length 2
    //     }).catch((err) => console.log(err));
    // }

    handleChange(e) {
        let files = e.target.files;
        let fileArr = Array.prototype.slice.call(files);
        let upload_files = []

        fileArr.forEach((f) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                let dataURL = e.target.result;
                upload_files.push(dataURL);
                this.setState({
                    isClicked: true,
                    files: upload_files
                })
            };
            reader.readAsDataURL(f);
        })
    }

    handleItem() {
        let files = this.state.files;
        this.props.onUpload(files).then((success) => {
            if(!success) {
                this.setState({
                    isClicked: false,
                    files: []
                })
            }
        })
    }

    render() {
        const { classes } = this.props;
        const chooseFileView = (
            <div className="btn">
                <span>찾아보기..</span>
                <input id="real-input" type="file"
                    onChange={this.handleChange} multiple />
            </div>
        );
        const uploadTriggerView = (
            <a className="waves-effect waves-light btn"
                onClick={this.handleItem}>분류 시작</a>
        );
        return (
            <div className= "row">
                <div className="wrapper" id="upload-item">
                    <form className="col s12" method="post" action="upload">
                        <div className="file-field input-field"> 
                                { this.state.isClicked ? undefined : chooseFileView }
                            <div className="file-path-wrapper">
                                <div id="imagePreview">
                                    <img id="img" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        {this.state.files.map((value, i) => {
                            return (
                                <Card className={classes.root}>
                                    <CardActionArea id="imthebest">
                                        <CardMedia
                                            key={i}
                                            component="img"
                                            alt={value}
                                            height="140"
                                            image={value}
                                            title="Contemplative Reptile"
                                        />
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </div>
                    <div>
                        { this.state.isClicked ? uploadTriggerView : undefined }
                    </div>
                </div>
            </div>
        );
    }
}

UploadItem.propTypes = {
    classes: PropTypes.object.isRequired,
    onUpload: PropTypes.func
};

UploadItem.defaultProps = {
    onUpload: (files) => {console.error('upload function not defined');}
};

export default withStyles(styles)(UploadItem);
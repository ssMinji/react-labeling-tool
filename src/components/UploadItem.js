import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'; 
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
    root: {
        height: 300,
        maxWidth: 300,
        maxHeight: 300,
        padding: '10px'
    },
    media: {
        height: 180, 
        width: '100%',
        objectFit: 'cover'
    }
});

function convertToDataURL(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let dataURL = e.target.result;
            resolve(dataURL)
        };
        reader.readAsDataURL(file);
    })
}

async function doConvert(fileArr) {
    const data = await Promise.all(
        fileArr.map(file => {
            return convertToDataURL(file);
        })
    );
    return data;
}

class UploadItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            files: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleItem = this.handleItem.bind(this);
    }

    handleChange(e) {
        let files = e.target.files;
        let fileArr = Array.prototype.slice.call(files);
        this.setState({
            isClicked: true
        })

        doConvert(fileArr).then((data) => {
            this.setState({
                files: data
            })
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
            <div>
                <div className="btn">
                    <span>찾아보기..</span>
                    <input id="real-input" type="file"
                        onChange={this.handleChange} multiple />
                </div>
                <Link to="/label">
                    <a class="waves-effect waves-light btn-large center" href="#">분류 시작</a>
                </Link>
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
                                    <CardActionArea id="uploaded-item">
                                        <CardMedia
                                            className={classes.media}
                                            key={i}
                                            component="img"
                                            alt={value}
                                            height="140"
                                            image={value}
                                            title="사진 업로드"
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
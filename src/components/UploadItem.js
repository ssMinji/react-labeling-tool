import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        maxWidth: 300,
        maxHeight: 300
    }
});

class UploadItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            files: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.readInputFile = this.readInputFile.bind(this);
    }

    handleChange(e) {
        this.setState({
            // Need to be fixed 
            text: e.target.value,
            files: Array.prototype.slice.call(e.target.files)
        }, () => {console.log(this.state)})
    }

    handleItem() {
        let text = this.state.text;

        this.props.onUpload(text).then(
            () => {
                this.setState({
                    text: ''
                });
            }
        )

    }

    readInputFile(e) {
        let upload_files = [];
        $('#imagePreview').empty();
        let files = e.target.files;
        let fileArr = Array.prototype.slice.call(files);
        let idx = 0;
    
        fileArr.forEach((f) => {
            upload_files.push(f);
            let reader = new FileReader();
            reader.onload = (e) => {
                let dataURL = e.target.result;
                let re = /^data:image\/(png|jpg);base64,/;
                //console.log(e.target.result);
                const html = `<div class="upload-display"><div class="upload-thumb-wrap"><a id=img_id_${idx} href="#"><img src=${dataURL} data-file=${f.name} /></a></div></div>`;
                //console.log(dataURL);
                $('#imagePreview').append(html);
                idx ++;
            };
            reader.readAsDataURL(f);
        })

        console.log(upload_files)

    }

    render() {
        const { classes } = this.props;
        return (
            <div className= "row">
                <div className="wrapper" id="upload-item">
                    <form className="col s12" method="post" action="upload">
                        <div className="file-field input-field"> 
                            <div className="btn">
                                <span>찾아보기..</span>
                                <input id="real-input" type="file"
                                    onChange={this.readInputFile} multiple />
                            </div>
                            <div className="file-path-wrapper">
                                <div id="imagePreview">
                                    <img id="img" />
                                </div>
                            </div>
                        </div>
                        {/* <div className="card">
                            <div className="card-content">
                                <textarea className="materialize-textarea" 
                                    placeholder="질문하기"
                                    value={this.state.text}
                                    onChange={this.handleChange}></textarea> 
                            </div>
                            <div className="card-action">
                                <a onClick={this.handleItem}>질문등록</a>
                            </div>
                        </div> */}
                    </form>
                    <div className="aa">
                                <div id="imagePreview">
                                    <img id="img" />
                                </div>
                            </div>
                    {/* <Card className={classes.root}>
                        <CardActionArea id="imthebest">
                            {this.state.files.map((value, i) => {
                                return (
                                    <CardMedia
                                        key={i}
                                        component="img"
                                        alt={value.name}
                                        height="140"
                                        image={value.name}
                                        title="Contemplative Reptile"
                                    />
                                )
                            })}
                            
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            분류하기
                            </Button>
                        </CardActions>
                    </Card> */}
                </div>
            </div>
        );
    }
}

UploadItem.propTypes = {
    onUpload: PropTypes.func
};

UploadItem.defaultProps = {
    onUpload: (text) => {console.error('upload function not defined');}
};

export default withStyles(styles)(UploadItem);
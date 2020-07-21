/* eslint-disable no-cond-assign */
/* eslint-disable no-extend-native */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { verifyItemRequest } from 'actions/verifyitem';

const styles = theme => ({
    root: {
        width: '80%',
        height: '80%',
        padding: '10px'
    },
    media: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
    },
    formControlLabel: {
    marginTop: theme.spacing(1),
    },
});

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

class ResultDialog extends Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    
    handleClose() {
        this.props.onHandleClose();
    }
    
    render() {
        const { classes, open, data} = this.props;
        let uploadDate = new Date(data.upload_date);
        let reviewDate = new Date(data.review_date);

        return (
            <div className="container dialog">
                <Dialog
                    fullWidth="true"
                    maxWidth="md"
                    open={open}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">감귤 이미지 검증(결과)</DialogTitle>        
                    <DialogContent>
                        <div className="item">
                        <Card className={classes.root}>
                            <CardActionArea id="label-image">
                                <CardMedia
                                    className={classes.media}
                                    key={data.id}
                                    component="img"
                                    alt='label-img'
                                    height="140"
                                    image={data.url}
                                    title='업로드한 이미지'
                                />
                            </CardActionArea>
                        </Card>
                        <DialogContent>
                            <Typography gutterBottom>
                                등록 아이디: {data.upload_uid}
                            </Typography>
                            <Typography gutterBottom>
                                부위: {data.category}
                            </Typography>
                            <Typography gutterBottom>
                                1차 분류: {data.upload_label}
                            </Typography>
                            <Typography gutterBottom>
                                등록 일자: {uploadDate.format('yyyy-MM-dd(KS) HH:mm:ss')}
                            </Typography>
                            <Typography gutterBottom>
                                등록 질문: {data.upload_comment}
                            </Typography>
                        </DialogContent>
                        </div>
                        <div className="ixtem">
                        <DialogContent>
                            <Typography gutterBottom>
                                등록 아이디: {data.reviewer_uid}
                            </Typography>
                            <Typography gutterBottom>
                                전문가 분류: {data.review_label}
                            </Typography>
                            <Typography gutterBottom>
                                등록 일자: {reviewDate.format('yyyy-MM-dd(KS) HH:mm:ss')}
                            </Typography>
                            <Typography gutterBottom>
                                답변: {data.review_comment}
                            </Typography>
                        </DialogContent>
                        </div>
                    </DialogContent>  
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            확인
                        </Button>
                    </DialogActions>      
                </Dialog>
            </div>
        );
    }

}

ResultDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onHandleClose: PropTypes.func,
    data: PropTypes.object
}

ResultDialog.defaultProps = {
    open: false,
    onHandleClose: (e) => {console.error('handleClose function not defined')},
    data: {}
}

const mapStateToProps = (state) => {
    return {
        status: state.verifyitem.verify.status,
        errorCode: state.verifyitem.verify.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyItemRequest: (files) => {
            return dispatch(verifyItemRequest(files));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultDialog));
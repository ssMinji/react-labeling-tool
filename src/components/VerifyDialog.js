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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
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

class VerifyDialog extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            category: this.props.data.category,
            label: this.props.data.label,
            comment: '',
            confirmOpen: false,
            cancelOpen: false,
            disabled: true
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState, () => {
            if (this.state.label.length !== 0) {
                this.setState({
                    disabled: false
                })
            }
        });
    }
    
    handleClose() {
        this.props.onHandleClose();
    }

    handleSubmit() {
        this.props.onHandleClose();
        let files = {
            itemID: this.props.data.id, 
            label: this.state.label, 
            comment: this.state.comment,
            uploader_uid: this.props.data.user_uid
        };
        return this.props.verifyItemRequest(files).then(
            () => {
                Materialize.toast("분류 완료!", 2000);
                location.reload();
            }
        )
    }

    handleConfirm() {
        this.setState({
            confirmOpen: !this.state.confirmOpen
        });
    }

    handleCancel() {
        this.setState({
            cancelOpen: !this.state.cancelOpen
        });
    }
    
    render() {
        const { classes, open, data} = this.props;
        let date = new Date(data.date);
        

        const confirmView = (
            <Dialog
                open={this.state.confirmOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"CONFIRMATION ALERT"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    해당 작업을 저장하시겠습니까?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleSubmit} color="primary" autoFocus>
                    네
                </Button>
                <Button onClick={this.handleConfirm} color="primary">
                    아니요
                </Button>
                </DialogActions>
            </Dialog>
        );

        const cancelView = (
            <Dialog
                open={this.state.cancelOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"CANCEL ALERT"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    해당 작업을 취소하시겠습니까?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                    네
                </Button>
                <Button onClick={this.handleCancel} color="primary">
                    아니요
                </Button>
                </DialogActions>
            </Dialog>
        );
        return (
            <div className="container dialog">
                <Dialog
                    fullWidth="true"
                    maxWidth="md"
                    open={open}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">감귤 이미지 검증(전문가)</DialogTitle>        
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
                                등록 아이디: {data.user_uid}
                            </Typography>
                            <Typography gutterBottom>
                                등록 일자: {date.format('yyyy-MM-dd(KS) HH:mm:ss')}
                            </Typography>
                            <Typography gutterBottom>
                                등록 질문: {data.comment}
                            </Typography>
                        </DialogContent>
                        <FormControl className={classes.formControl} disabled>
                            <InputLabel htmlFor="category-native-simple">부위</InputLabel>
                            <Select
                                native
                                value={this.state.category}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'category',
                                    id: 'category-native-simple',
                                }}
                            >
                            <option aria-label="None" value="" />
                            <option value="잎">잎</option>
                            <option value="줄기">줄기</option>
                            <option value="과육">과육</option>
                            </Select>
                        </FormControl>
                        </div>
                        <div className="item">
                        <form className={classes.form} noValidate>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">분류</FormLabel>
                                <RadioGroup aria-label="label" name="label" value={this.state.label} onChange={this.handleChange}>
                                    <FormControlLabel value="더뎅이병" control={<Radio />} label="더뎅이병" />
                                    <FormControlLabel value="검은점무늬병" control={<Radio />} label="검은점무늬병" />
                                    <FormControlLabel value="궤양병" control={<Radio />} label="궤양병" />
                                    <FormControlLabel value="잿빛곰팡이병" control={<Radio />} label="잿빛곰팡이병" />
                                    <FormControlLabel value="배꼽썩음병" control={<Radio />} label="배꼽썩음병" />
                                    <FormControlLabel value="모자이크병" control={<Radio />} label="모자이크병" />
                                    <FormControlLabel value="알수없음" control={<Radio />} label="알수없음" />
                                </RadioGroup>
                            </FormControl>
                        </form>
                        </div>
                        <TextField 
                            onChange={this.handleChange}
                            margin = "dense"
                            id="comment"
                            name="comment"
                            label="답변을 입력해주세요"
                            fullWidth
                        />
                    </DialogContent>  
                    <DialogActions>
                        <Button onClick={this.handleConfirm} color="primary" disabled={this.state.disabled}>
                            확인
                        </Button>
                        {confirmView}
                        <Button onClick={this.handleCancel} color="primary">
                            취소
                        </Button>
                        {cancelView}
                    </DialogActions>      
                </Dialog>
            </div>
        );
    }

}

VerifyDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onHandleClose: PropTypes.func,
    data: PropTypes.object
}

VerifyDialog.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerifyDialog));
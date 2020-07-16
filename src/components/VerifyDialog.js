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
import { connect } from 'react-redux';
import { labelItemRequest } from 'actions/labelitem';

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

class VerifyDialog extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            category: '',
            label: '',
            comment: '',
            confirmOpen: false,
            cancelOpen: false,
            disabled: true
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState, () => {
            if (this.state.category.length !== 0 && this.state.label.length !== 0) {
                this.setState({
                    disabled: false
                })
            }
        });
    }
    
    handleClose() {
        this.props.onHandleClose();
    }

    handleLabel() {
        this.props.onHandleClose();
        let files = {
            itemID: this.props.imageKey, 
            category: this.state.category, 
            label: this.state.label, 
            comment: this.state.comment
        };
        this.props.labelItemRequest(files).then(
            () => {
                Materialize.toast("분류 완료!", 2000);
                console.log(this.props.status)
                //location.reload();
                
                // if(this.props.status === "SUCCESS") {
                    
                // } else {
                //     let $toastContent;
                //     $toastContent = $('<span style="color: #FFB4BA">' + '작업 실패!' + '</span>');
                //     Materialize.toast($toastContent, 2000);
                // }
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
        const { classes, open, image, imageKey } = this.props;
        console.log(this.props);

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
                <Button onClick={this.handleLabel} color="primary" autoFocus>
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
                                    key={imageKey}
                                    component="img"
                                    alt='label-img'
                                    height="140"
                                    image={image}
                                    title='업로드한 이미지'
                                />
                            </CardActionArea>
                        </Card>
                        <FormControl className={classes.formControl}>
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
                            label="질문을 입력해주세요"
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
    image: PropTypes.string,
    imageKey: PropTypes.number,
    category: PropTypes.string,
    label: PropTypes.string,
    comment: PropTypes.string,
    farmerID: PropTypes.string
}

VerifyDialog.defaultProps = {
    open: false,
    onHandleClose: (e) => {console.error('handleClose function not defined')},
    image: '',
    imageKey: 0,
    category: '',
    label: '',
    comment: '',
    farmerID: ''
}

const mapStateToProps = (state) => {
    return {
        status: state.labelitem.label.status,
        errorCode: state.labelitem.label.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        labelItemRequest: (files) => {
            return dispatch(labelItemRequest(files));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerifyDialog));
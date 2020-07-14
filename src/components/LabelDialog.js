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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
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

class LabelDialog extends Component {

    constructor(props) {
        super(props);
        console.log('props', props);
        //this.handleClose = this.handleClose.bind(this);
    }

    // handleClose() {
    //     this.props.onHandleClose();
    // }
    
    render() {
        const { classes } = this.props;
        console.log(this.props.open)
        let handleClose = this.props.onHandleClose;
        return (
            <div>
                <Dialog
                    fullWidth="true"
                    maxWidth="md"
                    open={this.props.open}
                    //onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>        
                    <DialogContent>
                        <DialogContentText>
                            TEST
                        </DialogContentText>
                        <form className={classes.form} noValidate>
                            <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                            <Select
                                autoFocus
                                //value={maxWidth}
                                //onChange={handleMaxWidthChange}
                                inputProps={{
                                name: 'max-width',
                                id: 'max-width',
                                }}
                            >
                                <MenuItem value="false">false</MenuItem>
                                <MenuItem value="xs">xs</MenuItem>
                                <MenuItem value="sm">sm</MenuItem>
                                <MenuItem value="md">md</MenuItem>
                                <MenuItem value="lg">lg</MenuItem>
                                <MenuItem value="xl">xl</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControlLabel
                            className={classes.formControlLabel}
                            control={<Switch checked="sm" onChange={handleClose} />}
                            label="Full width"
                            />
                        </form>
                    </DialogContent>  
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>      
                </Dialog>
            </div>
        );
    }

}

LabelDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onHandleClose: PropTypes.func
}

LabelDialog.defaultProps = {
    open: false,
    onHandleClose: (e) => {console.error('handleClose function not defined')}
}

export default withStyles(styles)(LabelDialog);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LabelDialog from './LabelDialog';

const styles = theme => ({
    root: {
        width: 300,
        height: 300,
        padding: '10px'
    },
    media: {
        height: 230
    }
});

class LabelItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        const { data, classes }  = this.props;
        return (
            <>
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
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleClick}>
                            분류하기
                        </Button>
                    </CardActions>
                </Card>
            </div>
            <LabelDialog open={this.state.open} onHandleClose={this.handleClose}/>
            </>
        )
    }

}

LabelItem.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object,
}

LabelItem.defaultProps = {
    data: {}
}

export default withStyles(styles)(LabelItem);
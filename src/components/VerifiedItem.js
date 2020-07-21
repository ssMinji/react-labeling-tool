import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ResultDialog from './ResultDialog';

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

class VerifiedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { data, classes }  = this.props;

        const resultDialogView = (
            <ResultDialog open={this.state.open} 
                        onHandleClose={this.handleClick}
                        data={this.props.data} />
        );

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
                            결과보기
                        </Button>
                    </CardActions>
                </Card>
            </div>
            {this.state.open ? 
                resultDialogView
                : undefined}
            </>
        )
    }

}

VerifiedItem.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object,
    currentUser: PropTypes.string,
    currentJob: PropTypes.string
}

VerifiedItem.defaultProps = {
    data: {},
    currentUser: '',
    currentJob: ''
}

export default withStyles(styles)(VerifiedItem);
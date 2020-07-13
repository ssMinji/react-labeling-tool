import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
    root: {
        maxWidth: 300,
        maxHeight: 300
    }
});

class LabelItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>item</div>
        )
    }

}

export default LabelItem;
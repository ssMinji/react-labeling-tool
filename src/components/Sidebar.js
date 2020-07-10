import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router'; 
import { List, ListItem, ListItemText } from '@material-ui/core';

class Sidebar extends Component {

    render() {
        return (
            <List disablePadding dense>
                <ListItem button>
                    <ListItemText>사진 업로드 </ListItemText>
                </ListItem>
            </List>
        );
    }
}

export default Sidebar;
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
    list: {
        width: 250,
      },
    fullList: {
        width: 'auto',
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(e) {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        this.setState({ 
            isExpanded: !this.state.isExpanded
        });
    }


    render() {
        const { classes } = this.props;

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <span>Logout</span>
                </a>
            </li>
        );

        const list = (
            <div
              className={classes.list}
              role="presentation"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <List>
                  <Link to="/upload">
                    <ListItem button key="사진 업로드">
                        <ListItemText primary="사진 업로드" />
                    </ListItem>
                  </Link>
              </List>
              <Divider />
              <List>
                {['검증 완료'].map((text, index) => (
                <Link to="/verified">
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
                ))}
              </List>
            </div>
        );

        
        return (
            <>
            <nav>
                <div className="nav-wrapper orange light-1">
                    <Link to="/" className="brand-logo center">JEJU</Link>
                    <ul>
                        <li>
                            <a onClick={this.toggleDrawer} data-target="slide-out" class="sidenav-trigger show-on-large">
                                <i className="material-icons">menu</i>
                            </a>
                        </li>
                    </ul>
                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : undefined}
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <Drawer anchor="menu" open={this.state.isExpanded} onClose={this.toggleDrawer}>
                    {list}
                </Drawer>
            </div>
            </>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined"); }
};

export default withStyles(styles)(Header);
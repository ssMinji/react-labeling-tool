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
        const loginButton = (
            <li>
                {/* <span>로그인 후 이용가능합니다.</span> */}
            </li>
        );

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
                {['사진 업로드/분류'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['사진 검증'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
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
                            { this.props.isLoggedIn ? logoutButton : loginButton}
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
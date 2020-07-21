import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VerifiedItem } from 'components';

class VerifiedItemList extends Component{
    render() {
        return (
            <div className="container label">
                    {this.props.data.map((item, i) => {
                        return (
                            <VerifiedItem data={item} key={item.id} currentUser={this.props.currentUser} currentJob={this.props.currentJob}/>
                        )
                    })}
            </div>
        )
    }
}

VerifiedItemList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    currentJob: PropTypes.string
}

VerifiedItemList.defaultProps = {
    data: [],
    currentUser: '',
    currentJob: ''
}

export default VerifiedItemList;
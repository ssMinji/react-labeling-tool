import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LabelItem } from 'components';

class LabelItemList extends Component{
    render() {
        return (
            <div className="container label">
                    {this.props.data.map((item, i) => {
                        return (
                            <LabelItem data={item} key={item.id} currentUser={this.props.currentUser} currentJob={this.props.currentJob}/>
                        )
                    })}
            </div>
        )
    }
}

LabelItemList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    currentJob: PropTypes.string
}

LabelItemList.defaultProps = {
    data: [],
    currentUser: '',
    currentJob: ''
}

export default LabelItemList;
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { LabelItem } from 'components';

class LabelItemList extends Component{
    render() {
        return (
            <div className="container label">
                    {this.props.data.map((item, i) => {
                        return (
                            <LabelItem data={item} key={item.id} />
                        )
                    })}
            </div>
        )
    }
}

LabelItemList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
}

LabelItemList.defaultProps = {
    data: [],
    currentUser: ''
}

export default LabelItemList;
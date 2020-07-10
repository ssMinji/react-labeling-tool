import React, { Component } from 'react';
import { selectCategory } from 'actions/uploaditem';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SelectCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            category: e.target.id
        }, () => {
            this.props.selectCategory(this.state.category);
        });
    }

    render() {

        return (
            <div>
                <section id="category-select">
                    <Link to="/upload"> 
                        <a class="waves-effect waves-light btn-large" id="leaf" value={this.state.category} href="#" onClick={this.handleClick}>잎</a>
                        <a class="waves-effect waves-light btn-large" id="branch" value={this.state.category} href="#" onClick={this.handleClick}>줄기</a>
                        <a class="waves-effect waves-light btn-large" id="fruit" value={this.state.category} href="#" onClick={this.handleClick}>열매</a>
                    </Link>
                </section>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        category: state.uploaditem.category.part,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCategory: (category) => dispatch(selectCategory(category)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
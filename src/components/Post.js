import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from 'react-redux';
import {fetchPost, deletePost} from "../actions";

class Post extends Component {

    constructor(props) {
        super(props);
        this.deletePostHandler = this.deletePostHandler.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchPost(this.props.params.id));
    }

    deletePostHandler() {
        this.props.dispatch(deletePost(this.props.params.id));
    }

    render() {
        if (!this.props.post) {

            return (null);
        }

        const {post: {title, categories, content}} = this.props;

        return (
            <div>
                <Link to="/">
                    index
                </Link>

                <Link to="/">
                    back to posts
                </Link>
                <button onClick={this.deletePostHandler}>
                    delete post
                </button>

                <h2>{title}</h2>
                <p>categries : {categories}</p>
                <p>{content}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.currentPost.post
});

export default connect(mapStateToProps)(Post);
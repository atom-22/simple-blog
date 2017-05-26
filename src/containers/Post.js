import React, {Component} from "react";
import {Link, withRouter} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux"
import {fetchPost, deletePost} from "../actions";
import {postSelector} from "../selectors";
import Loader from "../components/Loader";
import PropTypes from "prop-types";

class Post extends Component {

    static propTypes = {
        post: PropTypes.object,
        deleted: PropTypes.bool.isRequired,
        params: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
        fetchPost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.deletePostHandler = this.deletePostHandler.bind(this);
    }

    componentDidMount() {
        this.props.fetchPost(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.deleted === false && nextProps.deleted === true) {
            this.props.router.push('/');
        }
    }

    deletePostHandler() {
        this.props.deletePost(this.props.params.id);
    }

    render() {
        if (!this.props.post) {
            return (
                <Loader/>
            );
        }
        const {post: {title, categories, content}} = this.props;

        return (
            <div>

                <div className="btn btn-link">
                    <Link to="/">
                        <span> Back to posts</span>
                    </Link>
                </div>

                <button
                    className="btn btn-warning pull-right"
                    onClick={this.deletePostHandler}>
                    Delete post
                </button>

                <h3 className="text-success">{title}</h3>
                <h4 className="text-primary">categories : {categories}</h4>
                <p className="text-info">{content}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({...postSelector(state)});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPost,
    deletePost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
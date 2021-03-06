import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'


export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    };

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
    }
    render() {
        const { name, avatar_url, location, bio, blog, company, login, html_url, followers, following, public_repos, public_gists, hireable, website } = this.props.user;
        const { loading, repos } = this.props;

        if (loading) { return <Spinner /> }

        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
                Hireable: {' '}
                {hireable ? <i className="fas fa-check text-success" />
                    : <i className="fas fa-times-circle text-danger"></i>
                }
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img' alt='avatar-picture' style={{ width: '9.5rem' }} />
                        <h1>{name}</h1>
                        <p>{location}</p>
                        <a href={html_url} target='_blank' className="btn btn-dark my-1">Visit GitHub Profile</a>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <br />
                        <ul>
                            <li>{login && <Fragment>Username: <strong>{login}</strong></Fragment>}</li>
                            <li>{company && <Fragment>Company: <strong>{company}</strong></Fragment>}</li>
                            <li>{blog && <Fragment>Website: <strong>{blog}</strong></Fragment>}</li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-dark">Public Repos: {public_repos}</div>
                    <div className="badge badge-light">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        )
    } company
}

export default User

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const UserItem = ({ user: { login, avatar_url, html_url } }) => {

    return (
        <div className="card text-center">
            <img src={avatar_url} alt="avatar" className="round-img" style={{ width: '4rem' }} />
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} className="btn btn-dark btn-sm">More</Link>
            </div>
        </div>
    )

}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem

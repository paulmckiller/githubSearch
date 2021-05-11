import React, { Component } from 'react'

export class UserItem extends Component {
    constructor() {
        super();
        this.state = {
            login: "mojombo",
            id: 1,
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
            html_url: "https://github.com/mojombo",
        }
    }
    render() {
        const {login, id, avatar_url, html_url} = this.state;
        return (
            <div className="card text-center">
                <img src={avatar_url} alt="avatar" className="round-img" style={{width: '4rem'}}/>
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm">More</a>
                </div>
            </div>
        )
    }
}

export default UserItem

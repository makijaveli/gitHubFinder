import React, {Fragment, useEffect} from 'react';
import Spinner from "../layout/spinner.component";
import {Link} from "react-router-dom";
import Repos from "../repos/repos.component";

const User = ({getUser, match, user, loading, getUserRepos, repos}) => {

    let username = match.params.username;
    useEffect(() => {
        const getUserEffect = () => {
            getUser(username)
        }; getUserEffect()
        const getUserReposEffect = () => {
            getUserRepos(match.params.username)
        }; getUserReposEffect();
    }, [])

    const {
        name,
        avatar_url,
        location,
        followers,
        following,
        hireable,
        bio,
        html_url,
        login,
        company,
        blog,
        public_gists,
        public_repos
    } = user;

    if (loading) return <Spinner/>

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back to search</Link>
            Hireable: {' '} {hireable ? 'Yes' : 'No'}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' alt='' style={{width: '150px'}}/>
                    <h1>{name}</h1>
                    {location && <p>Location: {location}</p>}
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio: {bio}</h3>
                    </Fragment>}
                    <a href={html_url} className='btn btn-dark my-1'>Visit GitHub profile</a>
                    <ul>
                        <li>
                            <strong>Username: {login}</strong>
                        </li>
                        <li>
                            {company && <strong>Company: {company}</strong>}
                        </li>
                        <li>
                            {blog && <strong>Website: <a href={blog}>{blog}</a></strong>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge danger">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    );
};

export default User;
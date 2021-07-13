import GithubContext from "./githubContext";
import {useReducer} from "react";
import GithubReducer from "./githubReducer";
import axios from "axios";
import {CLEAR_USER, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from "../types";

// Initial state and actions in applications

const GITHUB_URL_BASE = 'https://api.github.com';

const generateUrlForSearch = text => {
    return `${GITHUB_URL_BASE}/search/users?q=${text}&client_id=${process.env.APP_GITHUB_CLIENT_ID}&client_secret=${process.env.APP_GITHUB_SECRET_KEY}`
}

const generateUrlForSingleSearch = username => {
    return `${GITHUB_URL_BASE}/users/${username}`
}

const generateUrlForReposSearch = username => {
    return `${GITHUB_URL_BASE}/users/${username}/repos?per_page=5&sort=created:asc`
}

// Initial state
const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search users
    const searchUsersHandler = async queryText => {
        setLoading();
        //setAlert({message: "", type: ""});
        const res = await axios.get(generateUrlForSearch(queryText))
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // Get single Github user
    const getUser = async username => {
        setLoading();
        //setAlert({message: "", type: ""});
        const res = await axios(generateUrlForSingleSearch(username))
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // Get User repos from Github
    const getUserRepos = async username => {
        setLoading();
        //setAlert({message: "", type: ""});
        const res = await axios(generateUrlForReposSearch(username))
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    // Clear Users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USER
        })
    }

    // Set loading
    const setLoading = () => dispatch({type: SET_LOADING})

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsersHandler,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;
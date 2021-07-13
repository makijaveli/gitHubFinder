import './App.css'
import Navbar from "./components/layout/navbar.component";
import Users from "./components/users/users.component";
import axios from "axios";
import {Fragment, useState} from "react";
import Search from "./components/users/search.component";
import Alert from "./components/layout/alert.component";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/about";
import User from "./components/users/user.component";

function App() {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({message: '', type: ''});

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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await axios(url)
    //             .then(res => {
    //                 setData(res.data)
    //             })
    //     };
    //     fetchData();
    // }, []);

    const searchUsersHandler = async queryText => {
        setLoading(true);
        setAlert({message: "", type: ""});
        await axios(generateUrlForSearch(queryText))
            .then(res => {
                console.log(res.data)
                setData(res.data.items)
                setLoading(false)
            })
    }

    const getUser = async username => {
        setLoading(true);
        setAlert({message: "", type: ""});
        await axios(generateUrlForSingleSearch(username))
            .then(res => {
                console.log(res.data)
                setUser(res.data)
                setLoading(false)
            })
    }

    const getUserRepos = async username => {
        setLoading(true);
        setAlert({message: "", type: ""});
        await axios(generateUrlForReposSearch(username))
            .then(res => {
                console.log(res.data)
                setRepos(res.data)
                setLoading(false)
            })
    }

    const clearUsers = () => {
        setLoading(true);
        setData([]);
        setLoading(false);
    }

    const setAlertHandler = (message, type) => {
        setAlert({message: message, type: type});

        setTimeout(() => {
            setAlert({message: "", type: ""})
        }, 5000)
    }

    return (
        <Router>
            <div className="App">
                <Navbar title="Github finder"/>
                <div className="container">
                    <Alert alert={alert}/>
                    <Switch>
                        <Route exact path='/' render={props => (<Fragment>
                            <Search
                                searchUsers={searchUsersHandler}
                                clearUsers={clearUsers}
                                showClear={data.length > 0}
                                setAlert={setAlertHandler}/>
                            <Users loading={loading} users={data}/>
                        </Fragment>)} />
                        <Route exact path='/about' render={About} />
                        <Route exact path='/user/:username' render={props => (
                            <User {...props}
                                  getUser={getUser}
                                  getUserRepos={getUserRepos}
                                  user={user}
                                  repos={repos}
                                  loading={loading} />
                        )} />
                    </Switch>

                </div>
            </div>
        </Router>
    );
}

export default App;

import './App.css'
import Navbar from "./components/layout/navbar.component";
import Alert from "./components/layout/alert.component";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from "./components/pages/about";
import Home from "./components/pages/home";

import User from "./components/users/user.component";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import NotFound from "./components/pages/not-found";

function App() {

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar title="Github finder"/>
                        <div className="container">
                            <Alert/>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/about' render={About}/>
                                <Route exact path='/user/:username' component={User}/>
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
}

export default App;

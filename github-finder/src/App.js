import './App.css'
import Navbar from "./components/layout/navbar.component";
import Users from "./components/users/users.component";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

    const [data, setData] = useState([]);

    const url = `https://api.github.com/users?client_id=${process.env.APP_GITHUB_CLIENT_ID}&client_secret=${process.env.APP_GITHUB_SECRET_KEY}`

    useEffect(() => {
        const fetchData = async () => {
             await axios(url)
                .then(res => {
                  setData(res.data)
                })
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <Navbar title="Github finder"/>
            <Users loading={false} users={data}/>
        </div>
    );
}

export default App;

import React, {useContext, useState} from 'react';
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {

    // Context API
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState("");

    const textHandler = e => setText(e.target.value)


    const submitHandler = e => {
        e.preventDefault();
        if (text.length === 0) {
            alertContext.setAlertHandler('Please enter something', 'light');
        } else {
            githubContext.searchUsersHandler(text)
            setText('')
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='form'>
                <input type="text"
                       name="text"
                       placeholder='Search Users...'
                       onChange={textHandler}
                       value={text}/>
                <input type="submit" value="Search" className='btn btn-dark btn-block'/>
            </form>
            {githubContext.users.length> 0 &&
            <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
                Clear
            </button>}
        </div>
    );
};

export default Search;
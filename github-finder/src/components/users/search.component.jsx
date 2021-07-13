import React, {useState} from 'react';

const Search = ({searchUsers, clearUsers, showClear, setAlert}) => {

    const [text, setText] = useState("");

    const textHandler = e => setText(e.target.value)

    const submitHandler = e => {
        e.preventDefault();
        if (text.length === 0) {
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
        }
    }

    const clearUsersHandler = () => {
        clearUsers();
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
            {showClear && <button className="btn btn-light btn-block" onClick={clearUsersHandler}>Clear</button>}
        </div>
    );
};

export default Search;
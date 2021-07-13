import React, {Fragment} from 'react';
import Search from "../users/search.component";
import Users from "../users/users.component";

const Home = () => {
    return (
        <Fragment>
            <Search/>
            <Users/>
        </Fragment>
    );
};

export default Home;
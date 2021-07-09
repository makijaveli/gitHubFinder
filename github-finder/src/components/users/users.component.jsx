import React from 'react';
import UserItem from "./user-item.component";
import Spinner from "../layout/spinner.component";

const Users = ({users, loading}) => {
    if (users.length === 0) return <Spinner />
    if (loading) return <Spinner/>
    else {
        return (
            <div style={userStyle}>
                {users.map(user => {
                    console.log(user)
                   return  <UserItem key={user.id} user={user}/>
                })}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;
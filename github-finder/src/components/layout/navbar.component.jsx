import React from 'react';

const Navbar = ({title}) => {

    return (
        <div className='navbar bg-primary'>
            {title}
        </div>
    );
};

export default Navbar;
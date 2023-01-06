import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = ({}) => {

    return (
        <div>
            <h1>Page Not Found</h1>
            <NavLink to={'/'}>Home</NavLink>
        </div>
    );
};

PageNotFound.propTypes = {

};

export default PageNotFound;

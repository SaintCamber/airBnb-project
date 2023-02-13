import React from 'react';
import LoginFormModal from '../LoginFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useHistory } from 'react-router-dom';
const NotLoggedin = ({}) => {
    const history = useHistory()

    return (
        <div>
            <h1>Authorized Users Only</h1>
            <h3>please log in to continue
            </h3>

        </div>
    );
};


export default NotLoggedin;

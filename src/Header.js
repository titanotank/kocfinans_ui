import React from 'react'
import "./Header.css"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import IconButton from"@material-ui/core/IconButton";

function Header() {
    return (
        <div className="header">
            <IconButton>
                <AccountBalanceIcon className= "header__icon" fontSize="large"/>
            </IconButton>

            <IconButton>
                <LocalAtmIcon className= "header__icon" fontSize="large" />
            </IconButton>
            
        </div>
    )
}


export default Header;
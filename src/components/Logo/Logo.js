import React from 'react';
import Logo from '../../assets/images/132 burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} alt="MyBurger"/>
    </div>
);

export default logo;
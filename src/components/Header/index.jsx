import React from 'react';
import { Link } from 'react-router-dom';
import Burger from './Burger';
import './header.scss';

export default function Header({id}) {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">MediaLend</Link>
                </div>
                {id && <Burger />}
            </div>
        </div>
    )
}

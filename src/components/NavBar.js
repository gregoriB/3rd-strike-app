import React, {useState, useContext, useEffect} from 'react';
import {StateContext} from '../contexts/stateContext';
import { Link } from 'react-router-dom';

import { categories } from '../helpers/variables';
import '../styles/navBar.css';

export default function NavBar() {
    const { currentChar, currentCategory, setCurrentCategory, charInfo } = useContext(StateContext);
    const [navButtons, setNavButtons] = useState(null);

    useEffect(() => {
        const handleClick = e => {
            setCurrentCategory(e.target.dataset.name)
        }

        const handleMapCategories = () => {
            setNavButtons(categories.map(category => {
                if (currentChar !== 'Yun' && category.includes('GeneiJin')) {
                    return null;
                } else {
                    return (
                        <div className={`nav-link-padding ${category === currentCategory && 'active'}`}>
                            <button
                                className={`nav-link ${category}`}
                                key={category}
                                data-name={category}
                                onClick={handleClick}
                            >
                                {category}
                            </button>
                        </div>
                        );
                    }
                })
            );
        }
        handleMapCategories();
    },[currentChar, currentCategory, setNavButtons, setCurrentCategory]);

    return (
        <div className='nav-bar'>
            <Link to='/'><button className='home-button'>HOME</button></Link>
            <div className='current-char'>{ charInfo && charInfo.name.includes(currentChar) && charInfo.name}</div>
            {navButtons}
        </div>
    );
}

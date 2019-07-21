import React, {useState, useContext, useEffect, useRef, createRef} from 'react';
import {StateContext} from '../contexts/stateContext';
import { Link } from 'react-router-dom';

import { categories } from '../helpers/variables';
import '../styles/navBar.css';

export default function NavBar() {
    const { setIsDownloadComplete, currentChar, currentCategory, setCurrentCategory, charInfo } = useContext(StateContext);
    const [navButtons, setNavButtons] = useState(null);

    const links = useRef(categories.map(link => createRef(link)));

    const clickAllLinks = () => {
        links.current.forEach((link, index) => {
            if (link.current) {
                setTimeout(() => link.current.click(), (index) * 1000);
            }
            if (index === links.current.length - 1) {
                setTimeout(() => setIsDownloadComplete(true), (index + 1) * 1000)
            }
        })
    }

    useEffect(() => {
        const handleClick = e => {
            setCurrentCategory(e.target.dataset.name)
        }

        const handleMapCategories = () => {
            setNavButtons(categories.map((category, index) => {
                if (currentChar !== 'Yun' && category.includes('GeneiJin')) {
                    return null;
                } else {
                    return (
                        <div className={`nav-link-padding ${category === currentCategory && 'active'}`}>
                            <button
                                ref={links.current[index]}
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
            <button className='home-button download-button' onClick={clickAllLinks}>DOWNLOAD HTML</button>
        </div>
    );
}

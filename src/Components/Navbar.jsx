import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db, logout } from '../firebase';
import '../Styles/Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar(props) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    };

    const closeMenu = () => {
        setNavbarOpen(false);
    };

    const [userName, setName] = useState('');
    const [currUser, loading] = useAuthState(auth);
    const nav = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            alert('An error had occurred while fetching the users name');
        }
    };

    const navigate = (direction) => {
        console.log("/" + direction)
        nav("/" + direction);
        closeMenu();
        return;
    }

    useEffect(() => {
        if (loading) {
            // future implementation of loading screen
            return;
        }
        if (!currUser) return nav('/');
        fetchUserName();


    }, [currUser, loading]);


    return (
        <>
            <div className="menubar">
                <div className="name">
                    Welcome, <span>{userName.substring(0, userName.indexOf(' '))}</span>
                </div>
                <div className="page" >{props.title}</div>
                <button className="burger" onClick={handleToggle} >
                    <i className="bi bi-list"></i>
                </button>
            </div>
            <div className={`menuNav ${navbarOpen ? " showMenu" : " closeMenu"}`}>
                <div className='menuButt-holder'>
                    <div className='top-holder'>
                        <h1>
                            Calendar
                        </h1>
                        <button className='x-button' onClick={closeMenu}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <button className="menu-button" onClick={() => { navigate("dash") }}>
                        Home
                    </button>
                    <button className="menu-button" onClick={() => { navigate("weather") }}>
                        Weather
                    </button>
                    <button className="menu-button" onClick={() => { navigate("Layouts") }}>
                        Layouts
                    </button>
                    <button className="menu-button" onClick={() => { navigate("events") }}>
                        Events
                    </button>
                    <button className="menu-button" onClick={() => { navigate("photo") }}>
                        Photos
                    </button>
                    <button className="menu-button" onClick={() => { navigate("calendar") }}>
                        Calendar
                    </button>
                    <button className="menu-button" onClick={() => { navigate("news") }}>
                        News
                    </button>
                    <button className="menus-button special" onClick={logout}>
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}
export default Navbar;

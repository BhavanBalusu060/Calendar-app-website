import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db, logout } from '../firebase';
import '../Styles/Dashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Dashboard() {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  const [userName, setName] = useState('');
  const [currUser, loading, error] = useAuthState(auth);
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
        <div className="page" >Dashboard</div>
        <button className="burger" onClick={handleToggle} >
          <i class="bi bi-list"></i>
        </button>
      </div>
      <div className={`menuNav ${navbarOpen ? " showMenu" : " closeMenu"}`}>
        <div className='menuButt-holder'>
          <div className='top-holder'>
            <h1>
              Calendar
            </h1>
            <button className='x-button' onClick={closeMenu}>
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <button className="menu-button" onClick={closeMenu}>
            Home
          </button>
          <button className="menu-button" onClick={closeMenu}>
            Weather
          </button>
          <button className="menu-button" onClick={closeMenu}>
            Layouts
          </button>
          <button className="menu-button" onClick={closeMenu}>
            Todo-List
          </button>
          <button className="menu-button" onClick={closeMenu}>
            Photos
          </button>
          <button className="menu-button" onClick={closeMenu}>
            Calendar
          </button>
          <button className="menu-button" onClick={closeMenu}>
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
export default Dashboard;

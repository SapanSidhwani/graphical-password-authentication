import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    var changeTheme = (e) => {

        var html = document.getElementById('html');
        var light = document.getElementById('light');
        var dark = document.getElementById('dark');

        html.setAttribute('data-bs-theme', e.target.id);
        if (html.getAttribute('data-bs-theme') === 'light') {
            dark.classList.remove('active');
            light.classList.add('active');
            document.body.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/black-thread-light.png')";
        }
        else {
            light.classList.remove('active');
            dark.classList.add('active');
            document.body.style.backgroundImage = "url('https://www.transparenttextures.com/patterns/black-thread.png')";
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{ marginTop: '5px' }}>
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item" style={{ marginTop: '5px' }}>
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown" style={{ marginTop: '5px' }}>
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href='/3333' aria-expanded="false">Toggle theme&nbsp;</a>
                            <ul className="dropdown-menu mb-2" style={{ maxWidth: '100px' }}>
                                <li><button type="button" className="dropdown-item d-flex align-items-center" id='light' onClick={changeTheme}>Light</button></li>
                                <li><button type="button" className="dropdown-item d-flex align-items-center active" id='dark' onClick={changeTheme}>Dark</button> </li>
                            </ul>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/signup" className="mx-2 btn btn-primary">Sign up</Link>
                    </form> : <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
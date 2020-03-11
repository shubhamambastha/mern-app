import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";

const Navbar = ({ auth, logout }) => (
    <nav>
        <div className="container">
            <ul className="navbar-container">
                <li>
                    <Link className="navbar-brand" to='/register'>Register</Link>
                </li>
                <li>
                    <Link className="navbar-item" to='/login'>Login</Link>
                </li>
                <li>
                    <a className="navbar-item" onClick={logout}>Logout</a>
                </li>
            </ul>
            {auth && auth.isAuthenticated && <p className="navbar-user">Logged in as {auth.user.email}</p>}
        </div>
    </nav>
);


export default connect(store => ({ auth: store.auth }), { logout })(Navbar);
import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Note: We're now using NavLink
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaBookOpen, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    // State for the mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // State for the user profile dropdown
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const activeLinkStyle = {
        color: 'var(--color-accent)',
        fontWeight: 'bold',
    };

    return (
        <nav className="bg-container border-b border-border shadow-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-text-primary">
                        <FaBookOpen className="text-accent" />
                        <span>BookVerse</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                        {user && <NavLink to="/add-book" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium">Add Book</NavLink>}

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-full text-text-primary hover:bg-background text-xl">
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>

                        {/* Auth Links / Profile Dropdown */}
                        {user ? (
                            <div className="relative">
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-text-primary font-medium focus:outline-none">
                                    Hi, {user.name || 'User'}
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-container rounded-md shadow-lg py-1 border border-border">
                                        <button onClick={() => { logout(); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='space-x-2'>
                                <NavLink to="/login" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
                                <NavLink to="/signup" className="bg-accent hover:bg-accent-hover text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</NavLink>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text-primary text-2xl">
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-container border-t border-border">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium">Home</NavLink>
                        {user ? (
                            <>
                                <NavLink to="/add-book" onClick={() => setIsMobileMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium">Add Book</NavLink>
                                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-left text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium">Login</NavLink>
                                <NavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium">Sign Up</NavLink>
                            </>
                        )}
                        <div className="flex justify-center pt-4">
                            <button onClick={toggleTheme} className="p-2 rounded-full text-text-primary hover:bg-background text-2xl">
                                {theme === 'light' ? <FaMoon /> : <FaSun />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
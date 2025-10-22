import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiPackage, FiPlusCircle, FiShoppingBag, FiX, FiMenu, FiUsers, FiLock, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../AuthContext';
import { adminNavbarStyles as styles } from '../assets/adminStyles';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  // Hide navbar on login page
  if (location.pathname === '/admin/login') {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.mainFlex}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoIconContainer}>
              <FiPackage className={styles.logoIcon} />
            </div>
            <h1 className={styles.logoText}>
              <span className={styles.logoAccent}>ANSHU BEAUTY HUB</span> Admin
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className={styles.desktopNavLinks}>
            <NavLink to="/admin/add-item" className={styles.navLink}>
              <FiPlusCircle className="mr-2" />
              Add Products
            </NavLink>

            <NavLink to="/admin/list-items" className={styles.navLink}>
              <FiPackage className="mr-2" />
              List Items
            </NavLink>

            <NavLink to="/admin/orders" className={styles.navLink}>
              <FiShoppingBag className="mr-2" />
              Orders
            </NavLink>

            <NavLink to="/admin/users" className={styles.navLink}>
              <FiUsers className="mr-2" />
              Users
            </NavLink>

            <NavLink to="/admin/change-password" className={styles.navLink}>
              <FiLock className="mr-2" />
              Change Password
            </NavLink>

            {isAuthenticated && (
              <button onClick={handleLogout} className={styles.navLink}>
                <FiLogOut className="mr-2" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileMenuButton}>
            <button onClick={toggleMobileMenu} className={styles.menuButton}>
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenuContainer} ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className={styles.mobileMenuInner}>
          <NavLink 
            to="/admin/add-item" 
            onClick={closeMobileMenu}
            className={styles.mobileNavLink}
          >
            <FiPlusCircle className="mr-3 ml-1" size={20} />
            Manage Products
          </NavLink>
          
          <NavLink 
            to="/admin/list-items" 
            onClick={closeMobileMenu}
            className={styles.mobileNavLink}
          >
            <FiPackage className="mr-3 ml-1" size={20} />
            Inventory
          </NavLink>
          
          <NavLink
            to="/admin/orders"
            onClick={closeMobileMenu}
            className={styles.mobileNavLink}
          >
            <FiShoppingBag className="mr-3 ml-1" size={20} />
            Orders
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={closeMobileMenu}
            className={styles.mobileNavLink}
          >
            <FiUsers className="mr-3 ml-1" size={20} />
            Users
          </NavLink>

          <NavLink
            to="/admin/change-password"
            onClick={closeMobileMenu}
            className={styles.mobileNavLink}
          >
            <FiLock className="mr-3 ml-1" size={20} />
            Change Password
          </NavLink>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className={styles.mobileNavLink}
            >
              <FiLogOut className="mr-3 ml-1" size={20} />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
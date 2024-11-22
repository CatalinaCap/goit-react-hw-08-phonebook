// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from './Navigation.module.css';

// function Navigation({ isLoggedIn }) {
//   return (
//     <nav className={styles.nav}>
//       <NavLink
//         to="/"
//         className={({ isActive }) => (isActive ? styles.active : styles.link)}
//       >
//         Home
//       </NavLink>

//       {!isLoggedIn && (
//         <>
//           <NavLink
//             to="/register"
//             className={({ isActive }) =>
//               isActive ? styles.active : styles.link
//             }
//           >
//             Register
//           </NavLink>
//           <NavLink
//             to="/login"
//             className={({ isActive }) =>
//               isActive ? styles.active : styles.link
//             }
//           >
//             LogOut
//           </NavLink>
//         </>
//       )}

//       {isLoggedIn && (
//         <NavLink
//           to="/contacts"
//           className={({ isActive }) => (isActive ? styles.active : styles.link)}
//         >
//           Contacts
//         </NavLink>
//       )}
//     </nav>
//   );
// }

// export default Navigation;
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());

    navigate('/login');
    localStorage.removeItem('token');
  };

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Home
      </NavLink>

      {isLoggedIn ? (
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      ) : (
        <>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            LogOut
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;

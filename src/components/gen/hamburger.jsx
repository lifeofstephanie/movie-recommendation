import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const HamburgerMenu = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Log Out Successful");
      navigate("/signin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center p-5 text-black relative z-20">
        <button className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          <MenuIcon style={{ fontSize: 30 }} />
        </button>
      </div>

      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 w-full h-full bg-gray-700 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex justify-end p-5">
          <button onClick={toggleMenu} className="text-black text-3xl">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col items-center mt-36 h-full">
          <nav className="space-y-6">
            <ul className="md:space-x-4 gap-4 flex flex-col md:hidden text-xl">
              <li>
                <NavLink
                  to="/"
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                >
                  {({ isActive }) => (
                    <>
                      Home
                      <div
                        className={
                          isActive
                            ? "w-[30px] h-[2px] rounded-[10px] bg-blue-700 mt-1"
                            : "hidden"
                        }
                      ></div>
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/genres"
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                >
                  {({ isActive }) => (
                    <>
                      Genres
                      <div
                        className={
                          isActive
                            ? "w-[30px] h-[2px] rounded-[10px] bg-blue-700 mt-1"
                            : "hidden"
                        }
                      ></div>
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/watchlist"
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? "font-bold" : "")}
                >
                  {({ isActive }) => (
                    <>
                      Watchlist
                      <div
                        className={
                          isActive
                            ? "w-[30px] h-[2px] rounded-[10px] bg-blue-700 mt-1"
                            : "hidden"
                        }
                      ></div>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="items-center gap-4 mt-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="border border-blue-600 rounded-full p-2 h-[40px] w-[40px] flex items-center justify-center bg-blue-500 text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.displayName
                    ? user.displayName[0].toUpperCase()
                    : user.email[0].toUpperCase()}
                </button>
                {dropdownOpen && (
                  <div className="absolute -left-8 mt-2 w-[100px] bg-white text-black rounded-md shadow-lg">
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:rounded-t-md"
                      onClick={() => { handleLinkClick(); navigate("/profile"); }}
                    >
                      Profile
                    </p>
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:rounded-b-md"
                      onClick={() => { handleLinkClick(); handleLogout(); }}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/signin">
                <button className="rounded-md p-2 h-[40px] w-[150px] flex items-center justify-center text-white bg-blue-700 hover:bg-blue-600" onClick={handleLinkClick}>
                  Sign In
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
      toast.success('Log Out Successful');
      navigate('/signin');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          MovieMate
        </NavLink>
        <nav>
          <ul className="flex space-x-4 gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/genres"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Genres
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/watchlist"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Watchlist
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="border border-blue-600 rounded-full p-2 h-[40px] w-[40px] flex items-center justify-center bg-blue-500 text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
              </button>
              {dropdownOpen && (
                <div className="absolute right-[0px] mt-2 w-[150px] bg-white text-black rounded-md shadow-lg">
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/profile')}>Profile</p>
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/signin">
              <button className="border border-black rounded-md p-2 h-[40px] flex items-center justify-center">
                Sign In
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

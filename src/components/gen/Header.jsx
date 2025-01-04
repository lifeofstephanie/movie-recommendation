import { NavLink } from "react-router-dom";

const Header = () => {
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
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/genres"
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                Genres
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                Watchlist
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/signin">
          <button className="border border-black rounded-md p-2 h-[40px] flex items-center justify-center">
            Sign In
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

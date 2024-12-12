import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MovieMate
        </Link>
        <nav>
          <ul className="flex space-x-4 gap-2">
            <li>
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link to="/genres" className="">
                Genres
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className="">
                Watchlist
              </Link>
            </li>
          </ul>
        </nav>
        <button className="border border-black rounded-md p-2 h-[40px] flex items-center justify-center">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;

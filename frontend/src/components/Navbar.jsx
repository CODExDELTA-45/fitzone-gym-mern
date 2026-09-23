import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-dark text-white px-6 py-5 flex justify-between items-center sticky top-0 z-50 border-b border-border">
      <Link to="/" className="text-2xl font-extrabold tracking-wide">
        FIT<span className="text-primary">ZONE</span>
      </Link>
      <div className="flex gap-8 items-center text-sm font-semibold uppercase tracking-wide">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <Link to="/plans" className="hover:text-primary transition">Plans</Link>
        <Link to="/trainers" className="hover:text-primary transition">Coaches</Link>
        <Link to="/contact" className="hover:text-primary transition">Contact</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-primary text-dark px-5 py-2 rounded-full font-bold hover:brightness-90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-primary transition">Login</Link>
            <Link
              to="/register"
              className="bg-primary text-dark px-5 py-2 rounded-full font-bold hover:brightness-90 transition"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

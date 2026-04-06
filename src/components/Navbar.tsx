import { Link } from "react-router-dom";
import logo from "@/assets/labyrinth-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-gold/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Labyrinth Digital" className="h-8 w-8 object-contain bg-transparent border-none p-0 shadow-none" />
          <span className="font-display text-deep text-lg tracking-brand hidden sm:inline">
            Labyrinth
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-body text-deep-50 text-sm tracking-brand-wide hidden sm:inline hover:text-deep transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/audit"
            className="bg-maroon text-cream font-body text-sm tracking-brand-wide px-5 py-2.5 hover:bg-maroon/90 transition-colors duration-200 rounded"
          >
            {window.innerWidth < 640 ? "Audit" : "Start Audit"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

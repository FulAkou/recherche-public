import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Icons/Logo";

const Header = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-24 sm:h-28 flex items-center justify-between bg-blue-100/50 backdrop-blur-sm shadow-md z-10 px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between w-full">
          {/* Logo côté gauche */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-gray-600 border border-gray-300 p-2 rounded">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

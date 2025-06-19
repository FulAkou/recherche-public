import Header from "../Header/Header";

const Navbar = () => {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  return (
    <div className="bg-white shadow-md ">
      <div className="container mx-auto px-4 py-7">
        <div className="flex justify-between items-center">
          <Header />
          {/* {user && (
            <div className="flex items-center space-x-4">
              {user.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/users")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Administration
                </button>
              )}
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Déconnexion
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

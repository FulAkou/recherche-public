import Logo from "../Icons/Logo";

const Header = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-24 sm:h-28 flex items-center justify-between bg-blue-100/50 backdrop-blur-sm shadow-md z-10 px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between w-full">
          {/* Logo côté gauche */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

import Logo from "../Icons/Logo";

const Header = () => {
  return (
    <>
      <nav className="flex items-center justify-between bg-blue-100/50 shadow-md h-28">
        <div className="px-12 ">
          <Logo />
        </div>
      </nav>
    </>
  );
};

export default Header;

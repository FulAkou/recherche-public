import Header from "../Header/Header";

const Navbar = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <Header />
      </div>
    </>
  );
};

export default Navbar;

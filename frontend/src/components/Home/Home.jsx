export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-6xl font-bold text-blue-500 text-center p-5">
          Welcome to <span>Inova</span> <span>Vizualization</span>
        </h1>
        <div className="flex justify-center items-center mt-7 border-2 border-blue-500 rounded-md w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Que recherchez-vous?"
            className="p-3 w-full text-xl  border-blue-500 focus:outline-none focus:border-blue-700"
          />
          <button className="bg-blue-500 text-white px-5 h-14 rounded-l-tr-md  hover:bg-blue-600 transition duration-300 cursor-pointer text-xl">
            Rechercher
          </button>
        </div>
        <div className="flex justify-around items-center mt-7 border-2 border-blue-500 rounded-md  w-1/2 mx-auto ">
          <div className="cursor-pointer hover:text-blue-600 hover:underline transition duration-300 text-blue-500 ">
            Sante
          </div>
          <div className="cursor-pointer hover:text-blue-600 hover:underline transition duration-300 text-blue-500 ">
            Education
          </div>
          <div className=" cursor-pointer hover:text-blue-600 hover:underline transition duration-300 text-blue-500">
            Economie
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

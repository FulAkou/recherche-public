// import { useState } from "react";
// import Dashboard from "./components/Dashboard";
// import Navbar from "./components/layout/Navbar";

// function App() {
//   const [activeChart, setActiveChart] = useState("production");

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar activeChart={activeChart} setActiveChart={setActiveChart} />
//       <div className="container mx-auto px-4 py-8">
//         <Dashboard activeChart={activeChart} />
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/layout/Navbar";
import Navbar2 from "./components/layout/Navbar2";

const App = () => {
  const [activeChart, setActiveChart] = useState("production");
  const [domaineAcitf, setDomaineAcitf] = useState("");

  return (
    <div className="min-h-screen  bg-gray-100">
      <Navbar />
      <main className="container mx-auto w-full  px-4 py-6">
        <Navbar2
          activeChart={activeChart}
          setActiveChart={setActiveChart}
          domaineAcitf={domaineAcitf}
          setDomaineAcitf={setDomaineAcitf}
        />
        <Dashboard activeChart={activeChart} />
      </main>
    </div>
  );
};

export default App;

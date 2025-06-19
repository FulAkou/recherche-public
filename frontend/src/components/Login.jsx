// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { authService } from "../services/authService";
// import "../styles/Login.css"; // Assuming you have a CSS file for styling

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const from = location.state?.from?.pathname || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email || !password) {
//       setError("Veuillez remplir tous les champs");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = await authService.login(email, password);
//       if (data && data.token) {
//         login(data.user, data.token);
//         navigate(from, { replace: true });
//       } else {
//         setError("Réponse invalide du serveur");
//       }
//     } catch (err) {
//       setError(err.message || "Une erreur est survenue lors de la connexion");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-[#a25ce2] font-['Roboto']">
//         <div className="max-w-sm w-full text-center text-white px-4">
//           <img src="iviz.png" alt="Logo Iviz" className="w-24 mx-auto mb-5" />
//           <h1 className="text-2xl font-semibold mb-8">CONNEXION</h1>
//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div className="flex items-center bg-white rounded-md px-3 py-2">
//               <img src="email.png" alt="Icône email" className="w-6 h-6 mr-3" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Adresse e-mail"
//                 className="flex-1 border-none outline-none text-black text-base"
//               />
//             </div>
//             <div className="flex items-center bg-white rounded-md px-3 py-2">
//               <img
//                 src="lock.png"
//                 alt="Icône mot de passe"
//                 className="w-6 h-6 mr-3"
//               />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Mot de passe"
//                 className="flex-1 border-none outline-none text-black text-base"
//               />
//             </div>
//             <button
//               type="submit"
//               className={`bg-white text-[#a25ce2] rounded-md py-3 font-bold text-lg hover:opacity-90 transition ${
//                 loading
//                   ? "bg-indigo-400 cursor-not-allowed"
//                   : "bg-indigo-300 hover:bg-indigo-400"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Connexion en cours...
//                 </span>
//               ) : (
//                 "VALIDER"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authService";
import "../styles/Login.css"; // Si tu veux garder des styles globaux

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      const data = await authService.login(email, password);
      if (data && data.token) {
        login(data.user, data.token);
        navigate(from, { replace: true });
      } else {
        setError("Réponse invalide du serveur");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a25ce2] font-['Roboto']">
      <div className="max-w-sm w-full text-center text-white px-4">
        <img src="iviz.png" alt="Logo Iviz" className="w-24 mx-auto mb-5" />
        <h1 className="text-2xl font-semibold mb-8">CONNEXION</h1>

        {error && (
          <div
            className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="block">{error}</span>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center bg-white rounded-md px-3 py-2">
            <img src="email.png" alt="Icône email" className="w-6 h-6 mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresse e-mail"
              className="flex-1 border-none outline-none text-black text-base"
              disabled={loading}
            />
          </div>

          <div className="flex items-center bg-white rounded-md px-3 py-2">
            <img
              src="lock.png"
              alt="Icône mot de passe"
              className="w-6 h-6 mr-3"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="flex-1 border-none outline-none text-black text-base"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-[#a25ce2] rounded-md py-3 font-bold text-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a25ce2] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-[#a25ce2]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Connexion en cours...
              </span>
            ) : (
              "VALIDER"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

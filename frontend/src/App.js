// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Display from "./pages/Display";
// import GestionServices from "./pages/GestionServices";
// import axios from "axios";

// // Axios global config
// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.withCredentials = true;

// function App() {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     axios
//       .get("/api/user")
//       .then(() => setAuthenticated(true))
//       .catch(() => setAuthenticated(false))
//       .finally(() => setAuthChecked(true));
//   }, []);

//   if (!authChecked) return <div>Loading...</div>;

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={!authenticated ? <Login /> : <Navigate to="/dashboard" />}
//       />
//       <Route
//         path="/dashboard"
//         element={authenticated ? <Dashboard /> : <Navigate to="/" />}
//       />
//       <Route path="/display" element={<Display />} />

//       {/* ✅ Nouvelle route vers GestionServices */}
//       <Route
//         path="/services"
//         element={authenticated ? <GestionServices /> : <Navigate to="/" />}
//       />
//     </Routes>
//   );
// }

// export default App;
// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Display from "./pages/Display";
// import GestionServices from "./pages/GestionServices";
// import Sidebar from "./pages/Sidebar";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.withCredentials = true;

// function App() {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [authenticated, setAuthenticated] = useState(false);
//   const location = useLocation();
//   const hideSidebarRoutes = ["/display"];
//   const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

//   useEffect(() => {
//     axios
//       .get("/api/user")
//       .then(() => setAuthenticated(true))
//       .catch(() => setAuthenticated(false))
//       .finally(() => setAuthChecked(true));
//   }, []);

//   if (!authChecked) return <div>Loading...</div>;

//   if (!authenticated) {
//     return <Login />;
//   }

//   return (
//     <div className="flex">
//       {!shouldHideSidebar && <Sidebar />}
//       <div className="flex-1 p-4 bg-gray-50 min-h-screen">
//         <Routes>
//           <Route path="/produits" element={<Dashboard />} />
//           <Route path="/services" element={<GestionServices />} />
//           <Route path="/display" element={<Display />} />
//           <Route path="*" element={<Navigate to="/produits" />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import "./index.css";
// import Dashboard from "./pages/Dashboard";
// import Display from "./pages/Display";
// import GestionServices from "./pages/GestionServices";
// import Sidebar from "./pages/Sidebar";
// import Navbar from "./pages/Navbar"; // 🆕 Navbar component
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.withCredentials = true;

// function App() {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [authenticated, setAuthenticated] = useState(false);
//   const location = useLocation();
//   const hideSidebarRoutes = ["/display"];
//   const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

//   useEffect(() => {
//     axios
//       .get("/api/user")
//       .then(() => setAuthenticated(true))
//       .catch(() => setAuthenticated(false))
//       .finally(() => setAuthChecked(true));
//   }, []);

//   if (!authChecked) return <div>Loading...</div>;

//   if (!authenticated) return <Login />;
//   return (
//     <div>
//       {!shouldHideSidebar && (
//         <div className="fixed left-0 top-0 h-screen w-64 z-50">
//           <Sidebar />
//         </div>
//       )}

//       <div className={`${!shouldHideSidebar ? "ml-64" : ""}`}>
//         {!shouldHideSidebar && <Navbar />}

//         <div className={`p-4 ${!shouldHideSidebar ? "pt-20" : ""}`}>
//           <Routes>
//             <Route path="/produits" element={<Dashboard />} />
//             <Route path="/services" element={<GestionServices />} />
//             <Route path="/display" element={<Display />} />
//             <Route path="*" element={<Navigate to="/produits" />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import "./index.css";
// import Dashboard from "./pages/Dashboard";
// import Display from "./pages/Display";
// import GestionServices from "./pages/GestionServices";
// import Sidebar from "./pages/Sidebar";
// import Navbar from "./pages/Navbar";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.withCredentials = true;

// function App() {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [authenticated, setAuthenticated] = useState(false);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   const location = useLocation();
//   const hideSidebarRoutes = ["/display"];
//   const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

//   useEffect(() => {
//     axios
//       .get("/api/user")
//       .then(() => setAuthenticated(true))
//       .catch(() => setAuthenticated(false))
//       .finally(() => setAuthChecked(true));
//   }, []);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   if (!authChecked) return <div>Loading...</div>;
//   if (!authenticated) return <Login />;

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       {!shouldHideSidebar && (
//         <div className="fixed left-0 top-0 h-screen w-64 z-50">
//           <Sidebar />
//         </div>
//       )}

//       <div
//         className={`${
//           !shouldHideSidebar ? "ml-64" : ""
//         } min-h-screen bg-gray-50 dark:bg-gray-900`}>
//         {!shouldHideSidebar && (
//           <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
//         )}

//         <div className={`p-4 ${!shouldHideSidebar ? "pt-20" : ""}`}>
//           <Routes>
//             <Route path="/produits" element={<Dashboard />} />
//             <Route path="/services" element={<GestionServices />} />
//             <Route path="/display" element={<Display />} />
//             <Route path="*" element={<Navigate to="/produits" />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Display from "./pages/Display";
import GestionServices from "./pages/GestionServices";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/Navbar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const location = useLocation();
  const hideSidebarRoutes = ["/display"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (!authChecked) return <div>Loading...</div>;
  if (!authenticated) return <Login />;

  return (
    <div className={`flex ${darkMode ? "dark" : ""}`}>
      {!shouldHideSidebar && (
        <div className="flex bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Sidebar />
        </div>
      )}

      <div
        className={`${
          !shouldHideSidebar ? "ml-64" : ""
        } flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
        {!shouldHideSidebar && (
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        )}

        <div className={`p-4 ${!shouldHideSidebar ? "pt-20" : ""}`}>
          <Routes>
            <Route path="/produits" element={<Dashboard />} />
            <Route path="/services" element={<GestionServices />} />
            <Route path="/display" element={<Display />} />
            <Route path="*" element={<Navigate to="/produits" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

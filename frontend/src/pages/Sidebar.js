// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Boxes, HeartPulse } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();

//   const navItems = [
//     { name: "Produits", icon: <Boxes size={20} />, path: "/produits" },
//     { name: "Services", icon: <HeartPulse size={20} />, path: "/services" },
//   ];

//   return (
//     <div className="h-screen w-64 bg-white border-r p-4 shadow-sm">
//       <h1 className="text-2xl font-bold mb-8">
//         <span className="text-blue-600">Para</span>Pharmacy
//       </h1>

//       <nav className="flex flex-col gap-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             to={item.path}
//             className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-blue-50 ${
//               location.pathname === item.path
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-gray-700"
//             }`}>
//             {item.icon}
//             <span className="text-sm font-medium">{item.name}</span>
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Boxes, HeartPulse, LogOut } from "lucide-react";
// import logo from "../assets/logo.png"; // عوّض المسار إذا الشعار في مكان آخر
// import axios from "axios";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const navItems = [
//     { name: "Produits", icon: <Boxes size={20} />, path: "/produits" },
//     { name: "Services", icon: <HeartPulse size={20} />, path: "/services" },
//   ];

//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });

//       await axios.post(
//         "http://localhost:8000/logout",
//         {},
//         {
//           headers: {
//             "X-XSRF-TOKEN": decodeURIComponent(
//               document.cookie
//                 .split("; ")
//                 .find((row) => row.startsWith("XSRF-TOKEN="))
//                 ?.split("=")[1] || ""
//             ),
//           },
//           withCredentials: true,
//         }
//       );

//       localStorage.removeItem("token");
//       window.location.href = "/"; // يرجع المستخدم للصفحة الرئيسية (login)
//     } catch (err) {
//       console.error("Erreur de déconnexion:", err);
//     }
//   };

//   return (
//     <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between">
//       <div className="p-4">
//         <div className="flex items-center gap-3 mb-8">
//           <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
//           <h1 className="text-xl font-bold text-blue-600">M3A PHARMA</h1>
//         </div>

//         <nav className="flex flex-col gap-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-blue-50 ${
//                 location.pathname === item.path
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-gray-700"
//               }`}>
//               {item.icon}
//               <span className="text-sm font-medium">{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 border-t">
//         <LogOut size={20} />
//         <span className="text-sm font-medium">Déconnexion</span>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Boxes, HeartPulse, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import axios from "axios";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Produits", icon: <Boxes size={20} />, path: "/produits" },
    { name: "Services", icon: <HeartPulse size={20} />, path: "/services" },
  ];

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      await axios.post(
        "http://localhost:8000/logout",
        {},
        {
          headers: {
            "X-XSRF-TOKEN": decodeURIComponent(
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("XSRF-TOKEN="))
                ?.split("=")[1] || ""
            ),
          },
          withCredentials: true,
        }
      );

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error("Erreur de déconnexion:", err);
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r shadow-md flex flex-col justify-between z-50">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            M3A PHARMA
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
              }`}>
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <LogOut size={20} />
        <span className="text-sm font-medium">Déconnexion</span>
      </button>
    </div>
  );
};

export default Sidebar;

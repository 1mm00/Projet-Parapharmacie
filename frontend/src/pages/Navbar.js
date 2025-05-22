// import React, { useState, useEffect } from "react";
// import { Moon, Sun } from "lucide-react";

// const Navbar = ({ darkMode, setDarkMode }) => {
//   useEffect(() => {
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   return (
//     <nav className="bg-white dark:bg-gray-900 shadow px-6 py-4 fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo + Name */}
//         <div className="flex items-center gap-3">
//           <span className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
//             Système de gestion parapharmaceutique
//           </span>
//         </div>

//         {/* Toggle Dark Mode */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-64 right-0 z-40 bg-white dark:bg-gray-900 shadow px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Name */}
        <div className="overflow-hidden w-[500px] md:w-[1000px]">
          <p className="whitespace-nowrap animate-scrollText text-blue-700 dark:text-blue-300 font-semibold text-sm text-center">
            Système de gestion parapharmaceutique
          </p>
        </div>

        {/* Toggle Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

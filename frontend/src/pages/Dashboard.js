// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Plus,
//   Trash2,
//   LogOut,
//   CalendarCheck,
//   Loader,
//   Pencil,
// } from "lucide-react";
// import logo from "../assets/logo.png";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formVisible, setFormVisible] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     promotion_percentage: "",
//     promotion_start: "",
//     promotion_end: "",
//     image: null,
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/products?_=${Date.now()}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Erreur lors du chargement des produits:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCsrfToken = () => {
//     return decodeURIComponent(
//       document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("XSRF-TOKEN="))
//         ?.split("=")[1] || ""
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });

//       const url = editingProductId
//         ? `http://localhost:8000/api/products/${editingProductId}`
//         : "http://localhost:8000/api/products";

//       let payload = new FormData();
//       let headers = {
//         "X-XSRF-TOKEN": getCsrfToken(),
//         "Content-Type": "multipart/form-data",
//       };

//       if (editingProductId) {
//         payload.append("_method", "PUT");
//       }

//       Object.entries(form).forEach(([key, value]) => {
//         if (key === "image") {
//           if (value) payload.append("image", value);
//         } else {
//           payload.append(key, value);
//         }
//       });

//       await axios.post(url, payload, {
//         headers,
//         withCredentials: true,
//       });

//       setForm({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         promotion_percentage: "",
//         promotion_start: "",
//         promotion_end: "",
//         image: null,
//       });
//       setEditingProductId(null);
//       setFormVisible(false);
//       fetchProducts();
//     } catch (err) {
//       console.error("Erreur lors de l'enregistrement:", err);
//     }
//   };

//   const handleEdit = (product) => {
//     setForm({
//       name: product.name || "",
//       description: product.description || "",
//       price: product.price || "",
//       stock: product.stock || "",
//       promotion_percentage: product.promotion_percentage || "",
//       promotion_start: product.promotion_start || "",
//       promotion_end: product.promotion_end || "",
//       image: null,
//     });
//     setEditingProductId(product.id);
//     setFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
//     try {
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });
//       await axios.delete(`http://localhost:8000/api/products/${id}`, {
//         headers: { "X-XSRF-TOKEN": getCsrfToken() },
//         withCredentials: true,
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Erreur lors de la suppression:", err);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });
//       await axios.post(
//         "http://localhost:8000/logout",
//         {},
//         {
//           headers: { "X-XSRF-TOKEN": getCsrfToken() },
//           withCredentials: true,
//         }
//       );
//       localStorage.removeItem("token");
//       window.location.replace("/");
//     } catch (err) {
//       console.error("Erreur lors de la déconnexion:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
//       <nav className="bg-white shadow sticky top-0 z-50 h-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//           <div className="flex justify-between items-center h-full">
//             <div className="flex items-center gap-4">
//               <img src={logo} alt="M3A PHARMA" className="h-14 w-auto" />
//               <span className="font-bold text-indigo-700 text-2xl">
//                 M3A PHARMA
//               </span>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 text-sm">
//               <LogOut size={18} />
//               <span>Déconnexion</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="p-6 max-w-7xl mx-auto">
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
//               <CalendarCheck size={20} /> Liste des Produits ({products.length})
//             </h2>
//             <button
//               onClick={() => {
//                 setFormVisible(!formVisible);
//                 setForm({
//                   name: "",
//                   description: "",
//                   price: "",
//                   stock: "",
//                   promotion_percentage: "",
//                   promotion_start: "",
//                   promotion_end: "",
//                   image: null,
//                 });
//                 setEditingProductId(null);
//               }}
//               className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
//               <Plus size={18} /> {formVisible ? "Fermer" : "Ajouter Produit"}
//             </button>
//           </div>

//           {formVisible && (
//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-indigo-50 p-4 rounded-xl">
//               <input
//                 type="text"
//                 placeholder="Nom"
//                 value={form.name || ""}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="number"
//                 placeholder="Prix"
//                 value={form.price || ""}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//                 required
//                 className="p-3 rounded-lg border"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={form.description || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 className="p-3 rounded-lg border col-span-full"
//               />
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 value={form.stock || ""}
//                 onChange={(e) => setForm({ ...form, stock: e.target.value })}
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="number"
//                 placeholder="Promotion (%)"
//                 value={form.promotion_percentage || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, promotion_percentage: e.target.value })
//                 }
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="date"
//                 value={form.promotion_start || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, promotion_start: e.target.value })
//                 }
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="date"
//                 value={form.promotion_end || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, promotion_end: e.target.value })
//                 }
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//                 className="p-3 rounded-lg border col-span-full"
//               />
//               <button
//                 type="submit"
//                 className="col-span-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold">
//                 {editingProductId ? "Mettre à jour" : "Enregistrer"}
//               </button>
//             </form>
//           )}

//           {loading ? (
//             <div className="flex justify-center py-8 text-indigo-600">
//               <Loader className="animate-spin" size={32} />
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-xl">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-indigo-100 text-indigo-800">
//                   <tr>
//                     <th className="p-3">Nom</th>
//                     <th className="p-3">Prix</th>
//                     <th className="p-3">Stock</th>
//                     <th className="p-3">Promotion</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((p) => (
//                     <tr key={p.id} className="border-t hover:bg-indigo-50">
//                       <td className="p-3 font-medium text-gray-800">
//                         {p.name}
//                       </td>
//                       <td className="p-3">{p.price} DH</td>
//                       <td className="p-3">{p.stock}</td>
//                       <td className="p-3">{p.promotion_percentage || "0"}%</td>
//                       <td className="p-3 text-right flex gap-3 justify-end">
//                         <button
//                           onClick={() => handleEdit(p)}
//                           className="text-blue-600 hover:text-blue-800">
//                           <Pencil size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.id)}
//                           className="text-red-600 hover:text-red-800">
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, CalendarCheck, Loader, Pencil } from "lucide-react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    promotion_percentage: "",
    promotion_start: "",
    promotion_end: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/products?_=${Date.now()}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCsrfToken = () => {
    return decodeURIComponent(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1] || ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const url = editingProductId
        ? `http://localhost:8000/api/products/${editingProductId}`
        : "http://localhost:8000/api/products";

      let payload = new FormData();
      let headers = {
        "X-XSRF-TOKEN": getCsrfToken(),
        "Content-Type": "multipart/form-data",
      };

      if (editingProductId) {
        payload.append("_method", "PUT");
      }

      Object.entries(form).forEach(([key, value]) => {
        if (key === "image") {
          if (value) payload.append("image", value);
        } else {
          payload.append(key, value);
        }
      });

      await axios.post(url, payload, {
        headers,
        withCredentials: true,
      });

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        promotion_percentage: "",
        promotion_start: "",
        promotion_end: "",
        image: null,
      });
      setEditingProductId(null);
      setFormVisible(false);
      fetchProducts();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      promotion_percentage: product.promotion_percentage || "",
      promotion_start: product.promotion_start || "",
      promotion_end: product.promotion_end || "",
      image: null,
    });
    setEditingProductId(product.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: { "X-XSRF-TOKEN": getCsrfToken() },
        withCredentials: true,
      });
      fetchProducts();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <main className="p-6 max-w-7xl mx-auto">
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <CalendarCheck size={20} /> Liste des Produits ({products.length})
            </h2>
            <button
              onClick={() => {
                setFormVisible(!formVisible);
                setForm({
                  name: "",
                  description: "",
                  price: "",
                  stock: "",
                  promotion_percentage: "",
                  promotion_start: "",
                  promotion_end: "",
                  image: null,
                });
                setEditingProductId(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
              <Plus size={18} /> {formVisible ? "Fermer" : "Ajouter Produit"}
            </button>
          </div>

          {formVisible && (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-indigo-50 p-4 rounded-xl">
              <input
                type="text"
                placeholder="Nom"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="p-3 rounded-lg border"
              />
              <input
                type="number"
                placeholder="Prix"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="p-3 rounded-lg border"
              />
              <textarea
                placeholder="Description"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="p-3 rounded-lg border col-span-full"
              />
              <input
                type="number"
                placeholder="Stock"
                value={form.stock || ""}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="p-3 rounded-lg border"
              />
              <input
                type="number"
                placeholder="Promotion (%)"
                value={form.promotion_percentage || ""}
                onChange={(e) =>
                  setForm({ ...form, promotion_percentage: e.target.value })
                }
                className="p-3 rounded-lg border"
              />
              <input
                type="date"
                value={form.promotion_start || ""}
                onChange={(e) =>
                  setForm({ ...form, promotion_start: e.target.value })
                }
                className="p-3 rounded-lg border"
              />
              <input
                type="date"
                value={form.promotion_end || ""}
                onChange={(e) =>
                  setForm({ ...form, promotion_end: e.target.value })
                }
                className="p-3 rounded-lg border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="p-3 rounded-lg border col-span-full"
              />
              <button
                type="submit"
                className="col-span-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold">
                {editingProductId ? "Mettre à jour" : "Enregistrer"}
              </button>
            </form>
          )}

          {loading ? (
            <div className="flex justify-center py-8 text-indigo-600">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-indigo-100 text-indigo-800">
                  <tr>
                    <th className="p-3">Nom</th>
                    <th className="p-3">Prix</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Promotion</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-indigo-50">
                      <td className="p-3 font-medium text-gray-800">
                        {p.name}
                      </td>
                      <td className="p-3">{p.price} DH</td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3">{p.promotion_percentage || "0"}%</td>
                      <td className="p-3 text-right flex gap-3 justify-end">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:text-blue-800">
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
//**********3***************** */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, Trash2, CalendarCheck, Loader, Pencil } from "lucide-react";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formVisible, setFormVisible] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     promotion_percentage: "",
//     promotion_start: "",
//     promotion_end: "",
//     image: null,
//   });
//   const [search, setSearch] = useState("");
//   const [sortField, setSortField] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/products?_=${Date.now()}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Erreur lors du chargement des produits:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCsrfToken = () => {
//     return decodeURIComponent(
//       document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("XSRF-TOKEN="))
//         ?.split("=")[1] || ""
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });

//       const url = editingProductId
//         ? `http://localhost:8000/api/products/${editingProductId}`
//         : "http://localhost:8000/api/products";

//       let payload = new FormData();
//       let headers = {
//         "X-XSRF-TOKEN": getCsrfToken(),
//         "Content-Type": "multipart/form-data",
//       };

//       if (editingProductId) {
//         payload.append("_method", "PUT");
//       }

//       Object.entries(form).forEach(([key, value]) => {
//         if (key === "image") {
//           if (value) payload.append("image", value);
//         } else {
//           payload.append(key, value);
//         }
//       });

//       await axios.post(url, payload, {
//         headers,
//         withCredentials: true,
//       });

//       setForm({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         promotion_percentage: "",
//         promotion_start: "",
//         promotion_end: "",
//         image: null,
//       });
//       setEditingProductId(null);
//       setFormVisible(false);
//       fetchProducts();
//     } catch (err) {
//       console.error("Erreur lors de l'enregistrement:", err);
//     }
//   };

//   const handleEdit = (product) => {
//     setForm({
//       name: product.name || "",
//       description: product.description || "",
//       price: product.price || "",
//       stock: product.stock || "",
//       promotion_percentage: product.promotion_percentage || "",
//       promotion_start: product.promotion_start || "",
//       promotion_end: product.promotion_end || "",
//       image: null,
//     });
//     setEditingProductId(product.id);
//     setFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
//     try {
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });
//       await axios.delete(`http://localhost:8000/api/products/${id}`, {
//         headers: { "X-XSRF-TOKEN": getCsrfToken() },
//         withCredentials: true,
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Erreur lors de la suppression:", err);
//     }
//   };

//   const filteredProducts = products
//     .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       let fieldA = a[sortField];
//       let fieldB = b[sortField];
//       if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
//       if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();
//       if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
//       if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
//       <main className="p-6 max-w-7xl mx-auto">
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
//               <CalendarCheck size={20} /> Liste des Produits ({products.length})
//             </h2>
//             <button
//               onClick={() => {
//                 setFormVisible(!formVisible);
//                 setForm({
//                   name: "",
//                   description: "",
//                   price: "",
//                   stock: "",
//                   promotion_percentage: "",
//                   promotion_start: "",
//                   promotion_end: "",
//                   image: null,
//                 });
//                 setEditingProductId(null);
//               }}
//               className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
//               <Plus size={18} /> {formVisible ? "Fermer" : "Ajouter Produit"}
//             </button>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Rechercher un produit..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="p-3 border rounded w-full md:w-1/2"
//             />
//             <select
//               value={sortField + ":" + sortOrder}
//               onChange={(e) => {
//                 const [field, order] = e.target.value.split(":");
//                 setSortField(field);
//                 setSortOrder(order);
//               }}
//               className="p-3 border rounded w-full md:w-1/2">
//               <option value="name:asc">Nom A-Z</option>
//               <option value="name:desc">Nom Z-A</option>
//               <option value="price:asc">Prix Croissant</option>
//               <option value="price:desc">Prix Décroissant</option>
//               <option value="stock:asc">Stock Min</option>
//               <option value="stock:desc">Stock Max</option>
//             </select>
//           </div>

//           {formVisible && (
//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-indigo-50 p-4 rounded-xl">
//               <input
//                 type="text"
//                 placeholder="Nom"
//                 value={form.name || ""}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="number"
//                 placeholder="Prix"
//                 value={form.price || ""}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//                 required
//                 className="p-3 rounded-lg border"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={form.description || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 className="p-3 rounded-lg border col-span-full"
//               />
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 value={form.stock || ""}
//                 onChange={(e) => setForm({ ...form, stock: e.target.value })}
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="number"
//                 placeholder="Promotion (%)"
//                 value={form.promotion_percentage || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, promotion_percentage: e.target.value })
//                 }
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="date"
//                 value={form.promotion_start || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, promotion_start: e.target.value })
//                 }
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="date"
//                 value={form.promotion_end || ""}
//                 onChange={(e) =>
//                   setForm({ ...form, promotion_end: e.target.value })
//                 }
//                 className="p-3 rounded-lg border"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//                 className="p-3 rounded-lg border col-span-full"
//               />
//               <button
//                 type="submit"
//                 className="col-span-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold">
//                 {editingProductId ? "Mettre à jour" : "Enregistrer"}
//               </button>
//             </form>
//           )}

//           {loading ? (
//             <div className="flex justify-center py-8 text-indigo-600">
//               <Loader className="animate-spin" size={32} />
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-xl">
//               <table className="min-w-full text-sm text-left border">
//                 <thead className="bg-indigo-100 text-indigo-800">
//                   <tr>
//                     <th className="p-3">Nom</th>
//                     <th className="p-3">Prix</th>
//                     <th className="p-3">Stock</th>
//                     <th className="p-3">Promotion</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProducts.map((p) => (
//                     <tr key={p.id} className="border-t hover:bg-indigo-50">
//                       <td className="p-3 font-medium text-gray-800">
//                         {p.name}
//                       </td>
//                       <td className="p-3">{p.price} DH</td>
//                       <td className="p-3">{p.stock}</td>
//                       <td className="p-3">{p.promotion_percentage || "0"}%</td>
//                       <td className="p-3 text-right flex gap-3 justify-end">
//                         <button
//                           onClick={() => handleEdit(p)}
//                           className="text-blue-600 hover:text-blue-800">
//                           <Pencil size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.id)}
//                           className="text-red-600 hover:text-red-800">
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, Trash2, Pencil } from "lucide-react";

// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/products", {
//         withCredentials: true,
//       });
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Erreur lors du chargement des produits:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const filtered = products
//     .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       if (sort === "name-asc") return a.name.localeCompare(b.name);
//       if (sort === "name-desc") return b.name.localeCompare(a.name);
//       if (sort === "price") return parseFloat(a.price) - parseFloat(b.price);
//       if (sort === "stock") return a.stock - b.stock;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Products Management
//             </h1>
//             <p className="text-sm text-gray-500">
//               Manage your parapharmacy products
//             </p>
//           </div>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2">
//             <Plus size={18} /> Add New Product
//           </button>
//         </div>

//         <div className="flex justify-between items-center mb-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select
//             onChange={(e) => setSort(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
//             <option value="">Sort By</option>
//             <option value="name-asc">Name A-Z</option>
//             <option value="name-desc">Name Z-A</option>
//             <option value="price">Price</option>
//             <option value="stock">Stock</option>
//           </select>
//         </div>

//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="p-3 font-semibold">PRODUCT</th>
//               <th className="p-3 font-semibold">CATEGORY</th>
//               <th className="p-3 font-semibold">PRICE</th>
//               <th className="p-3 font-semibold">STOCK</th>
//               <th className="p-3 font-semibold">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((p) => (
//               <tr key={p.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3 flex items-center gap-4">
//                   <img
//                     src={`http://localhost:8000/storage/${p.image}`}
//                     alt={p.name}
//                     className="w-12 h-12 rounded object-cover"
//                   />
//                   <div>
//                     <p className="font-bold text-gray-800">{p.name}</p>
//                     <p className="text-xs text-gray-500">{p.description}</p>
//                   </div>
//                 </td>
//                 <td className="p-3">
//                   <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
//                     {p.category || "-"}
//                   </span>
//                 </td>
//                 <td className="p-3">${parseFloat(p.price).toFixed(2)}</td>
//                 <td className="p-3">{p.stock}</td>
//                 <td className="p-3 flex gap-3">
//                   <button className="text-blue-600 hover:text-blue-800">
//                     <Pencil size={16} />
//                   </button>
//                   <button className="text-red-600 hover:text-red-800">
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

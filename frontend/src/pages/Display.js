import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  LayoutGrid,
  Monitor,
  HeartPulse,
  Sparkles,
  Star,
  ShoppingBag,
  Zap,
  Award,
  ArrowRight,
  Heart,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";

const Display = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mode, setMode] = useState("slideshow");
  const [clock, setClock] = useState({ time: "", date: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Erreur chargement produits:", error));

    axios
      .get("http://localhost:8000/api/services")
      .then((res) => setServices(res.data))
      .catch((error) => console.error("Erreur chargement services:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setClock(updateClock()), 1000);
    return () => clearInterval(interval);
  }, []);

  const updateClock = () => {
    const now = new Date();
    const dateFr = now.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const dateAr = now.toLocaleDateString("ar-MA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return {
      time: now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: `${dateFr} / ${dateAr}`,
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (products.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [products]);

  const calculateDiscountedPrice = (price, promotion) => {
    return promotion > 0 ? price - (price * promotion) / 100 : price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white font-sans overflow-hidden relative">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      {/* Header layout updated: logo left, mode center, time right */}
      <header className="relative z-50 px-6 py-4 bg-gradient-to-r from-emerald-900/95 via-teal-800/95 to-cyan-900/95 backdrop-blur-lg border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
              <HeartPulse className="text-white w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                M3A Pharma
              </h1>
              <p className="text-emerald-200 text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" /> Santé et bien-être
              </p>
            </div>
          </div>

          {/* Mode toggle center */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setMode(mode === "slideshow" ? "grid" : "slideshow")
              }
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2">
              {mode === "slideshow" ? (
                <LayoutGrid className="w-4 h-4" />
              ) : (
                <Monitor className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {mode === "slideshow" ? "Mode Catalogue" : "Mode Présentation"}
              </span>
            </button>
          </div>

          {/* Time and date */}
          <div className="text-right text-sm bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <div className="text-white font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-300" /> {clock.time}
            </div>
            <div className="text-emerald-200 mt-1 max-w-xs truncate">
              {clock.date}
            </div>
          </div>
        </div>
      </header>
      {mode === "slideshow" && (
        <div className="relative z-10 pt-8 px-6 h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="max-w-7xl mx-auto">
            {products.length > 0 && (
              <div className="relative">
                {/* Indicateurs de slide */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-emerald-400 scale-125"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Slide principal */}
                <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-2xl"></div>

                  <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                    {/* Image du produit */}
                    <div className="lg:w-1/2 relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white rounded-2xl p-6 shadow-xl transform group-hover:scale-105 transition-all duration-500">
                        <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                          {products[currentSlide].image ? (
                            <img
                              src={`http://localhost:8000/storage/${products[currentSlide].image}`}
                              alt={products[currentSlide].name}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-cyan-100/50"></div>
                              <div className="relative z-10 text-6xl font-bold text-gray-300">
                                {products[currentSlide].name.charAt(0)}
                              </div>
                            </>
                          )}
                          {products[currentSlide].promotion_percentage > 0 && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                              -{products[currentSlide].promotion_percentage}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Informations du produit */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                      <div className="mb-4">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {products[currentSlide].category || "Produit"}
                        </span>
                      </div>

                      <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                        {products[currentSlide].name}
                      </h2>

                      <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                        {products[currentSlide].description}
                      </p>

                      <div className="flex items-center justify-center lg:justify-start gap-6 mb-8">
                        {products[currentSlide].promotion_percentage > 0 ? (
                          <div className="flex items-center gap-4">
                            <span className="text-5xl font-bold text-emerald-300">
                              {calculateDiscountedPrice(
                                products[currentSlide].price,
                                products[currentSlide].promotion_percentage
                              )}{" "}
                              DH
                            </span>
                            <span className="text-2xl text-gray-400 line-through">
                              {products[currentSlide].price} DH
                            </span>
                          </div>
                        ) : (
                          <span className="text-5xl font-bold text-emerald-300">
                            {products[currentSlide].price} DH
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center lg:justify-start gap-6">
                        <div className="flex items-center gap-2 text-emerald-200">
                          <ShoppingBag className="w-5 h-5" />
                          <span>
                            Stock: {products[currentSlide].stock || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Mode Grid amélioré */}
      {mode === "grid" && (
        <div className="relative z-10 pt-8 px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Sparkles className="text-emerald-300" />
                Catalogue de Produits
                <Sparkles className="text-emerald-300" />
              </h2>
              <p className="text-emerald-200 text-lg">
                Découvrez notre sélection de produits de qualité
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-white rounded-xl overflow-hidden relative">
                      {product.image ? (
                        <img
                          src={`http://localhost:8000/storage/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-300">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {product.promotion_percentage > 0 && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold animate-pulse">
                          -{product.promotion_percentage}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                      {product.category || "Produit"}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-emerald-100 mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      {product.promotion_percentage > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-emerald-300">
                            {calculateDiscountedPrice(
                              product.price,
                              product.promotion_percentage
                            )}{" "}
                            DH
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {product.price} DH
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-emerald-300">
                          {product.price} DH
                        </span>
                      )}

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-emerald-200">
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        Stock: {product.stock || 0}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Footer des services amélioré */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-900/95 via-teal-800/95 to-cyan-900/95 backdrop-blur-lg border-t border-emerald-500/30 shadow-2xl">
        <div className="py-4 px-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Heart className="text-red-400 w-5 h-5" />
              Nos Services
            </h3>
            <div className="text-xs text-emerald-200">
              Disponibles maintenant
            </div>
          </div>

          <div className="overflow-hidden relative">
            <div
              className="flex gap-6 animate-slide py-2"
              style={{
                animation: `slide ${services.length * 6}s linear infinite`,
                animationPlayState: "running",
              }}>
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="flex-shrink-0 bg-gradient-to-r from-emerald-700/80 to-teal-700/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 min-w-[280px]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                        {service.image ? (
                          <img
                            src={`http://localhost:8000/storage/${service.image}`}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Zap className="text-white w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm mb-1">
                          {service.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-emerald-300">
                            {service.price} DH
                          </span>
                          <span className="bg-emerald-600/50 text-emerald-200 px-2 py-1 rounded-full text-xs font-medium">
                            Service
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="text-emerald-300 w-4 h-4 opacity-60" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-shrink-0 bg-gradient-to-r from-emerald-700/80 to-teal-700/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-emerald-500/30 min-w-[280px]">
                  <p className="text-center text-emerald-200">
                    Aucun service disponible
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-slide:hover {
          animation-play-state: paused;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Display;

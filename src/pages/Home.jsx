import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import Loading from "../components/Loading.jsx";
import Alert from "../components/Alert.jsx";
import Chatbot from "../components/Chatbot.jsx";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/api.js";

const defaultUser = {
  name: "Cliente Demo",
  email: "cliente@germenmarket.com",
  role: "customer",
  label: "Cliente",
};

const preferredCategories = [
  "Todas",
  "Despensa",
  "Bebidas",
  "Dulces",
  "Chucherías",
  "Carnes",
  "Embutidos",
  "Cocina",
  "Salsas y condimentos",
  "Café y cacao",
  "Congelados",
];

const categoryText = {
  Todas: "Todo el catálogo de productos latinos disponible para tu compra online.",
  Chucherías: "Dulces, snacks y antojos latinos para compartir.",
  Despensa: "Productos básicos para recetas de casa, arepas, empanadas y comidas familiares.",
  Bebidas: "Refrescos, maltas y bebidas populares de Latinoamérica.",
  Carnes: "Cortes seleccionados por encargo y según disponibilidad.",
  Embutidos: "Chorizos, bacon, mortadela y fiambres para tus recetas.",
  Cocina: "Productos prácticos para preparar y acompañar recetas latinas.",
  "Salsas y condimentos": "Sabor latino para carnes, sopas, guisos y comidas caseras.",
  "Café y cacao": "Café, cacao y bebidas calientes con sabor de casa.",
  Congelados: "Productos congelados para conservar mejor y preparar fácilmente.",
};

const categoryCards = [
  { name: "Despensa", image: "/images/category-despensa.jpg" },
  { name: "Bebidas", image: "/images/category-bebidas.jpg" },
  { name: "Dulces", image: "/images/category-dulces.jpg" },
  { name: "Carnes", image: "/images/category-carnes.jpg" },
  { name: "Embutidos", image: "/images/category-embutidos.jpg" },
];

const heroSlides = [
  {
    image: "/images/germen-nuestra-cultura-en-tu-mesa.png",
    alt: "Germen Latin Market: productos latinos, carnes y embutidos",
  },
  {
    image: "/images/nuestra-cultura-en-tu-mesa.png",
    alt: "Germen Latin Market: nuestra cultura en tu mesa con bebidas y productos destacados",
  },
];

const normalizeText = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const matchesSearchToken = (text, token) => {
  if (!token) return true;
  const singularToken = token.endsWith("s") ? token.slice(0, -1) : token;
  return text.includes(token) || text.includes(singularToken);
};

function Home() {
  const [products, setProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const canManageProducts = ["admin", "editor"].includes(currentUser?.role);
  const canDeleteProducts = currentUser?.role === "admin";

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (apiError) {
      setError(apiError.message || "No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const categories = useMemo(() => {
    const fromProducts = products.map((product) => product.category).filter(Boolean);
    return [...new Set([...preferredCategories, ...fromProducts])];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchText = normalizeText(search);
    const searchTokens = searchText.split(/\s+/).filter(Boolean);

    return products.filter((product) => {
      const textToSearch = normalizeText([
        product.name,
        product.description,
        product.category,
        product.material,
        product.color,
        product.capacity,
        product.weight,
      ].filter(Boolean).join(" "));

      const productCategory = normalizeText(product.category);
      const selectedCategory = normalizeText(category);
      const matchesCategory = category === "Todas" || productCategory === selectedCategory;
      const matchesSearch = searchTokens.length === 0 || searchTokens.every((token) => matchesSearchToken(textToSearch, token));
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  const featuredProducts = useMemo(() => {
    const featured = products.filter((product) => product.featured);
    return (featured.length > 0 ? featured : products).slice(0, 6);
  }, [products]);

  const handleSubmit = async (productData) => {
    if (!canManageProducts) {
      setError("Solo usuarios con privilegios pueden modificar el catálogo.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      if (editingProduct?._id) {
        await updateProduct(editingProduct._id, productData);
        setSuccess("Producto actualizado correctamente.");
        setEditingProduct(null);
      } else {
        await createProduct(productData);
        setSuccess("Producto agregado al catálogo correctamente.");
      }

      await loadProducts();
    } catch (apiError) {
      setError(apiError.message || "No se pudo guardar el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setSuccess("");
    setError("");
    setTimeout(() => {
      document.getElementById("gestion")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleDelete = async (product) => {
    if (!canDeleteProducts) {
      setError("Solo el administrador puede eliminar productos del catálogo.");
      return;
    }

    const confirmDelete = window.confirm(`¿Seguro que quieres eliminar "${product.name}" del catálogo?`);
    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");
      await deleteProduct(product._id);
      setSuccess("Producto eliminado correctamente.");
      await loadProducts();
    } catch (apiError) {
      setError(apiError.message || "No se pudo eliminar el producto.");
    }
  };

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="inicio" className="min-h-screen bg-white text-[#2b1217]">
      <Header
        currentUser={currentUser}
        onChangeUser={setCurrentUser}
        search={search}
        onSearchChange={setSearch}
        onSelectCategory={setCategory}
        onOpenChat={() => setChatbotOpen(true)}
      />

      <main>
        <section className="bg-white py-6 md:py-8">
          <div className="mx-auto max-w-[1560px] px-4 lg:px-8">
            <div className="relative aspect-[2/1] overflow-hidden rounded-[2rem] border border-[#f0d9df] bg-[#fff8f5] shadow-[0_24px_70px_rgba(91,7,23,0.12)]">
              {heroSlides.map((slide, index) => (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    heroSlideIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    aria-label={`Ver imagen promocional ${index + 1}`}
                    onClick={() => setHeroSlideIndex(index)}
                    className={`h-3 w-3 rounded-full border border-white/80 transition ${
                      heroSlideIndex === index ? "bg-[#8a0f2a] shadow-lg" : "bg-white/75 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                className="inline-flex items-center gap-3 rounded-full bg-[#8a0f2a] px-8 py-4 text-sm font-black text-white shadow-[0_16px_30px_rgba(138,15,42,0.24)] transition hover:-translate-y-0.5 hover:bg-[#630016]"
                href="#catalogo"
              >
                🛒 Compra online →
              </a>
              <a
                className="inline-flex items-center gap-3 rounded-full border border-[#8a0f2a] bg-white px-8 py-4 text-sm font-black text-[#8a0f2a] transition hover:bg-[#8a0f2a] hover:text-white"
                href="#conocenos"
              >
                Conócenos
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[#f0d9df] bg-white">
          <div className="mx-auto grid max-w-[1560px] gap-4 px-4 py-5 md:grid-cols-4 lg:px-8">
            <div className="flex items-center gap-4"><span className="text-3xl text-[#8a0f2a]">✦</span><div><b>Productos 100% latinos</b><p className="text-sm text-[#80666b]">Calidad y autenticidad</p></div></div>
            <div className="flex items-center gap-4"><span className="text-3xl text-[#8a0f2a]">🚚</span><div><b>Envíos coordinados</b><p className="text-sm text-[#80666b]">Te confirmamos por WhatsApp</p></div></div>
            <div className="flex items-center gap-4"><span className="text-3xl text-[#8a0f2a]">☙</span><div><b>Tu mercado de confianza</b><p className="text-sm text-[#80666b]">Producto latino, siempre cerca</p></div></div>
            <div className="flex items-center gap-4"><span className="text-3xl text-[#8a0f2a]">☏</span><div><b>Atención personalizada</b><p className="text-sm text-[#80666b]">WhatsApp</p></div></div>
          </div>
        </section>

        <section className="bg-[#fff8f5] py-8">
          <div className="mx-auto grid max-w-[1560px] gap-5 px-4 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
            {categoryCards.map((card) => (
              <button
                key={card.name}
                type="button"
                onClick={() => selectCategory(card.name)}
                className="group overflow-hidden rounded-[1.4rem] border border-[#f0d9df] bg-white text-left shadow-[0_14px_35px_rgba(91,7,23,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(91,7,23,0.13)]"
              >
                <div className="h-36 overflow-hidden bg-[#fff8f5]">
                  <img src={card.image} alt={card.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-serif text-xl font-bold text-[#650019]">{card.name}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff3f6] text-lg font-black text-[#8a0f2a] transition group-hover:bg-[#8a0f2a] group-hover:text-white">→</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Alert type="error">{error}</Alert>
        <Alert type="success">{success}</Alert>

        <section id="destacados" className="bg-white py-12">
          <div className="mx-auto max-w-[1560px] px-4 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-4xl font-bold text-[#650019]">Productos destacados</h2>
                <p className="mt-2 text-lg text-[#80666b]">Una selección especial de sabores que te llevan a casa.</p>
              </div>
              <a className="w-fit rounded-full border border-[#ead5db] bg-white px-6 py-3 text-sm font-black text-[#8a0f2a] transition hover:border-[#8a0f2a]" href="#catalogo">
                Ver todos los productos →
              </a>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {featuredProducts.map((product) => (
                <article key={product._id || product.name} className="rounded-[1.5rem] border border-[#f0dce1] bg-white p-4 shadow-[0_12px_32px_rgba(91,7,23,0.08)]">
                  <div className="flex h-40 items-center justify-center rounded-2xl bg-[#fff8f5] p-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-4xl text-[#8a0f2a]">✦</span>
                    )}
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-wide text-[#8a0f2a]">{product.category}</p>
                  <h3 className="mt-1 line-clamp-2 min-h-12 font-serif text-xl font-bold text-[#2b1217]">{product.name}</h3>
                  <p className="mt-2 text-xl font-black text-[#8a0f2a]">
                    {Number(product.price || 0) > 0 ? Number(product.price || 0).toLocaleString("es-ES", { style: "currency", currency: "EUR" }) : "Próximamente"}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo" className="bg-[#fff8f5] py-16">
          <div className="mx-auto max-w-[1560px] px-4 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8a0f2a]">Catálogo</p>
                <h2 className="mt-3 font-serif text-4xl font-bold text-[#650019] md:text-6xl">
                  {category === "Todas" ? "Encuentra tus favoritos" : category}
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-[#6f555a]">
                  {categoryText[category] || "Productos latinos seleccionados para tu compra online."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {search.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="rounded-full border border-[#ead5db] bg-white px-5 py-3 text-sm font-black text-[#8a0f2a] transition hover:border-[#8a0f2a]"
                  >
                    Limpiar búsqueda: “{search}”
                  </button>
                )}
                <div className="rounded-full bg-white px-6 py-4 text-sm font-black text-[#8a0f2a] shadow-[0_12px_32px_rgba(91,7,23,0.08)]">
                  {filteredProducts.length} productos
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
              {categories.map((item) => {
                const active = category === item;
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-black transition ${
                      active
                        ? "border-[#8a0f2a] bg-[#8a0f2a] text-white shadow-[0_10px_22px_rgba(138,15,42,0.18)]"
                        : "border-[#ead5db] bg-white text-[#6b222d] hover:border-[#8a0f2a] hover:text-[#8a0f2a]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="mt-10">
              {loading ? (
                <Loading />
              ) : (
                <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard
                        key={product._id || product.name}
                        product={product}
                        onView={setDetailProduct}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        canEdit={canManageProducts}
                        canDelete={canDeleteProducts}
                      />
                    ))
                  ) : (
                    <p className="rounded-3xl border border-[#ead5db] bg-white p-8 text-center font-semibold text-[#80666b] sm:col-span-2 lg:col-span-3 2xl:col-span-4">
                      No hay productos que coincidan con la búsqueda.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />

        {canManageProducts && (
          <ProductForm
            onSubmit={handleSubmit}
            isSubmitting={submitting}
            initialData={editingProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        <section id="conocenos" className="bg-white py-16">
          <div className="mx-auto grid max-w-[1560px] gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8a0f2a]">Conócenos</p>
              <h2 className="mt-3 font-serif text-4xl font-bold text-[#650019] md:text-5xl">Un mercado latino pensado para estar cerca de casa.</h2>
            </div>
            <p className="text-lg leading-8 text-[#6f555a]">
              Germen Latin Market nace como una tienda online para acercar productos latinos a clientes en Estambul. La plataforma permite consultar el catálogo, agregar productos al carrito y tramitar el pedido por WhatsApp de forma personalizada.
            </p>
          </div>
        </section>

        <section id="atencion" className="border-y border-[#f0d9df] bg-[#fff8f5] py-14">
          <div className="mx-auto grid max-w-[1560px] gap-6 px-4 md:grid-cols-3 lg:px-8">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm"><b className="text-[#650019]">Atención al cliente</b><p className="mt-2 text-sm leading-6 text-[#80666b]">Te ayudamos a confirmar productos, disponibilidad y entrega.</p></div>
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm"><b className="text-[#650019]">Asistente virtual</b><p className="mt-2 text-sm leading-6 text-[#80666b]">Te orienta durante la compra y te guía para tramitar el pedido.</p></div>
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm"><b className="text-[#650019]">WhatsApp</b><p className="mt-2 text-sm leading-6 text-[#80666b]">Los pedidos se tramitan directamente al +90 551 026 99 86.</p></div>
          </div>
        </section>
      </main>

      <Chatbot open={chatbotOpen} onOpenChange={setChatbotOpen} />
      <Footer />
    </div>
  );
}

export default Home;

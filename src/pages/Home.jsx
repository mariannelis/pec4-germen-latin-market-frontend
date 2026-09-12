import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductForm from '../components/ProductForm.jsx';
import ProductDetail from '../components/ProductDetail.jsx';
import Loading from '../components/Loading.jsx';
import Alert from '../components/Alert.jsx';
import { createProduct, deleteProduct, getApiUrl, getProducts, updateProduct } from '../services/api.js';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (apiError) {
      setError(apiError.message || 'No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category).filter(Boolean);
    return ['Todas', ...new Set(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = (product.name || '').toLowerCase();
      const productDescription = (product.description || '').toLowerCase();
      const searchText = search.toLowerCase();
      const matchesCategory = category === 'Todas' || product.category === category;
      const matchesSearch = productName.includes(searchText) || productDescription.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  const handleSubmit = async (productData) => {
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      if (selectedProduct) {
        await updateProduct(selectedProduct._id, productData);
        setSuccess('Producto actualizado correctamente.');
      } else {
        await createProduct(productData);
        setSuccess('Producto creado correctamente.');
      }

      setSelectedProduct(null);
      await loadProducts();
    } catch (apiError) {
      setError(apiError.message || 'No se pudo guardar el producto.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(`¿Seguro que quieres eliminar "${product.name}"?`);

    if (!confirmDelete) return;

    try {
      setError('');
      setSuccess('');
      await deleteProduct(product._id);
      setSuccess('Producto eliminado correctamente.');
      await loadProducts();
    } catch (apiError) {
      setError(apiError.message || 'No se pudo eliminar el producto.');
    }
  };

  return (
    <div className="app-shell">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">React + API REST + MongoDB Atlas</p>
            <h2>Productos latinos para sentirte en casa</h2>
            <p>
              Germen Latin Market conecta una interfaz React con la API REST de la PEC 3 para listar,
              crear, editar y eliminar productos latinos con datos reales desde MongoDB Atlas.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#catalogo">Ver catálogo</a>
              <a className="btn secondary" href="#crear">Crear producto</a>
            </div>
          </div>

          <div className="hero-card" aria-label="Resumen del proyecto">
            <img src="/germen-logo.svg" alt="Logo de Germen Latin Market" />
            <p>Sabores que te llevan a casa.</p>
            <p>API conectada:</p>
            <strong>{getApiUrl()}</strong>
          </div>
        </section>

        <Alert type="error">{error}</Alert>
        <Alert type="success">{success}</Alert>

        <section className="catalog-section" id="catalogo">
          <div className="section-heading">
            <p className="eyebrow">Listado dinámico GET</p>
            <h2>Catálogo de productos latinos</h2>
            <p>
              Los productos se cargan desde la ruta <code>/api/products</code> usando useEffect y useState.
            </p>
          </div>

          <div className="filters">
            <label>
              Buscar producto
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar harina, salsa, dulce, café..."
              />
            </label>

            <label>
              Filtrar por categoría
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onView={setDetailProduct}
                    onEdit={setSelectedProduct}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="empty-state">No hay productos que coincidan con la búsqueda.</p>
              )}
            </div>
          )}
        </section>

        <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />

        <ProductForm
          selectedProduct={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedProduct(null)}
          isSubmitting={submitting}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Home;

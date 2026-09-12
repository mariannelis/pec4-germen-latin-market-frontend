function ProductCard({ product, onView, onEdit, onDelete }) {
  const price = Number(product.price || 0).toFixed(2);

  return (
    <article className="product-card">
      <div className="product-image" aria-label={`Imagen de ${product.name}`}>
        <span>{product.category || 'Producto latino'}</span>
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3>{product.name}</h3>
          {product.featured && <span className="badge">Destacado</span>}
        </div>

        <p className="product-description">{product.description}</p>

        <dl className="product-meta">
          <div>
            <dt>Precio</dt>
            <dd>€{price}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{product.stock}</dd>
          </div>
          <div>
            <dt>Presentación</dt>
            <dd>{product.capacity}</dd>
          </div>
        </dl>

        <div className="card-actions">
          <button type="button" className="btn secondary" onClick={() => onView(product)}>
            Ver detalle
          </button>
          <button type="button" className="btn ghost" onClick={() => onEdit(product)}>
            Editar
          </button>
          <button type="button" className="btn danger" onClick={() => onDelete(product)}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

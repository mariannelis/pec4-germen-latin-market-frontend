function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <section className="detail-panel" aria-label="Detalle del producto seleccionado">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Detalle de producto</p>
          <h2>{product.name}</h2>
        </div>
        <button type="button" className="btn ghost" onClick={onClose}>Cerrar</button>
      </div>

      <div className="detail-grid">
        <p><strong>Descripción:</strong> {product.description}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p><strong>Precio:</strong> €{Number(product.price || 0).toFixed(2)}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Presentación:</strong> {product.capacity}</p>
        <p><strong>Peso / contenido:</strong> {product.weight}</p>
        <p><strong>Origen / ingredientes:</strong> {product.material}</p>
        <p><strong>Tipo / sabor:</strong> {product.color}</p>
        <p><strong>Estado:</strong> {product.status}</p>
        <p><strong>Creado por:</strong> {product.createdBy}</p>
      </div>
    </section>
  );
}

export default ProductDetail;

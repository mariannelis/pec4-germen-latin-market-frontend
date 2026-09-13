import { formatMoney, useCart } from "./CartContext.jsx";

function getStatus(product) {
  const stock = Number(product.stock || 0);
  if (product.status === "draft") return "Reservado";
  if (product.status === "out_of_stock" || stock <= 0) return "Próximamente";
  return "Disponible";
}

function ProductDetail({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const statusLabel = getStatus(product);
  const isAvailable = statusLabel === "Disponible";

  const details = [
    ["Categoría", product.category],
    ["Precio", formatMoney(product.price)],
    ["Stock", product.stock],
    ["Presentación", product.capacity],
    ["Peso / contenido", product.weight],
    ["Origen / ingredientes", product.material],
    ["Tipo / sabor", product.color],
    ["Estado", statusLabel],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#25050c]/45 px-4 py-6 backdrop-blur-sm" onClick={onClose}>
      <section
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-[#ead5db] bg-white shadow-2xl"
        aria-label="Detalle del producto seleccionado"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="flex min-h-80 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-white via-[#fff8f5] to-[#f8e7eb] p-8">
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-h-80 w-full object-contain" />
            ) : (
              <span className="text-6xl">🛒</span>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8a0f2a]">Detalle de producto</p>
                <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#5b0717]">{product.name}</h2>
              </div>
              <button type="button" className="rounded-full bg-[#f8e7eb] px-4 py-2 text-2xl font-bold text-[#8a0f2a] transition hover:bg-[#8a0f2a] hover:text-white" onClick={onClose}>
                ×
              </button>
            </div>

            <p className="mt-4 leading-7 text-[#60484d]">{product.description}</p>
            <p className="mt-4 text-4xl font-black text-[#8a0f2a]">{formatMoney(product.price)}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#fff8f5] p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-[#9b8589]">{label}</p>
                  <p className="mt-1 font-bold text-[#2b1217]">{value || "—"}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-[#7a0c24] to-[#9e1231] px-6 py-4 text-sm font-black text-white shadow-[0_14px_28px_rgba(138,15,42,0.22)] transition hover:from-[#5b0717] hover:to-[#8a0f2a] disabled:cursor-not-allowed disabled:from-stone-300 disabled:to-stone-300"
              onClick={() => addToCart(product)}
              disabled={!isAvailable}
            >
              {isAvailable ? "Agregar al carrito" : "Próximamente"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;

import { formatMoney, useCart } from "./CartContext.jsx";

function getStatus(product) {
  const stock = Number(product.stock || 0);
  if (product.status === "draft") return "Reservado";
  if (product.status === "out_of_stock" || stock <= 0) return "Próximamente";
  return "Disponible";
}

function ProductCard({ product, onView, onEdit, onDelete, canEdit = false, canDelete = false }) {
  const price = Number(product.price || 0);
  const { addToCart } = useCart();
  const statusLabel = getStatus(product);
  const isAvailable = statusLabel === "Disponible";

  return (
    <article className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-[1.7rem] border border-[#f0dce1] bg-white shadow-[0_14px_38px_rgba(91,7,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(91,7,23,0.14)]">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#fff9f7] to-[#f7edf0] p-6">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            onError={(event) => { event.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-[#8a0f2a]">✦</div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#8a0f2a] shadow-sm">
          {product.category || "Producto latino"}
        </span>
        <span className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-black shadow-sm ${
          isAvailable ? "bg-[#8a0f2a] text-white" : "bg-[#dbcdd1] text-[#5b0717]"
        }`}>
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-serif text-xl font-bold leading-tight text-[#2b1217]">{product.name}</h3>
            <p className="mt-1 line-clamp-1 text-sm font-medium text-[#8b7276]">{product.color || product.material || "Producto latino"}</p>
          </div>
          <p className="shrink-0 text-xl font-black text-[#8a0f2a]">{price > 0 ? formatMoney(price) : "—"}</p>
        </div>

        <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#60484d]">{product.description}</p>

        <dl className="mt-5 grid grid-cols-3 gap-2 rounded-3xl bg-[#fff8f5] p-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-[#9b8589]">Stock</dt>
            <dd className="mt-1 font-black text-[#2b1217]">{Number(product.stock || 0)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-[#9b8589]">Formato</dt>
            <dd className="mt-1 line-clamp-1 font-black text-[#2b1217]">{product.capacity || "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-[#9b8589]">Estado</dt>
            <dd className="mt-1 line-clamp-1 font-black text-[#2b1217]">{statusLabel}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <button
            type="button"
            className="w-full rounded-full bg-[#8a0f2a] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_25px_rgba(138,15,42,0.20)] transition hover:bg-[#5b0717] disabled:cursor-not-allowed disabled:bg-[#d8c9cd] disabled:text-[#745c60] disabled:shadow-none"
            onClick={() => addToCart(product)}
            disabled={!isAvailable}
          >
            {isAvailable ? "Agregar al carrito" : "Próximamente"}
          </button>

          <button
            type="button"
            className="w-full rounded-full border border-[#8a0f2a] bg-white px-5 py-3 text-sm font-black text-[#8a0f2a] transition hover:bg-[#8a0f2a] hover:text-white"
            onClick={() => onView(product)}
          >
            Ver producto
          </button>

          {(canEdit || canDelete) && (
            <div className="grid grid-cols-2 gap-3 border-t border-[#f0dce1] pt-4">
              {canEdit && (
                <button
                  type="button"
                  className="rounded-full bg-[#fbedf0] px-4 py-2.5 text-sm font-black text-[#8a0f2a] transition hover:bg-[#8a0f2a] hover:text-white"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  className="rounded-full bg-[#fff1f2] px-4 py-2.5 text-sm font-black text-red-700 transition hover:bg-red-700 hover:text-white"
                  onClick={() => onDelete(product)}
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

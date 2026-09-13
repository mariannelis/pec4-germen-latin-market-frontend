import { useMemo } from "react";
import { formatMoney, useCart } from "./CartContext.jsx";

const WHATSAPP_NUMBER = "905510269986";
const WHATSAPP_DISPLAY = "+90 551 026 99 86";

function WhatsAppIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.02 3.2A12.55 12.55 0 0 0 5.35 22.35L4 29l6.82-1.28A12.54 12.54 0 1 0 16.02 3.2Zm0 2.45a10.1 10.1 0 1 1-5.05 18.83l-.38-.22-4.06.76.8-3.95-.25-.4A10.1 10.1 0 0 1 16.02 5.65Zm-4.4 4.78c-.23 0-.6.08-.9.42-.31.35-1.18 1.15-1.18 2.8 0 1.64 1.2 3.23 1.36 3.45.16.22 2.32 3.7 5.7 5.04 2.81 1.1 3.39.88 4 .82.61-.06 1.96-.8 2.24-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.39-.34-.17-1.96-.97-2.27-1.08-.3-.11-.52-.17-.74.17-.22.33-.85 1.08-1.04 1.3-.2.22-.39.25-.72.08-.34-.17-1.41-.52-2.69-1.66-1-.88-1.67-1.97-1.86-2.3-.2-.34-.02-.52.15-.69.15-.15.34-.39.5-.58.17-.2.22-.34.34-.56.11-.22.05-.42-.03-.58-.08-.17-.74-1.8-1.02-2.46-.27-.64-.54-.55-.74-.56h-.67Z" />
    </svg>
  );
}

function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    itemCount,
  } = useCart();

  const whatsappUrl = useMemo(() => {
    const lines = [
      "Hola, quiero tramitar mi pedido en Germen Latin Market:",
      "",
      ...cart.map((item) => `• ${item.quantity} x ${item.name} - ${formatMoney(item.price * item.quantity)}`),
      "",
      `Total aproximado: ${formatMoney(cartTotal)}`,
      "",
      "Quedo atenta/o para confirmar disponibilidad, entrega y forma de pago.",
    ];

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [cart, cartTotal]);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#25050c]/45 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    >
      <aside
        className="ml-auto flex h-full w-full max-w-[480px] flex-col overflow-hidden bg-white shadow-[0_30px_90px_rgba(50,0,15,0.35)]"
        onClick={(event) => event.stopPropagation()}
        aria-label="Carrito de compra"
      >
        <div className="bg-gradient-to-r from-[#630016] via-[#8a0f2a] to-[#630016] p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-4xl">🛒</span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">Tu compra</p>
                <h2 className="font-serif text-4xl font-bold">Tu carrito</h2>
                <p className="mt-1 text-sm text-white/85">
                  {itemCount} {itemCount === 1 ? "producto seleccionado" : "productos seleccionados"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white transition hover:bg-white/20"
              onClick={() => setIsCartOpen(false)}
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-[#fff8f5] px-6 text-center">
            <div className="rounded-full bg-white p-7 text-5xl shadow-sm">🛒</div>
            <h3 className="mt-5 font-serif text-2xl font-bold text-[#5b0717]">Tu carrito está vacío</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#80666b]">
              Agrega tus productos favoritos y revisa el total antes de tramitar el pedido por WhatsApp.
            </p>
            <button
              type="button"
              className="mt-6 rounded-full bg-[#8a0f2a] px-6 py-3 text-sm font-black text-white transition hover:bg-[#5b0717]"
              onClick={() => setIsCartOpen(false)}
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto bg-[#fff8f5] p-5">
              {cart.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-[#ead5db] bg-white p-4 shadow-[0_12px_35px_rgba(91,7,23,0.07)]">
                  <div className="flex gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#fff8f5] p-2">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      ) : (
                        <div className="text-2xl">🌽</div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-xl font-bold leading-tight text-[#2b1217]">{item.name}</h3>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide text-[#8a0f2a]">{item.category}</p>
                      <p className="mt-2 text-base font-black text-[#8a0f2a]">
                        {formatMoney(item.price)} c/u
                      </p>
                    </div>

                    <button
                      type="button"
                      className="h-9 w-9 rounded-full text-red-700 transition hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Quitar ${item.name}`}
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-[#ead5db] bg-[#fff8f5]">
                      <button
                        type="button"
                        className="px-4 py-2 font-black text-[#8a0f2a] hover:text-[#5b0717]"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Restar ${item.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm font-black text-[#2b1217]">{item.quantity}</span>
                      <button
                        type="button"
                        className="px-4 py-2 font-black text-[#8a0f2a] hover:text-[#5b0717]"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Sumar ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-[#9b8589]">Subtotal</p>
                      <p className="text-lg font-black text-[#2b1217]">{formatMoney(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-[#ead5db] bg-white p-5">
              <div className="flex items-center justify-between rounded-3xl bg-[#fff8f5] p-5">
                <span className="font-black text-[#60484d]">Total a pagar</span>
                <strong className="text-3xl text-[#8a0f2a]">{formatMoney(cartTotal)}</strong>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#11a85b] px-5 py-4 text-center text-sm font-black text-white shadow-[0_16px_34px_rgba(17,168,91,0.24)] transition hover:bg-[#0b8f4a]"
              >
                <WhatsAppIcon className="h-8 w-8 shrink-0" />
                <span>
                  Tramitar pedido por WhatsApp
                  <small className="mt-1 block text-xs font-bold text-white/85">{WHATSAPP_DISPLAY}</small>
                </span>
              </a>

              <div className="mt-4 flex gap-3 rounded-3xl bg-[#fff8f5] p-4 text-sm leading-6 text-[#60484d]">
                <WhatsAppIcon className="mt-1 h-6 w-6 shrink-0 text-[#11a85b]" />
                <p>Por ahora, los pedidos se gestionan por WhatsApp. Te atenderemos personalmente para confirmar disponibilidad, entrega y pago.</p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="rounded-full border border-[#8a0f2a] px-5 py-3 text-sm font-black text-[#8a0f2a] transition hover:bg-[#8a0f2a] hover:text-white"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#8a0f2a] px-5 py-3 text-sm font-black text-white transition hover:bg-[#5b0717]"
                  onClick={() => setIsCartOpen(false)}
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;

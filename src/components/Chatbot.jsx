import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "905510269986";
const CHATBOT_AVATAR = "/images/chatbot-avatar.png";

function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.02 3.2A12.55 12.55 0 0 0 5.35 22.35L4 29l6.82-1.28A12.54 12.54 0 1 0 16.02 3.2Zm0 2.45a10.1 10.1 0 1 1-5.05 18.83l-.38-.22-4.06.76.8-3.95-.25-.4A10.1 10.1 0 0 1 16.02 5.65Zm-4.4 4.78c-.23 0-.6.08-.9.42-.31.35-1.18 1.15-1.18 2.8 0 1.64 1.2 3.23 1.36 3.45.16.22 2.32 3.7 5.7 5.04 2.81 1.1 3.39.88 4 .82.61-.06 1.96-.8 2.24-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.39-.34-.17-1.96-.97-2.27-1.08-.3-.11-.52-.17-.74.17-.22.33-.85 1.08-1.04 1.3-.2.22-.39.25-.72.08-.34-.17-1.41-.52-2.69-1.66-1-.88-1.67-1.97-1.86-2.3-.2-.34-.02-.52.15-.69.15-.15.34-.39.5-.58.17-.2.22-.34.34-.56.11-.22.05-.42-.03-.58-.08-.17-.74-1.8-1.02-2.46-.27-.64-.54-.55-.74-.56h-.67Z" />
    </svg>
  );
}

function Chatbot({ open = false, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hola, soy Fonso, tu asistente virtual. ¿Te ayudo a encontrar productos, revisar tu carrito o tramitar tu pedido?",
    },
  ]);

  const isOpen = open || internalOpen;

  const whatsappUrl = useMemo(() => {
    const text = "Hola, vengo desde Germen Latin Market y necesito ayuda con mi compra.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, []);

  const getBotAnswer = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes("pedido") || text.includes("comprar") || text.includes("carrito")) {
      return "Para hacer un pedido, agrega productos al carrito, revisa las cantidades y luego presiona el botón de WhatsApp para tramitar tu compra.";
    }

    if (text.includes("envio") || text.includes("envío") || text.includes("entrega")) {
      return "Los envíos se coordinan de forma personalizada por WhatsApp. Escríbenos y te indicamos disponibilidad, zona de entrega y tiempo estimado.";
    }

    if (text.includes("pago") || text.includes("pagar") || text.includes("precio")) {
      return "Los métodos de pago se confirman por WhatsApp al momento de tramitar el pedido.";
    }

    if (text.includes("producto") || text.includes("harina") || text.includes("bebida") || text.includes("dulce")) {
      return "En Germen Latin Market puedes encontrar productos latinos como harinas, bebidas, dulces, despensa, carnes por encargo y embutidos.";
    }

    if (text.includes("hola") || text.includes("buenas")) {
      return "¡Hola! Soy Fonso, tu asistente virtual. Puedes preguntarme por productos, pedidos, pagos o envíos.";
    }

    return "Puedo ayudarte con información sobre productos, pedidos, envíos, pagos o carrito. Si necesitas atención personalizada, también puedes escribirnos por WhatsApp.";
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    const botMessage = {
      sender: "bot",
      text: getBotAnswer(message),
    };

    setChatMessages((prev) => [...prev, userMessage, botMessage]);
    setMessage("");
  };

  const sendQuickQuestion = (text) => {
    const userMessage = {
      sender: "user",
      text,
    };

    const botMessage = {
      sender: "bot",
      text: getBotAnswer(text),
    };

    setChatMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const close = () => {
    setInternalOpen(false);
    onOpenChange?.(false);
  };

  const openChat = () => {
    setInternalOpen(true);
    onOpenChange?.(true);
  };

  return (
    <div id="chatbot-ayuda" className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-4 w-[min(92vw,390px)] overflow-hidden rounded-[2rem] border border-[#ead5db] bg-white shadow-[0_24px_70px_rgba(91,7,23,0.24)]">
          <div className="bg-gradient-to-r from-[#630016] via-[#8a0f2a] to-[#630016] p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={CHATBOT_AVATAR}
                  alt="Fonso, asistente virtual de Germen"
                  className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-lg"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/75">
                    Atención al cliente
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-bold">
                    Fonso
                  </h3>
                  <p className="text-xs text-white/80">
                    Tu asistente virtual
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={close}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xl font-bold hover:bg-white/20"
                aria-label="Cerrar asistente virtual"
              >
                ×
              </button>
            </div>
          </div>

          <div className="bg-[#fff8f7] p-5">
            <div className="mb-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {chatMessages.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      item.sender === "user"
                        ? "rounded-tr-md bg-[#8a0f2a] text-white"
                        : "rounded-tl-md bg-white text-[#5f454b]"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => sendQuickQuestion("Quiero hacer un pedido")}
                className="rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#8a0f2a] hover:bg-[#f8e7eb]"
              >
                Pedido
              </button>

              <button
                type="button"
                onClick={() => sendQuickQuestion("Información sobre envíos")}
                className="rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#8a0f2a] hover:bg-[#f8e7eb]"
              >
                Envíos
              </button>

              <button
                type="button"
                onClick={() => sendQuickQuestion("Qué productos tienen")}
                className="rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#8a0f2a] hover:bg-[#f8e7eb]"
              >
                Productos
              </button>

              <button
                type="button"
                onClick={() => sendQuickQuestion("Métodos de pago")}
                className="rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#8a0f2a] hover:bg-[#f8e7eb]"
              >
                Pagos
              </button>
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Escribe tu pregunta..."
                className="min-w-0 flex-1 rounded-full border border-[#ead5db] bg-white px-4 py-3 text-sm text-[#4b3036] outline-none focus:border-[#8a0f2a]"
              />

              <button
                type="submit"
                className="rounded-full bg-[#8a0f2a] px-5 py-3 text-sm font-black text-white hover:bg-[#6f0b20]"
              >
                Enviar
              </button>
            </form>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#11a85b] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(17,168,91,0.22)] transition hover:bg-[#0b8f4a]"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={isOpen ? close : openChat}
        className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_18px_42px_rgba(138,15,42,0.34)] transition hover:-translate-y-1"
        aria-label="Abrir chatbot de ayuda"
      >
        <img src={CHATBOT_AVATAR} alt="Chatbot de ayuda" className="h-full w-full object-cover" />
        <span className="absolute right-1 top-1 h-5 w-5 rounded-full border-2 border-white bg-[#ff304f]" />
        <span className="absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-xs font-black text-[#8a0f2a] shadow-lg group-hover:block">
          ¿Necesitas ayuda?
        </span>
      </button>
    </div>
  );
}

export default Chatbot;
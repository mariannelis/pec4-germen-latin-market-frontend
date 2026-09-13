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
  const [selectedTopic, setSelectedTopic] = useState("pedido");
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open || internalOpen;

  const topics = {
    "Pagos": {
      label: "Hola soy Fonso tu asistente virtual", 
      answer: "¡Hola! Soy Fonso, tu asistente virtual. ¿En qué puedo ayudarte?"
    },
    pedido: {
      label: "Pedido",
      answer:
        "Agrega productos al carrito, revisa cantidades y tramita tu pedido por WhatsApp. Te acompañamos para confirmar disponibilidad, entrega y forma de pago.",
    },
    envio: {
      label: "Envíos",
      answer:
        "Realizamos atención personalizada. Escríbenos por WhatsApp y te indicaremos los tiempos de entrega según tu zona.",
    },
    productos: {
      label: "Productos",
      answer:
        "Puedes encontrar despensa latina, bebidas, dulces, carnes por encargo y embutidos seleccionados para sentirte en casa.",
    },
  };

  const whatsappUrl = useMemo(() => {
    const message = "Hola, vengo desde Germen Latin Market y necesito ayuda con mi compra.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, []);

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
        <div className="mb-4 w-[min(92vw,380px)] overflow-hidden rounded-[2rem] border border-[#ead5db] bg-white shadow-[0_24px_70px_rgba(91,7,23,0.24)]">
          <div className="bg-gradient-to-r from-[#630016] via-[#8a0f2a] to-[#630016] p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={CHATBOT_AVATAR}
                  alt="Asistente virtual de Germen"
                  className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-lg"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/75">Atención al cliente</p>
                  <h3 className="mt-1 font-serif text-2xl font-bold">Asistente virtual</h3>
                  <p className="text-xs text-white/80">Ayuda para tu compra</p>
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

          <div className="space-y-4 bg-[#fff8f7] p-5">
            <div className="flex items-start gap-3">
              <img
                src={CHATBOT_AVATAR}
                alt="Asistente virtual"
                className="mt-1 h-10 w-10 rounded-full border border-[#ead5db] object-cover"
              />
              <div className="rounded-3xl rounded-tl-md bg-white p-4 text-sm leading-6 text-[#5f454b] shadow-sm">
                ¡Hola! soy Fonso, tu asistente virtual. ¿Te ayudo a encontrar productos, revisar tu carrito o tramitar tu pedido?
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {Object.entries(topics).map(([key, topic]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTopic(key)}
                  className={`rounded-2xl px-3 py-2 text-xs font-black transition ${
                    selectedTopic === key ? "bg-[#8a0f2a] text-white" : "bg-white text-[#8a0f2a] hover:bg-[#f8e7eb]"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-[#f0d9df] bg-white p-4 text-sm leading-6 text-[#60484d]">
              {topics[selectedTopic].answer}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#11a85b] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(17,168,91,0.22)] transition hover:bg-[#0b8f4a]"
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

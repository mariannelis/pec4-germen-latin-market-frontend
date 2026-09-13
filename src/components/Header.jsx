import { useState } from "react";
import { useCart } from "./CartContext.jsx";

const users = [
  { name: "Cliente Demo", email: "cliente@germenmarket.com", role: "customer", label: "Cliente" },
  { name: "Gestor Catálogo", email: "catalogo@germenmarket.com", role: "editor", label: "Gestor" },
  { name: "Marianne Lucena", email: "admin@germenmarket.com", role: "admin", label: "Admin" },
];

const navItems = [
  "Inicio",
  "Despensa",
  "Bebidas",
  "Dulces",
  "Carnes",
  "Embutidos",
  "Chucherías",
  "Más",
];

function Header({ currentUser, onChangeUser, search, onSearchChange, onSelectCategory, onOpenChat }) {
  const { itemCount, setIsCartOpen } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const isManager = ["admin", "editor"].includes(currentUser?.role);

  const scrollToCatalog = () => {
    window.setTimeout(() => {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleCategoryClick = (item) => {
    if (item === "Inicio") {
      document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const nextCategory = item === "Más" ? "Todas" : item;
    onSelectCategory?.(nextCategory);
    scrollToCatalog();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    onSearchChange(value);
    onSelectCategory?.("Todas");

    if (value.trim()) {
      scrollToCatalog();
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSelectCategory?.("Todas");
    scrollToCatalog();
    setShowMobileSearch(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#f1dce2] bg-white shadow-[0_12px_35px_rgba(75,0,20,0.08)]">
      <div className="bg-gradient-to-r from-[#630016] via-[#8b0d2c] to-[#630016] text-white">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 px-4 py-2 text-xs font-semibold lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <span>Sabores latinos, más cerca de ti.</span>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a href="#conocenos" className="transition hover:text-white/75">Conócenos</a>
            <span className="h-4 w-px bg-white/35" />
            <a href="#atencion" className="transition hover:text-white/75">Atención al cliente</a>
            <span className="h-4 w-px bg-white/35" />
            <button type="button" onClick={() => setShowUserMenu((value) => !value)} className="transition hover:text-white/75">Mi cuenta</button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1560px] items-center gap-4 px-4 py-3 lg:px-8">
        <a
          href="#inicio"
          className="flex w-[245px] shrink-0 items-center gap-3 sm:w-[275px] xl:w-[300px]"
          aria-label="Ir al inicio de Germen Latin Market"
        >
          <img
            src="/logo-germen.png"
            alt="Logo Germen Latin Market"
            className="h-12 w-12 shrink-0 rounded-full object-contain sm:h-14 sm:w-14 xl:h-16 xl:w-16"
          />
          <div className="min-w-0 leading-none">
            <p className="hidden text-[9px] font-black uppercase tracking-[0.38em] text-[#8a0f2a] sm:block">Latin Market</p>
            <h1 className="font-serif text-[2rem] font-bold leading-[0.9] text-[#4b160f] sm:text-[2.45rem] xl:text-[2.8rem]">Germen</h1>
            <p className="mt-1 hidden font-serif text-xs italic leading-snug text-[#69443d] sm:block">Sabores que te llevan a casa.</p>
          </div>
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 text-[13px] font-semibold text-[#2b1217] lg:flex xl:gap-4 2xl:gap-5 2xl:text-sm" aria-label="Menú principal">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="relative shrink-0 whitespace-nowrap px-1 transition hover:text-[#8a0f2a] after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-[#8a0f2a] after:transition-all hover:after:w-full"
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
          <form
            className={`${showMobileSearch ? "absolute left-4 right-4 top-[7.2rem] z-50" : "hidden"} md:static md:hidden 2xl:flex 2xl:w-[250px]`}
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <label className="w-full">
              <span className="sr-only">Buscar productos</span>
              <div className="relative w-full">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#8a0f2a]">⌕</span>
                <input
                  type="search"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Buscar productos..."
                  className="w-full rounded-full border border-[#ead5db] bg-white px-5 py-3 pl-11 text-sm text-[#2d151a] outline-none transition placeholder:text-[#9b8589] focus:border-[#8a0f2a] focus:ring-4 focus:ring-[#f2dbe1]"
                />
              </div>
            </label>
          </form>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead5db] bg-white text-xl text-[#4b160f] transition hover:border-[#8a0f2a] hover:text-[#8a0f2a] 2xl:hidden"
            onClick={() => setShowMobileSearch((value) => !value)}
            aria-label="Buscar"
          >
            ⌕
          </button>

          <div className="relative hidden xl:block">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-full border border-[#ead5db] bg-white px-4 text-sm font-bold text-[#4b160f] transition hover:border-[#8a0f2a] hover:text-[#8a0f2a]"
              onClick={() => setShowUserMenu((current) => !current)}
              aria-expanded={showUserMenu}
            >
              👤 <span>{currentUser?.label || "Cliente"}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-[#f0d9df] bg-white p-3 shadow-[0_24px_70px_rgba(91,7,23,0.18)]">
                <p className="px-4 pb-2 pt-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#8a0f2a]">Mi cuenta</p>
                <p className="px-4 pb-3 text-xs leading-5 text-[#80666b]">Selecciona una vista para probar permisos del catálogo.</p>
                {users.map((user) => {
                  const active = currentUser?.role === user.role;
                  return (
                    <button
                      key={user.role}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                        active ? "bg-[#8a0f2a] text-white" : "text-[#4b160f] hover:bg-[#fff1f4]"
                      }`}
                      onClick={() => {
                        onChangeUser(user);
                        setShowUserMenu(false);
                      }}
                    >
                      <span>{user.label}</span>
                      {active && <span>✓</span>}
                    </button>
                  );
                })}
                {isManager && (
                  <a href="#gestion" className="mt-2 flex rounded-2xl bg-[#fff8f5] px-4 py-3 text-sm font-black text-[#8a0f2a] hover:bg-[#f8e7eb]">
                    Ir al panel de gestión
                  </a>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#8a0f2a] text-2xl text-white shadow-[0_15px_30px_rgba(138,15,42,0.25)] transition hover:-translate-y-0.5 hover:bg-[#630016] md:h-14 md:w-14"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Abrir carrito con ${itemCount} productos`}
            title="Carrito"
          >
            🛒
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-black text-[#8a0f2a] ring-2 ring-[#8a0f2a]">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      <div className="border-y border-[#f0d9df] bg-[#8a0f2a] text-white lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 text-sm font-bold">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="shrink-0 rounded-full px-4 py-2 text-white transition hover:bg-white/15"
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;

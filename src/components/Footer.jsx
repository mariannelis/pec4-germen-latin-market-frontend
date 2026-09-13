function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#5b0717] via-[#7a0c24] to-[#5b0717] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-serif text-2xl font-bold">Germen Latin Market</p>
          <p className="mt-1 font-serif italic text-white/80">Sabores que te llevan a casa.</p>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/75">
          Tienda online de productos latinos para clientes en Estambul, con catálogo dinámico, carrito de compra y gestión por roles.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

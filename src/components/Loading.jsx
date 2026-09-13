function Loading() {
  return (
    <div className="rounded-3xl border border-[#ead5db] bg-white p-10 text-center shadow-[0_16px_40px_rgba(91,7,23,0.08)]">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#f2dbe1] border-t-[#8a0f2a]" />
      <p className="mt-4 text-sm font-black text-[#60484d]">Cargando productos del catálogo...</p>
    </div>
  );
}

export default Loading;

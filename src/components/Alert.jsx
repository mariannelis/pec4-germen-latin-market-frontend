function Alert({ type = "info", children }) {
  if (!children) return null;

  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-[#ead5db] bg-[#fff8f5] text-[#5b0717]",
  };

  return (
    <div className={`mx-auto mt-6 max-w-7xl rounded-2xl border px-5 py-4 text-sm font-black shadow-sm ${styles[type] || styles.info}`}>
      {children}
    </div>
  );
}

export default Alert;

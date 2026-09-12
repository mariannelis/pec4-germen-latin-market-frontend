function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" />
      <p>Cargando productos latinos desde MongoDB Atlas...</p>
    </div>
  );
}

export default Loading;

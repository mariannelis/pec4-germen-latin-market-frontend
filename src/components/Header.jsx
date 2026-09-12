import { getApiUrl } from '../services/api.js';

function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <img src="/germen-logo.svg" alt="Logo de Germen Latin Market" className="brand-logo" />
        <div>
          <p className="eyebrow">Latin Market</p>
          <h1>Germen</h1>
          <span className="tagline">Sabores que te llevan a casa.</span>
        </div>
      </div>

      <nav className="nav-links" aria-label="Navegación principal">
        <a href="#catalogo">Catálogo</a>
        <a href="#crear">Crear producto</a>
        <a href={getApiUrl()} target="_blank" rel="noreferrer">API</a>
      </nav>
    </header>
  );
}

export default Header;

import React from "react";
import Home from "./pages/Home.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

function App() {
  return (
    <CartProvider>
      <Home />
      <CartDrawer />
    </CartProvider>
  );
}

export default App;

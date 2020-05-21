import React, { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [state, setState] = useState({ products: [], cart: [] });

  const setCart = cart => {
    setState(prevState => ({ ...prevState, cart }));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/products");
      const products = await res.json();
      setState(prevState => ({ ...prevState, products }));
    }
    fetchData();
  }, []);

  const addToCart = data => {
    let alreadyInCart = false;
    let cart = state.cart.map(p => {
      if (p.id === data.id) {
        alreadyInCart = true;
        return {
          ...p,
          count: p.count + 1
        };
      }
      return {
        ...p
      };
    });
    if (!alreadyInCart) {
      cart = [...cart, { ...data, count: 1 }];
    }
    setCart(cart);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-orange">
        <a className="navbar-brand text-white" href="!#">
          Navbar
        </a>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {state.products.slice(0,9).map(c => (
                <ProductCard key={c.id} product={c} addToCart={addToCart} />
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <Cart products={state.cart} setCart={setCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

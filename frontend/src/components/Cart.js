import React from "react";
import { Trash2, XCircle } from "react-feather";

export default function Cart({ products, setCart }) {
  const total = products.reduce((ac, product) => {
    return ac + (product.price * product.count);
  }, 0);

  const removeItem = id => {
    const data = products.filter(product => product.id !== id);
    setCart(data);
  };

  const changeCount = (event, id) => {
    const data = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          count: event.target.value
        };
      }
      return {
        ...product
      };
    });
    setCart(data);
  };

  const clearCart = () =>{
      setCart([]);
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between">
        Your Cart
        <span className="btn btn-sm border shadow-sm align-items-center" onClick={clearCart}>
          <Trash2 size={13} /> Clear
        </span>
      </div>
      <div className="py-2 cart-scroll">
        {products.length > 0 ? null : (
          <div className="text-center my-4">
            <b>Cart is Empty!</b>
            <p className="text-muted">Please Select a Product</p>
          </div>
        )}

        <table className="cart-table">
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <img
                    src="food.png"
                    alt="prod"
                    className="img-circle"
                    width={40}
                  />
                </td>
                <td className="ellipsis">
                    <small>{p.name}</small>
                </td>
                <td>
                  <input
                    type="number"
                    className="counter"
                    value={p.count}
                    onChange={e => changeCount(e, p.id)}
                  />
                </td>
                <td>${p.price * p.count}</td>
                <td>
                  <span className="cursor-pointer" onClick={() => removeItem(p.id)}>
                    <XCircle color="orange" size={20} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <button className="btn bg-orange">Place Order</button>
        Grand Total ${total}
      </div>
    </div>
  );
}

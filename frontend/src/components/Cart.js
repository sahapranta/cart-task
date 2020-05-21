import React, { useState } from "react";
import { Trash2, XCircle } from "react-feather";

export default function Cart({ products, setCart }) {
  const total = products.reduce((ac, product) => {
    return ac + product.price * product.count;
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

  const clearCart = () => {
    setCart([]);
  };

  const [state, setstate] = useState({ showform: false, address: "", msg: "" });

  const placeOrder = () => {
    if (products.length > 0) {
      setstate(prevState => ({
        ...prevState,
        showform: true
      }));
    } else {
      alert("Please Select Product First");
    }
  };

  const onInputChange = e => {
    const { name, value } = e.target;
    setstate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const confirmOrder = () => {
    postOrder();
    setCart([]);
    setstate(prevState => ({
      ...prevState,
      showform: false,
      address: ""
    }));
  };

  const postOrder = async () => {
    const data = {
      amount: total,
      address: state.address,
      products: products.map(p => ({
        name: p.name,
        price: p.price,
        count: p.count
      }))
    };
    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const response = await res.json();
    setstate(prevState => ({
      ...prevState,
      msg: response.msg
    }));
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between">
        Your Cart
        <span
          className="btn btn-sm border shadow-sm align-items-center"
          onClick={clearCart}
        >
          <Trash2 size={13} /> Clear
        </span>
      </div>
      <div className="py-2 cart-scroll">
        {products.length > 0 ? null : (
          <div className="text-center my-4">
            {state.msg ? (
              <p className="alert alert-success">{state.msg}</p>
            ) : null}
            <b>Cart is Empty!</b>
            <p className="text-muted">Please Select a Product</p>
          </div>
        )}

        {state.showform ? (
          <div className="p-2">
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea
                name="address"
                className="form-control"
                onChange={onInputChange}
                value={state.address}
                placeholder="Add Your Mobile Number & Address..."
              ></textarea>
            </div>
            <button
              className="btn btn-success btn-sm float-right"
              onClick={confirmOrder}
              disabled={state.address.length === 0}
            >
              Confrim
            </button>
          </div>
        ) : (
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
                    <span
                      className="cursor-pointer"
                      onClick={() => removeItem(p.id)}
                    >
                      <XCircle color="orange" size={20} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <button
          className="btn bg-orange"
          onClick={placeOrder}
          disabled={products.length === 0}
        >
          Place Order
        </button>
        Grand Total ${total}
      </div>
    </div>
  );
}

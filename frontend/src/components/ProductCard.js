import React from "react";
import { ShoppingCart, Heart } from 'react-feather';

export default function ProductCard({product, addToCart}) {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img
          src="food.png"
          // src={product.image}
          className="card-img-top"
          alt="imh"
        />
        <div className="btn btn-sm border rounded-circle fav">
        <Heart size={16}/>
        </div>
        <div className="card-body">
          <h5 className="card-title mb-1 ellipsis">{product.name}</h5>
          <small className="text-muted">Quantity: 1kg</small>
          <div className="d-flex justify-content-between mt-2 align-items-center">
            ${product.price}
            <button className="btn rounded-circle bg-orange btn-sm" onClick={()=>addToCart(product)}>
              <ShoppingCart color="white" size={18}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "./store";
import { useNavigate } from "react-router-dom";

const OrderCreate = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const create = async (ev) => {
    ev.preventDefault();
    const created = { productId, quantity };
    try {
      await dispatch(createOrder(created, navigate));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={create}>
      <div>
        <label>Product:</label>
        <select
          name='productId'
          id='product-select'
          onChange={(ev) => setProductId(ev.target.value)}
        >
          <option value=''>--Please select a product--</option>
          {products.map((product) => {
            return <option value={product.id}>{product.name}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Quantity</label>
        <input
          type='number'
          id='quantity'
          min='1'
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
        />
      </div>
      <button>Create</button>
    </form>
  );
};

export default OrderCreate;

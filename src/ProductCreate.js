import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "./store";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);

  const create = async (ev) => {
    ev.preventDefault();
    const created = { name, price, numberInStock };
    try {
      await dispatch(createProduct(created, navigate));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={create}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(ev) => setName(ev.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input value={price} onChange={(ev) => setPrice(ev.target.value)} />
      </div>
      <div>
        <label>Number In Stock</label>
        <input
          value={numberInStock}
          onChange={(ev) => setNumberInStock(ev.target.value)}
        />
      </div>
      <button>Create</button>
    </form>
  );
};

export default ProductCreate;

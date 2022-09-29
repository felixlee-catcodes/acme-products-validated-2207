import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "./store";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  //const [product, setProduct] = useState([]);
  console.log(products);

  // const remove = async (id) => {
  //   await axios.delete(`/api/product/${id}`);
  //   //setProduct(products.filter((p) => p.id !== id));
  //   dispatch();
  // };

  return (
    <div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.name}
              (${product.price})
              <br />
              Number In Stock {product.numberInStock}
              <br />
              <Link to={`/products/${product.id}`}>Edit</Link> /{" "}
              <button onClick={() => dispatch(deleteProduct(product))}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <button>
        <Link to={"/products/create"}>Add NewProduct</Link>
      </button>
    </div>
  );
};

export default Products;
